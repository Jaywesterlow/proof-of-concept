// * ---------- Scroll / Swipe timeout ----------

document.addEventListener("DOMContentLoaded", function () {
  // Verberg a tags als JS werkt
  document
    .querySelectorAll(".swipe-finger, .scroll-mouse")
    .forEach(function (element) {
      element.classList.add("hidden");
    });

  setTimeout(function () {
    document
      .querySelectorAll(".swipe-finger, .scroll-mouse")
      .forEach(function (element) {
        element.classList.remove("hidden");
      });
  }, 5000);
});

// * ---------- Copy function ----------

// Voeg een event listener toe aan alle "Share"-knoppen
const shareButtons = document.querySelectorAll(".article-item button#share-button");

shareButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const copyLink = this.getAttribute("data-share-url");
    copyToClipboard(copyLink);
    showCustomAlert();
  });
});

// Naar klembord te kopiëren
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Link gekopieerd");
  });
}

// Custom window alert
function showCustomAlert() {
  const customAlert = document.getElementById("custom-alert");
  customAlert.classList.remove("hidden");
  setTimeout(() => {
    customAlert.classList.add("hidden");
  }, 3000);
}
