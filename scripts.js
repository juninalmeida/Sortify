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

const Sortify = {
  state: {
    amount: 0,
    min: 0,
    max: 0,
    noRepeat: false,
  },

  elements: {
    form: null,
    btnSortear: null,
    inputs: {
      amount: null,
      min: null,
      max: null,
      noRepeat: null,
    },
    resultArea: null,
  },

  init() {
    this.cacheDom();
    this.bindEvents();
  },

  cacheDom() {
    this.elements.form = document.querySelector(".sort-form");
    this.elements.inputs.amount = document.getElementById("quantity");
    this.elements.inputs.min = document.getElementById("min");
    this.elements.inputs.max = document.getElementById("max");
    this.elements.inputs.noRepeat = document.getElementById("unique");
    this.elements.resultArea = document.querySelector(".results__content");
  },

  bindEvents() {
    if (!this.elements.form) return;

    this.elements.form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.handleSubmit();
    });
  },

  handleSubmit() {
    this.updateState();

    if (!this.validate()) return;

    console.log("Validação aprovada! Estado atual:", this.state);
  },

  updateState() {
    const { amount, min, max, noRepeat } = this.elements.inputs;

    this.state.amount = Number(amount.value);
    this.state.min = Number(min.value);
    this.state.max = Number(max.value);
    this.state.noRepeat = noRepeat.checked;
  },

  validate() {
    const { amount, min, max, noRepeat } = this.state;

    if (isNaN(amount) || isNaN(min) || isNaN(max)) {
      alert("Por favor, insira apenas números válidos.");
      return false;
    }

    if (amount < 1) {
      alert("Você precisa sortear pelo menos 1 número.");
      return false;
    }

    if (min >= max) {
      alert("O valor 'Mínimo' deve ser menor que o 'Máximo'.");
      return false;
    }

    if (noRepeat) {
      const totalAvailable = max - min + 1;
      if (amount > totalAvailable) {
        alert(
          `Erro: Você pediu ${amount} números únicos, mas o intervalo ${min}-${max} só possui ${totalAvailable} números disponíveis.`
        );
        return false;
      }
    }

    return true;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Sortify.init();
});
