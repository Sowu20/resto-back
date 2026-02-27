const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.getOptimizedImage = async (req, res) => {
    try {
        const { filename } = req.params;
        const { w, h, q } = req.query; // largeur, hauteur, qualité

        const imagePath = path.join(__dirname, '../assets', filename);

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ message: 'Image non trouvée' });
        }

        let transform = sharp(imagePath); // Charge l'image avec Sharp

        const width = parseInt(w); // Largeur souhaitée
        const height = parseInt(h); // Hauteur souhaitée
        const quality = parseInt(q) || 80; // Qualité de compression (1-100)

        if (width || height) {
            transform = transform.resize(width || null, height || null, {
                fit: 'inside',           // Garde les proportions
                withoutEnlargement: true // N'agrandit pas si l'image est plus petite
            });
        }

        // Conversion en webp pour une meilleure compression si supporté, ou maintien du format original avec qualité optimisée
        const ext = path.extname(filename).toLowerCase();

        if (ext === '.jpg' || ext === '.jpeg') {
            transform = transform.jpeg({ quality }); // Compression JPEG
        } else if (ext === '.png') {
            transform = transform.png({ quality }); // Compression PNG
        } else if (ext === '.webp') {
            transform = transform.webp({ quality }); // Compression WebP
        }

        const buffer = await transform.toBuffer(); // Image traitée en mémoire

        // Configuration du cache pour la performance
        res.set('Cache-Control', 'public, max-age=31536000');// Cache longue durée (1 an) car l'image ne change pas
        res.type(`image/${ext.replace('.', '') || 'jpeg'}`); // Détermine le Content-Type 
        res.send(buffer); // Envoie l'image binaire

    } catch (error) {
        console.error('Erreur optimisation image:', error);
        res.status(500).json({ message: 'Erreur lors du traitement de l\'image' });
    }
};
