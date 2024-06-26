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
const shareButtons = document.querySelectorAll(".share-button");

shareButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const buttonClicked = event.target.closest('.share-button');
    const copyLink = buttonClicked.getAttribute("data-share-url");
    const articleId = buttonClicked.getAttribute("data-article-id");
    
    // Controleer of articleId correct is
    // console.log("Clicked articleId:", articleId);

    copyToClipboard(copyLink);
    showCustomAlert();

    fetch('/update-share-counter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId })
    })
    .then(response => response.json())
    .then(data => {

      // console.log("Response from server:", data);
      console.log(buttonClicked);

      const shareCounterElement = buttonClicked.closest('.article-item').querySelector('.share-counter');
      shareCounterElement.textContent = `${data.shareCount} keer gedeeld`;
    });
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
