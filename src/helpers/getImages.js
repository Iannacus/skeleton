const fs = require("node:fs/promises");
const path = require("node:path");

async function getImages(dirPath) {
  const formats = [".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"];

  const imagesPath = path.join(__dirname, "..", dirPath);

  const images = await fs.readdir(imagesPath);
  const filtered = images.filter((img) => formats.includes(path.extname(img)));
  return filtered.map((img) => ({
    filename: img,
    path: `${imagesPath}/${img}`,
    cid: img.split(".")[0],
  }));
}

module.exports = getImages;
