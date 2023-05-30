const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
  console.log(sender, reply);
  reply("ok");
  if (message.type === "open") {
    window.open(message.src);
    return;
  }

  const name = prompt("Enter image name?");
  let { images } = await chrome.storage.local.get("images");
  images = isObjectEmpty(images) ? [] : images;
  images.push({ name, url: message.src, id: Date.now() });
  await chrome.storage.local.set({ images });
});
