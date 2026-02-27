/**
 * @swagger
 * tags:
 *   name: Annonce
 *   description: Gestion des annonces
 */


/**
 * @swagger
 * /api/annonce:
 *   post:
 *     tags: [Annonce]
 *     summary: Créer une annonce
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *
 *     responses:
 *       201:
 *         description: Annonce créée
 *
 */


/**
 * @swagger
 * /api/annonce:
 *   get:
 *     tags: [Annonce]
 *     summary: Liste des annonces
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des annonces
 *
 */


/**
 * @swagger
 * /api/annonce/{id}:
 *   get:
 *     tags: [Annonce]
 *     summary: Détail d'une annonce
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Annonce trouvée
 *
 */


/**
 * @swagger
 * /api/annonce/{id}:
 *   put:
 *     tags: [Annonce]
 *     summary: Modifier une annonce
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Annonce'
 *
 *     responses:
 *       202:
 *         description: Annonce modifiée
 *
 */


/**
 * @swagger
 * /api/annonce/{id}:
 *   delete:
 *     tags: [Annonce]
 *     summary: Supprimer une annonce
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Annonce supprimée
 *
 */