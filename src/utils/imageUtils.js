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
