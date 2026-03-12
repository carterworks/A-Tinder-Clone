const imageModules = import.meta.glob("./images/**/*.{png,jpg,jpeg,gif,svg,JPG}", {
  eager: true,
  import: "default",
});

const images = {};
for (const path in imageModules) {
  const name = path.replace("./images/", "");
  images[name] = imageModules[path];
}

export default images;
