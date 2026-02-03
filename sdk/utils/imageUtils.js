/**
 * Utilitaire pour générer des URLs d'images optimisées pour le SDK mobile.
 * Gère à la fois les assets locaux (via imageController) et les images externes Unsplash.
 */

const BASE_URL = 'https://resto-back-xazy.onrender.com';
const DEFAULT_IMAGE_URL = `${BASE_URL}/assets/Restaurant.jpg`;

/**
 * Génère une URL d'image optimisée.
 * 
 * @param {string} url - L'URL d'image originale ou le nom du fichier.
 * @param {Object} options - Options d'optimisation.
 * @param {number} [options.width] - Largeur souhaitée.
 * @param {number} [options.height] - Hauteur souhaitée.
 * @param {number} [options.quality=80] - Qualité de l'image (1-100).
 * @returns {string} L'URL optimisée.
 */
const getOptimizedImageUrl = (url, options = {}) => {
    // Si pas d'URL fournie, utiliser l'image par défaut
    if (!url) return DEFAULT_IMAGE_URL;

    const { width, height, quality = 80 } = options;

    // Gestion des images Unsplash
    if (url.includes('unsplash.com')) {
        const unsplashUrl = new URL(url);
        if (width) unsplashUrl.searchParams.set('w', width);
        if (height) unsplashUrl.searchParams.set('h', height);
        unsplashUrl.searchParams.set('q', quality);
        unsplashUrl.searchParams.set('auto', 'format');
        unsplashUrl.searchParams.set('fit', 'crop');
        return unsplashUrl.toString();
    }

    // Gestion des assets locaux (conversion vers la route optimisée)
    if (url.includes('/assets/')) {
        const filename = url.split('/').pop();
        let optimizedUrl = `${BASE_URL}/api/images/${filename}?q=${quality}`;
        if (width) optimizedUrl += `&w=${width}`;
        if (height) optimizedUrl += `&h=${height}`;
        return optimizedUrl;
    }

    // Retourne l'original si le format n'est pas reconnu
    return url;
};

module.exports = { getOptimizedImageUrl };
