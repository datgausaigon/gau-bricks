(() => {
  "use strict";

    // State to persist expansion across re-renders
    let isPaletteExpanded = false;

    // Bricks Native Icons (localized from functions.php)
    function getIcon(icon) {
        if (!icon) return '';
        // Inject class bricks-svg if missing
        if (!icon.includes('class="bricks-svg"')) {
            return icon.replace('<svg', '<svg class="bricks-svg"');
        }
        return icon;
    }

    const iconExpand = (typeof GauBricksColorPalette !== 'undefined' && GauBricksColorPalette.icons.expand) 
        ? getIcon(GauBricksColorPalette.icons.expand) 
        : '<svg class="bricks-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.75 14.248 -9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m23.25 7.498 0 -6.75 -6.75 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m0.75 16.498 0 6.75 6.75 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m23.25 0.748 -9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>'; // Fallback
    
    const iconCollapse = (typeof GauBricksColorPalette !== 'undefined' && GauBricksColorPalette.icons.collapse)
        ? getIcon(GauBricksColorPalette.icons.collapse)
        : '<svg class="bricks-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m23.25 0.748 -9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m9.75 20.998 0 -6.75 -6.75 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m14.25 2.998 0 6.75 6.75 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="m9.75 14.248 -9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>'; // Fallback

  function injectToggle(popup) {
    // Find the parent control container
    const control = popup.closest(".control.control-color");
    if (!control) return;

    // --- PERSISTENCE OBSERVER ---
    // Watch for Bricks removing our class OR removing the popup, and put it back immediately
    if (!control._gauClassObserver) {
        control._gauClassObserver = new MutationObserver((mutations) => {
            if (!isPaletteExpanded) return;

            // 1. Class Persistence
            if (!control.classList.contains("gau-color-palette-popup-expand")) {
                control.classList.add("gau-color-palette-popup-expand");
            }

            // 2. Popup Resurrection (Nuclear Option)
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (const removedNode of mutation.removedNodes) {
                        if (removedNode.nodeType === 1 && removedNode.classList.contains('bricks-control-popup')) {
                            // Bricks closed it. We re-open it.
                            const trigger = control.querySelector('.bricks-control-preview') || control.querySelector('.dynamic-tag-picker-button');
                            if (trigger) {
                                // Use timeout to avoid conflict with current event loop
                                setTimeout(() => trigger.click(), 0);
                            }
                        }
                    }
                }
            }
        });
        control._gauClassObserver.observe(control, {
            attributes: true,
            attributeFilter: ["class"],
            childList: true, 
            subtree: true // Needed to see popup removal if it's deeper? Usually it's direct child of control or input-wrapper.
        });
    }

    // Avoid double injection of the button
    const existingBtn = control.querySelector(".gau-color-palette-popup-toggle");
    if (existingBtn) {
        // Just re-apply state if needed
        if (isPaletteExpanded && !control.classList.contains("gau-color-palette-popup-expand")) {
             control.classList.add("gau-color-palette-popup-expand");
             existingBtn.innerHTML = iconCollapse;
             existingBtn.setAttribute("data-balloon", "Collapse Palette");
        }
        return;
    }

    const actionsContainer = popup.querySelector('.palette-actions');
    if (actionsContainer) {
        // Create the button
        const btn = document.createElement("div");
        btn.className = "gau-color-palette-popup-toggle bricks-svg-wrapper dynamic-tag-picker-button";
        
        // Bricks Attributes
        btn.setAttribute("data-name", "color-palette-popup-toggle");
        
        // Initial State based on persistence
        if (isPaletteExpanded) {
            btn.innerHTML = iconCollapse;
            btn.setAttribute("data-balloon", "Collapse Palette");
            control.classList.add("gau-color-palette-popup-expand");
        } else {
            btn.innerHTML = iconExpand;
            btn.setAttribute("data-balloon", "Expand Palette");
            control.classList.remove("gau-color-palette-popup-expand");
        }
        
        btn.setAttribute("data-balloon-pos", "top-right");

        // Toggle Logic
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing the popup
            isPaletteExpanded = !isPaletteExpanded; // Toggle state

            if (isPaletteExpanded) {
                control.classList.add("gau-color-palette-popup-expand");
                btn.innerHTML = iconCollapse;
                btn.setAttribute("data-balloon", "Collapse Palette");
            } else {
                control.classList.remove("gau-color-palette-popup-expand");
                btn.innerHTML = iconExpand;
                btn.setAttribute("data-balloon", "Expand Palette");
            }
        });

        // Insert as the last child of .palette-actions
        actionsContainer.appendChild(btn);
    } else {
      // Fallback just in case
      const targetContainer =
        control.querySelector(".input-wrapper") || control;
      targetContainer.appendChild(btn);
    }
  }

  /**
   * Bảng chọn màu (Color Palette) mặc định là danh sách (List) thay vì lưới (Grid).
   * Color Palette default from Grid mode to List mode.
   */
  function maybeSetColorsToList(element) {
    // Inject toggle button whenever popup appears
    injectToggle(element);

    const trigger = element.querySelector("ul");
    if (!trigger) return;

    const isTarget =
      trigger.classList.contains("color-palette") &&
      trigger.classList.contains("grid");
    if (!isTarget) {
      return;
    }

    const mode_switch = element.querySelector(".label-actions > *:last-child");
    if (mode_switch) mode_switch.click();
  }

  // Observer Logic
  function startObserver() {
    const targetElement = document.querySelector(".bricks-panel");

    // Safety check: verify target is a valid Node
    if (targetElement && targetElement instanceof Node) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            for (const addedNode of mutation.addedNodes) {
              if (
                addedNode.nodeType === 1 &&
                addedNode.classList.contains("bricks-control-popup")
              ) {
                maybeSetColorsToList(addedNode);
                
                // Block event propagation to prevent Bricks from closing the popup
                // We add listeners to the popup AND its direct children to catch events early
                const events = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'keydown', 'keyup', 'focusout', 'blur'];
                const stopProp = (e) => {
                    if (isPaletteExpanded) {
                        e.stopPropagation();
                    }
                };

                events.forEach(evt => {
                    // Block at popup level
                    addedNode.addEventListener(evt, stopProp);
                    
                    // Block at direct child level (to beat any listeners on the popup itself)
                    Array.from(addedNode.children).forEach(child => {
                        child.addEventListener(evt, stopProp);
                    });
                });
              }
            }
          }
        }
      });

      observer.observe(targetElement, {
        attributes: false, // We only care about childList
        childList: true,
        subtree: true,
      });
    }
  }

  // Attempt to start observer on load, or immediately if ready
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    startObserver();
  } else {
    window.addEventListener("DOMContentLoaded", startObserver);
    window.addEventListener("load", startObserver); // Fallback
  }
})();
