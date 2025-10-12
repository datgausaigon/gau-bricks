;(() => {
    'use strict';

    // Chỉ hoạt động trong Structure Panel của Bricks
    const ROOT_SCOPE_SELECTOR = '#bricks-structure';
    const TITLE_INPUT_SELECTOR = '.structure-item .title input';
    const ACTIVE_ITEM_SELECTOR = 'li.active';

    // Các class phải tắt khi đang rename, và bật lại khi xong
    const TOGGLE_CLASSES = [
        'bricks-draggable-item',
        'bricks-draggable-handle',
        'draggable',
        'element'
    ];

    // ===== helpers =====
    const withinRoot = (el) =>
        el instanceof Element && el.closest(ROOT_SCOPE_SELECTOR);

    const getActiveItem = (inputEl) =>
        inputEl?.closest?.(ACTIVE_ITEM_SELECTOR) || null;

    const isRenaming = (inputEl) =>
        inputEl instanceof HTMLInputElement && !inputEl.classList.contains('readonly');

    const removeDragClasses = (li) => {
        if (!li || !li.classList) return;
        TOGGLE_CLASSES.forEach((c) => li.classList.contains(c) && li.classList.remove(c));
    };

    const addDragClasses = (li) => {
        if (!li || !li.classList) return;
        TOGGLE_CLASSES.forEach((c) => !li.classList.contains(c) && li.classList.add(c));
    };

    const syncForInput = (inputEl) => {
        const li = getActiveItem(inputEl);
        if (!li) return;
        if (isRenaming(inputEl)) removeDragClasses(li);
        else addDragClasses(li);
    };

    // ===== per-input observer (theo dõi readonly <-> edit) =====
    const perInputObserverMap = new WeakMap();

    const attachInputObserver = (inputEl) => {
        if (perInputObserverMap.has(inputEl)) return; // đã gắn

        const obs = new MutationObserver(() => {
            // Bricks vừa đổi class (readonly <-> edit)
            syncForInput(inputEl);
        });
        obs.observe(inputEl, {attributes: true, attributeFilter: ['class']});
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
        'focusin',
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
        true
    );

    document.addEventListener(
        'focusout',
        (e) => {
            const inputEl = e.target;
            if (!(inputEl instanceof HTMLInputElement)) return;
            if (!withinRoot(inputEl)) return;
            if (!inputEl.matches(TITLE_INPUT_SELECTOR)) return;

            // blur coi như kết thúc rename → bật lại classes
            const li = getActiveItem(inputEl);
            if (li) addDragClasses(li);

            // ngắt observer của input này
            detachInputObserver(inputEl);
        },
        true
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
        'keydown',
        (e) => {
            const pasteCombo =
                (isMac() ? e.metaKey : e.ctrlKey) &&
                (e.key === 'v' || e.key === 'V' || e.code === 'KeyV');
            if (!pasteCombo) return;
            if (isActiveRenamingInput()) {
                e.stopPropagation();
            }
        },
        true
    );

    document.addEventListener(
        'paste',
        (e) => {
            if (isActiveRenamingInput()) {
                e.stopPropagation();
            }
        },
        true
    );
})();