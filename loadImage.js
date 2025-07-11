export const loadImage = async (path) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = path;
    img.onload = () => resolve(img);
  });
};
