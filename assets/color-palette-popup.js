(() => {
  "use strict";

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

    // Check if toggle already exists to avoid duplicates
    if (control.querySelector(".gau-color-palette-popup-toggle")) return;

    // Create the button
    const btn = document.createElement("div");
    btn.className =
      "gau-color-palette-popup-toggle bricks-svg-wrapper dynamic-tag-picker-button";

    // Bricks Attributes
    btn.setAttribute("data-name", "color-palette-popup-toggle");
    btn.setAttribute("data-balloon", "Expand Palette");
    btn.setAttribute("data-balloon-pos", "top-right");

    // Initial State: Expand
    btn.innerHTML = iconExpand;

    // Toggle Logic
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent closing the popup
      const isActive = control.classList.toggle(
        "gau-color-palette-popup-active",
      );

      // Update Icon and Title based on new state
      if (isActive) {
        btn.innerHTML = iconCollapse;
        btn.setAttribute("data-balloon", "Collapse Palette");
      } else {
        btn.innerHTML = iconExpand;
        btn.setAttribute("data-balloon", "Expand Palette");
      }
    });

    // Insert button into .palette-actions
    const actionsContainer = popup.querySelector(".palette-actions");
    if (actionsContainer) {
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
