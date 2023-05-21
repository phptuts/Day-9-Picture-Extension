const buttonEl = document.querySelector("button");
const imageUrlEl = document.getElementById("image");
const imageReplaceEl = document.getElementById("replace_image");

buttonEl.addEventListener("click", () => {
  const url = imageUrlEl.value;
  chrome.storage.sync.set({ url }, function () {
    imageReplaceEl.src = url;
  });
});

chrome.storage.sync.get("url", (data) => {
  if (data.url) {
    imageReplaceEl.src = data.url;
  }
});
