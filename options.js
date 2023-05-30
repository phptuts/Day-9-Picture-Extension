const containerEl = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", async () => {
  const { images } = await chrome.storage.local.get("images");
  for (image of images) {
    createRow(image);
  }
});

async function deleteItem(id) {
  const { images } = await chrome.storage.local.get("images");
  let imagesFiltered = images.filter((img) => img.id !== id);
  await chrome.storage.local.set({ images: imagesFiltered });
  Array.from(document.querySelectorAll(".picture")).forEach((picEl) => {
    picEl.remove();
  });
  for (image of images) {
    createRow(image);
  }
}

function createRow(imageData) {
  const row = document.createElement("div");
  row.classList.add("picture");
  row.classList.add("row");
  const column = document.createElement("div");
  column.classList.add("column");
  row.appendChild(column);
  const h2 = document.createElement("h2");
  if (imageData.url.substring(0, 4) !== "data") {
    const a = document.createElement("a");
    a.href = imageData.url;
    a.textContent = imageData.name;
    a.target = "_blank";
    h2.appendChild(a);
  } else {
    h2.textContent = imageData.name + " (image_string)";
  }
  column.appendChild(h2);
  const image = document.createElement("img");
  image.src = imageData.url;
  const button = document.createElement("button");
  button.classList.add("button");
  button.classList.add("float-right");
  button.addEventListener("click", () => deleteItem(imageData.id));
  button.textContent = "Delete";
  h2.append(button);
  column.appendChild(image);

  containerEl.appendChild(row);
}
