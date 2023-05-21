chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "replaceImage",
    title: "Replace Image",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(async (data) => {
  if (data.menuItemId == "replaceImage" && data.mediaType == "image") {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      type: "replace_image",
      src: data.srcUrl,
    });
  }
});
