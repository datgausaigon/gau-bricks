(() => {
  "use strict";

  // Chỉ hoạt động trong Structure Panel của Bricks
  const ROOT_SCOPE_SELECTOR = "#bricks-structure";
  const TITLE_INPUT_SELECTOR = ".structure-item .title input";
  const ACTIVE_ITEM_SELECTOR = "li.active"; // Element đang được rename thực tế là active

  // Các class phải tắt khi đang rename, và bật lại khi xong
  const TOGGLE_CLASSES = [
    "bricks-draggable-item",
    "bricks-draggable-handle",
    "draggable",
    "element",
  ];

  const LOCKED_ATTR = "data-rename-locked";

  // ===== helpers =====
  const withinRoot = (el) =>
    el instanceof Element && el.closest(ROOT_SCOPE_SELECTOR);

  const getActiveItem = (inputEl) =>
    inputEl?.closest?.(ACTIVE_ITEM_SELECTOR) || null;

  const isRenaming = (inputEl) =>
    inputEl instanceof HTMLInputElement &&
    !inputEl.classList.contains("readonly");

  // Lấy active item và toàn bộ cha (ancestors) là LI bên trong structure panel
  const getTargetItems = (activeLi) => {
    const results = [];
    let current = activeLi;

    while (current && withinRoot(current)) {
      if (current.tagName === "LI") {
        results.push(current);
      }
      current = current.parentElement;
    }
    return results;
  };

  const removeDragClasses = (li) => {
    if (!li || !li.classList) return;

    let hasRemoved = false;
    TOGGLE_CLASSES.forEach((c) => {
      if (li.classList.contains(c)) {
        li.classList.remove(c);
        hasRemoved = true;
      }
    });

    if (hasRemoved) {
      li.setAttribute(LOCKED_ATTR, "true");
    }
  };

  const restoreDragClasses = () => {
    // Tìm tất cả item đã bị khoá (bao gồm active và ancestors cũ)
    const lockedItems = document.querySelectorAll(
      `${ROOT_SCOPE_SELECTOR} li[${LOCKED_ATTR}="true"]`,
    );

    lockedItems.forEach((li) => {
      TOGGLE_CLASSES.forEach((c) => li.classList.add(c));
      li.removeAttribute(LOCKED_ATTR);
    });
  };

  const syncForInput = (inputEl) => {
    const activeLi = getActiveItem(inputEl);
    if (!activeLi) return;

    if (isRenaming(inputEl)) {
      // 1. Lấy danh sách cần xử lý (Active + Ancestors)
      const targets = getTargetItems(activeLi);
      // 2. Remove class & đánh dấu
      targets.forEach(removeDragClasses);
    } else {
      // 3. Restore toàn bộ (dựa trên active attribute)
      restoreDragClasses();
    }
  };

  // ===== per-input observer (theo dõi readonly <-> edit) =====
  const perInputObserverMap = new WeakMap();

  const attachInputObserver = (inputEl) => {
    if (perInputObserverMap.has(inputEl)) return; // đã gắn

    const obs = new MutationObserver(() => {
      // Bricks vừa đổi class (readonly <-> edit)
      syncForInput(inputEl);
    });
    obs.observe(inputEl, { attributes: true, attributeFilter: ["class"] });
    perInputObserverMap.set(inputEl, obs);
  };

  const detachInputObserver = (inputEl) => {
    const obs = perInputObserverMap.get(inputEl);
    if (obs) {
      obs.disconnect();
      perInputObserverMap.delete(inputEl);
    }
  };

  // ===== events: chỉ focusin/focusout trên input =====
  document.addEventListener(
    "focusin",
    (e) => {
      const inputEl = e.target;
      if (!(inputEl instanceof HTMLInputElement)) return;
      if (!withinRoot(inputEl)) return;
      if (!inputEl.matches(TITLE_INPUT_SELECTOR)) return;

      // đồng bộ trạng thái ngay khi focus
      syncForInput(inputEl);
      // theo dõi chuyển đổi readonly <-> edit cho CHÍNH input này
      attachInputObserver(inputEl);
    },
    true,
  );

  document.addEventListener(
    "focusout",
    (e) => {
      const inputEl = e.target;
      if (!(inputEl instanceof HTMLInputElement)) return;
      if (!withinRoot(inputEl)) return;
      if (!inputEl.matches(TITLE_INPUT_SELECTOR)) return;

      // blur coi như kết thúc rename → bật lại classes
      restoreDragClasses();

      // ngắt observer của input này
      detachInputObserver(inputEl);
    },
    true,
  );

  // ===== mở khoá paste khi đang rename (tuỳ chọn, nhẹ) =====
  const isMac = () => /Mac/i.test(navigator.platform);
  const isActiveRenamingInput = () => {
    const el = document.activeElement;
    return (
      el instanceof HTMLInputElement &&
      withinRoot(el) &&
      el.matches(TITLE_INPUT_SELECTOR) &&
      isRenaming(el)
    );
  };

  document.addEventListener(
    "keydown",
    (e) => {
      const pasteCombo =
        (isMac() ? e.metaKey : e.ctrlKey) &&
        (e.key === "v" || e.key === "V" || e.code === "KeyV");
      if (!pasteCombo) return;
      if (isActiveRenamingInput()) {
        e.stopPropagation();
      }
    },
    true,
  );

  document.addEventListener(
    "paste",
    (e) => {
      if (isActiveRenamingInput()) {
        e.stopPropagation();
      }
    },
    true,
  );
})();
