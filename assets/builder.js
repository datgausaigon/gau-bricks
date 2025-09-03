;(() => {
    'use strict';
    /** ColorPaletteGridToList
     */
    function maybeSetColorsToList(element) {
        const trigger = element.querySelector('ul');
        const isTarget = trigger.classList.contains("color-palette") && trigger.classList.contains("grid");
        if (!isTarget) {
            return
        }
        /* Is in Grid mode click the switch */
        const mode_switch = element.querySelector('.label-actions > *:last-child');
        mode_switch.click();
    }

    window.addEventListener('load', () => {
        const targetElement = document.querySelector('.bricks-panel');
        const observer = new MutationObserver((mutationsList, observer) => {
            /*console.log(mutationsList);*/
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
    /** StructureEditDragGuard (lite)
     */
    const shouldBlock = el =>
        el.matches('#bricks-structure .structure-item .title input:not(.readonly)');

    const stop = e => {
        if (shouldBlock(e.target)) e.stopPropagation();
    };

    document.addEventListener('pointerdown', stop, true);
    document.addEventListener('mousedown', stop, true);
    document.addEventListener('touchstart', stop, {capture: true, passive: true});
})();
