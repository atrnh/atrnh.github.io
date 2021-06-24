"use strict";

(() => {
  document.querySelectorAll("article.card").forEach((el) => {
    el.addEventListener("click", (e) => {
      console.log(e.target);
      console.log(e.target.dataset.url);
      window.location.assign(e.target.dataset.url);
    });
  });
})();
