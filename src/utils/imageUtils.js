/**
 * Optimizes Cloudinary image URLs by injecting transformation parameters.
 * Automatically compresses the image, converts to WebP, and resizes to the specified width.
 * 
 * @param {string} url - The original image URL
 * @param {number} width - The maximum width of the image (default 800)
 * @returns {string} The optimized image URL
 */
export const optimizeImage = (url, width = 800) => {
  if (!url) return '';
  
  // Check if it's a Cloudinary URL
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Inject auto-format, auto-quality, and width limit
    const transformations = `q_auto,f_auto,w_${width},c_limit/`;
    return url.replace('/upload/', `/upload/${transformations}`);
  }
  
  // Return original URL if not Cloudinary or doesn't match expected pattern
  return url;
};

/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * This ensures the image is small enough (under Vercel's 4.5MB limit) before uploading.
 * 
 * @param {File} file - The original image file
 * @returns {Promise<File>} A promise that resolves to the compressed File
 */
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    // If it's already very small, just return it
    if (file.size < 1024 * 1024) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          0.8 // 80% quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
