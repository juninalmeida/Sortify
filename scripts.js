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
