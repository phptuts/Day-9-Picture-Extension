chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  const imgs = document.getElementsByTagName("img");
  for (var img of imgs) {
    console.log(img);
  }
});
