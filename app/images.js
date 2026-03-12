const imageModules = import.meta.glob("./images/**/*.{png,jpg,jpeg,gif,svg,JPG,webp}", {
  eager: true,
  import: "default",
});

const images = {};
for (const path in imageModules) {
  const fullName = path.replace("./images/", "");
  const nameWithoutExt = fullName.replace(/\.[^/.]+$/, "");
  images[fullName] = imageModules[path];
  images[nameWithoutExt] = imageModules[path];
}

export default images;
