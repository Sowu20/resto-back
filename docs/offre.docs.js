/**
 * @swagger
 * tags:
 *   name: Offre
 *   description: Gestion des offres spéciales
 */


/**
 * @swagger
 * /api/offre:
 *   post:
 *     tags: [Offre]
 *     summary: Créer une offre spéciale
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offre'
 *
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 */


/**
 * @swagger
 * /api/offre:
 *   get:
 *     tags: [Offre]
 *     summary: Liste des offres spéciales
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des offres
 */


/**
 * @swagger
 * /api/offre/{id}:
 *   get:
 *     tags: [Offre]
 *     summary: Détail d'une offre
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
 *         description: Offre trouvée
 */


/**
 * @swagger
 * /api/offre/{id}:
 *   put:
 *     tags: [Offre]
 *     summary: Modifier une offre spéciale
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offre'
 *
 *     responses:
 *       202:
 *         description: Offre modifiée avec succès
 */


/**
 * @swagger
 * /api/offre/{id}:
 *   delete:
 *     tags: [Offre]
 *     summary: Supprimer une offre spéciale
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
 *         description: Offre supprimée
 */


/**
 * @swagger
 * /api/offre/restaurent/{restaurentId}:
 *   get:
 *     tags: [Offre]
 *     summary: Obtenir les offres d'un restaurent
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: restaurentId
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Liste des offres pour ce restaurent
 */


/**
 * @swagger
 * /api/offre/repas/{repasId}:
 *   get:
 *     tags: [Offre]
 *     summary: Obtenir les offres pour un repas spécifique
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: repasId
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Liste des offres pour ce repas
 */