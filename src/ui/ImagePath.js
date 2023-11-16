const images = require.context('../assets/images', true);
export const imagePath = (name) => images(name, true);