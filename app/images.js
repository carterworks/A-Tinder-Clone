const imageModules = import.meta.glob("./images/**/*.{png,jpg,jpeg,gif,svg,JPG,webp}", {
  eager: true,
  import: "default",
});

const images = {};
for (const path in imageModules) {
  const name = path.replace("./images/", "").replace(/\.[^/.]+$/, "");
  images[name] = imageModules[path];
}

export default images;
