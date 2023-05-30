chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "favorite",
    title: "Favorite Image",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    id: "open",
    title: "Open image in new tab",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener(async (data) => {
  if (data.mediaType !== "image") {
    return;
  }
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {
    type: data.menuItemId,
    src: data.srcUrl,
  });
});
