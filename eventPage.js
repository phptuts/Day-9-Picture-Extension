chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "replaceImage",
    title: "Replace Image",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((data) => {
  console.log(data);
});
