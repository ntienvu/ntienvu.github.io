/* Vu Nguyen — site behaviour. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* ---- Theme (light/dark) with persistence ---- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (!stored && window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) {
    stored = "dark";
  }
  if (stored) root.setAttribute("data-theme", stored);

  function setToggleIcon(btn) {
    if (!btn) return;
    btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    setToggleIcon(toggle);
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        setToggleIcon(toggle);
      });
    }

    /* ---- Mobile nav ---- */
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
    }

    /* ---- Modal shim: replaces Bootstrap's data-toggle="modal" ---- */
    function openModal(modal) {
      if (modal) modal.classList.add("open");
    }
    function closeModal(modal) {
      if (modal) modal.classList.remove("open");
    }

    document.querySelectorAll('[data-toggle="modal"]').forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var sel = trigger.getAttribute("href") || trigger.getAttribute("data-target");
        if (!sel) return;
        // Some legacy hrefs are absolute (e.g. http://.../#id); keep only the hash.
        var hash = sel.indexOf("#") >= 0 ? sel.slice(sel.indexOf("#")) : sel;
        openModal(document.querySelector(hash));
      });
    });

    document.querySelectorAll(".modal").forEach(function (modal) {
      // Close on backdrop click
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal(modal);
      });
      // Close buttons
      modal.querySelectorAll('.close, [data-dismiss="modal"]').forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          closeModal(modal);
        });
      });
    });

    // Close any open modal on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.open").forEach(closeModal);
      }
    });
  });
})();
