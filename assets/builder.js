;(() => {
    'use strict';

    /**
     * Bảng chọn màu (Color Palette) mặc định là danh sách (List) thay vì lưới (Grid).
     * Color Palette default from Grid mode to List mode.
     */
    function maybeSetColorsToList(element) {
        const trigger = element.querySelector('ul');
        const isTarget = trigger.classList.contains("color-palette") && trigger.classList.contains("grid");
        if (!isTarget) {
            return
        }

        const mode_switch = element.querySelector('.label-actions > *:last-child');
        mode_switch.click();
    }

    window.addEventListener('load', () => {
        const targetElement = document.querySelector('.bricks-panel');
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.classList && addedNode.classList.contains('bricks-control-popup')) {
                            maybeSetColorsToList(addedNode);
                        }
                    }
                }
            }
        });
        if (targetElement) {
            observer.observe(targetElement, {attributes: true, childList: true, subtree: true});
        }
    });
})();

;(() => {
    'use strict';

    /**
     * Cải thiện thao tác đổi tên (Rename) trong Structure Panel.
     * - Khi đang rename: Gỡ các lớp kéo/thả trên phần tử item cha để có thể quét khối và dán.
     * - Khi kết thúc rename: Thêm lại các lớp đó để drag/drop hoạt động bình thường.
     * - Mở khoá dán (Ctrl/Cmd+V) và menu chuột phải trong lúc rename.
     *
     * Improve renaming in the Structure Panel.
     * - While renaming: Remove drag-related classes on the parent item so text selection and paste work.
     * - After renaming: Add those classes back so drag/drop returns to normal.
     * - Unlock paste (Ctrl/Cmd+V) and context menu while renaming.
     */

        // Ô nhập dùng để đổi tên phần tử trong Structure Panel.
        // Rename input field inside the Structure Panel.
    const RENAME_INPUT_SELECTOR =
            '.bricks-structure-list .structure-item .title input.label';

    // Các lớp sẽ bị gỡ khi rename và được thêm lại khi kết thúc.
    // Classes to remove while renaming and add back after.
    const CLASSES_TOGGLED_WHILE_RENAMING = [
        'bricks-draggable-item',
        'bricks-draggable-handle',
        'draggable',
        'element'
    ];

    // Lấy phần tử <li> đại diện cho item từ input rename.
    // Get the parent <li> from the rename input.
    function getStructureListItemElement(inputElement) {
        if (!inputElement || typeof inputElement.closest !== 'function') return null;
        return (
            inputElement.closest('li.bricks-draggable-item') ||
            inputElement.closest('li')
        );
    }

    // Input đang rename khi không có class 'readonly'.
    // Input is renaming when it lacks the 'readonly' class.
    function isInputRenaming(inputElement) {
        return (
            inputElement instanceof HTMLInputElement &&
            !inputElement.classList.contains('readonly')
        );
    }

    // Bắt đầu rename: Gỡ lớp trên item cha.
    // Begin rename: Remove classes on the parent item.
    function beginRenameOnItem(structureItemElement) {
        if (!structureItemElement || !structureItemElement.classList) return;
        CLASSES_TOGGLED_WHILE_RENAMING.forEach((className) =>
            structureItemElement.classList.remove(className)
        );
    }

    // Kết thúc rename: Thêm lại lớp trên item cha.
    // End rename: Add classes back on the parent item.
    function endRenameOnItem(structureItemElement) {
        if (!structureItemElement || !structureItemElement.classList) return;
        CLASSES_TOGGLED_WHILE_RENAMING.forEach((className) =>
            structureItemElement.classList.add(className)
        );
    }

    // Bảo đảm có thể “quét khối” ngay khi kéo chuột trong input (chạy sớm ở capture phase).
    // Ensure selection works from the first drag inside input (run early in capture phase).
    document.addEventListener(
        'pointerdown',
        (event) => {
            const targetInputElement = event.target;
            if (
                !(targetInputElement instanceof HTMLInputElement) ||
                !targetInputElement.matches(RENAME_INPUT_SELECTOR)
            ) return;

            const structureItemElement = getStructureListItemElement(targetInputElement);
            if (structureItemElement) beginRenameOnItem(structureItemElement);
        },
        true
    );

    // Theo dõi readonly ↔ edit trên chính input để gỡ/thêm lớp đúng lúc.
    // Watch readonly ↔ edit on the input to remove/add classes at the right time.
    const renameObserverByInput = new WeakMap();

    document.addEventListener(
        'focusin',
        (event) => {
            const targetInputElement = event.target;
            if (
                !(targetInputElement instanceof HTMLInputElement) ||
                !targetInputElement.matches(RENAME_INPUT_SELECTOR)
            ) return;

            const structureItemElement = getStructureListItemElement(targetInputElement);
            if (!structureItemElement) return;

            const renameObserver = new MutationObserver(() => {
                if (isInputRenaming(targetInputElement)) {
                    beginRenameOnItem(structureItemElement);
                } else {
                    endRenameOnItem(structureItemElement);
                }
            });

            // Quan sát thay đổi 'class' trên input để bắt readonly ↔ edit.
            // Observe input 'class' changes to detect readonly ↔ edit.
            renameObserver.observe(targetInputElement, {
                attributes: true,
                attributeFilter: ['class'],
            });
            renameObserverByInput.set(targetInputElement, renameObserver);

            // Đồng bộ ngay trạng thái hiện tại.
            // Sync current state immediately.
            if (isInputRenaming(targetInputElement)) {
                beginRenameOnItem(structureItemElement);
            } else {
                endRenameOnItem(structureItemElement);
            }
        },
        true
    );

    // Khi input blur: Thêm lại lớp & ngắt observer.
    // On blur: Add classes back & disconnect the observer.
    document.addEventListener(
        'focusout',
        (event) => {
            const targetInputElement = event.target;
            if (
                !(targetInputElement instanceof HTMLInputElement) ||
                !targetInputElement.matches(RENAME_INPUT_SELECTOR)
            ) return;

            const structureItemElement = getStructureListItemElement(targetInputElement);
            if (structureItemElement) endRenameOnItem(structureItemElement);

            const renameObserver = renameObserverByInput.get(targetInputElement);
            if (renameObserver) {
                renameObserver.disconnect();
                renameObserverByInput.delete(targetInputElement);
            }
        },
        true
    );

    // Mở khoá dán trong lúc rename (phím tắt và menu chuột phải).
    // Unlock paste while renaming (shortcut and context menu).
    function isMacPlatform() {
        return /Mac/i.test(navigator.platform);
    }

    function isActiveRenamingInput(element) {
        return (
            element instanceof HTMLInputElement &&
            element.matches(RENAME_INPUT_SELECTOR) &&
            isInputRenaming(element)
        );
    }

    // Ctrl/Cmd + V: Chặn propagation sớm, không preventDefault (trình duyệt tự dán).
    // Ctrl/Cmd + V: Stop propagation early, no preventDefault (let browser paste).
    document.addEventListener(
        'keydown',
        (event) => {
            const isPasteShortcut =
                (isMacPlatform() ? event.metaKey : event.ctrlKey) &&
                (event.key === 'v' || event.key === 'V' || event.code === 'KeyV');

            if (!isPasteShortcut) return;
            if (isActiveRenamingInput(document.activeElement)) {
                event.stopPropagation();
            }
        },
        true
    );

    // Menu chuột phải → Paste: Chặn propagation, không ngăn hành vi mặc định.
    // Context menu → Paste: Stop propagation, do not block default behavior.
    document.addEventListener(
        'paste',
        (event) => {
            if (isActiveRenamingInput(document.activeElement)) {
                event.stopPropagation();
            }
        },
        true
    );
})();