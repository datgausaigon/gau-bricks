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