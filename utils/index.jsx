export const checkImageURL = (url) => {
    if (!url) return false;

    // Check if the URL is from a known image hosting domain like gstatic
    if (url.startsWith("https://encrypted-tbn0.gstatic.com/")) {
        return true; // Assume URLs from this domain are valid images
    }

    // Original regex for URLs with explicit extensions
    const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)(\\?.*)?(#.*)?$', 'i');
    return pattern.test(url);
};