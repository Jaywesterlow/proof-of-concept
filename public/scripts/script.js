// * ---------- Scroll / Swipe timeout ----------

document.addEventListener("DOMContentLoaded", function () {
  // Verberg de elementen standaard als JS werkt
  document.querySelectorAll('.swipe-finger, .scroll-mouse').forEach(function(element) {
    element.classList.add('hidden');
  });

  setTimeout(function() {
    document.querySelectorAll('.swipe-finger, .scroll-mouse').forEach(function(element) {
      element.classList.remove('hidden');
    });
  }, 5000);
});

// * ---------- Scroll / Swipe timeout ----------

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll('.article-item');
  items.forEach((item, index) => {
      setTimeout(() => {
          item.classList.add('hovered');
      }, index * 500);
  });
});
