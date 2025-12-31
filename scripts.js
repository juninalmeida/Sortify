(function () {
  if (!window.UnicornStudio) {
    window.UnicornStudio = { isInitialized: false };

    var script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

    script.onload = function () {
      if (!window.UnicornStudio.isInitialized) {
        UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    (document.head || document.body).appendChild(script);
  }
})();

const LoadingSystem = {
  state: {
    progress: 0,
    isComplete: false,
  },

  config: {
    duration: 3000,
    jumpInterval: 1200,
  },

  elements: {
    overlay: document.getElementById("app-loader"),
    percentText: document.getElementById("loader-percent"),
    barFill: document.getElementById("loader-bar"),
    block: document.getElementById("loader-block"),
  },

  init() {
    this.startProgress();
    this.startAnimationSync();
  },

  startProgress() {
    const stepTime = this.config.duration / 100;

    const timer = setInterval(() => {
      if (this.state.progress >= 100) {
        clearInterval(timer);
        this.completeLoading();
      } else {
        this.state.progress++;
        this.render();
      }
    }, stepTime);
  },

  startAnimationSync() {
    setTimeout(() => {
      this.spawnNumber();

      const animLoop = setInterval(() => {
        if (this.state.isComplete) {
          clearInterval(animLoop);
          return;
        }
        this.spawnNumber();
      }, this.config.jumpInterval);
    }, 550);
  },

  spawnNumber() {
    if (this.state.isComplete) return;

    const num = document.createElement("span");
    num.classList.add("loader__float-number");

    const randomValue = Math.floor(Math.random() * 100);
    num.innerText = randomValue.toString().padStart(2, "0");

    this.elements.block.appendChild(num);

    setTimeout(() => num.remove(), 800);
  },

  render() {
    this.elements.percentText.innerText = `${this.state.progress}%`;
    this.elements.barFill.style.width = `${this.state.progress}%`;
  },

  completeLoading() {
    this.state.isComplete = true;

    setTimeout(() => {
      this.elements.overlay.classList.add("loader--hidden");

      setTimeout(() => {
        this.elements.overlay.style.display = "none";
      }, 500);
    }, 500);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  LoadingSystem.init();
});
