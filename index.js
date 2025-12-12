// NoKeyboardCollapse plugin for Kettu
module.exports = class NoKeyboardCollapse {
  onLoad() {
    console.log("NoKeyboardCollapse loaded");
  }

  onStart() {
    console.log("NoKeyboardCollapse started");

    // Function to prevent keyboard collapse on all inputs
    this.preventCollapse = (input) => {
      let justPasted = false;

      // Detect paste
      input.addEventListener("paste", () => {
        justPasted = true;
      });

      // Intercept Enter key
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" && justPasted) {
          ev.preventDefault();        // prevent sending or blurring
          justPasted = false;
          setTimeout(() => input.focus(), 1); // keep keyboard open
        }
      });

      // Keep input focused if it loses focus
      input.addEventListener("blur", () => {
        setTimeout(() => input.focus(), 10);
      });
    };

    // Apply to all current text inputs in the document
    document.querySelectorAll("input, textarea").forEach(input => {
      this.preventCollapse(input);
    });

    // Optional: observe new inputs added dynamically
    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
            this.preventCollapse(node);
          }
        });
      }
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  onStop() {
    console.log("NoKeyboardCollapse stopped");
    // Disconnect observer when plugin stops
    if (this.observer) this.observer.disconnect();
  }
};
