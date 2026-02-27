/**
 * @swagger
 * tags:
 *   name: Promotion
 *   description: Gestion des promotions
 */

/**
 * @swagger
 * /api/promotion:
 *   post:
 *     tags: [Promotion]
 *     summary: Créer une promotion
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promotion'
 *
 *     responses:
 *       201:
 *         description: Promotion créée avec succès
 */

/**
 * @swagger
 * /api/promotion:
 *   get:
 *     tags: [Promotion]
 *     summary: Lister toutes les promotions
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des promotions
 */

/**
 * @swagger
 * /api/promotion/actives:
 *   get:
 *     tags: [Promotion]
 *     summary: Obtenir les promotions actives
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des promotions actuellement valides
 */

/**
 * @swagger
 * /api/promotion/expires:
 *   get:
 *     tags: [Promotion]
 *     summary: Obtenir les promotions expirées
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des promotions expirées
 */

/**
 * @swagger
 * /api/promotion/{id}:
 *   get:
 *     tags: [Promotion]
 *     summary: Détail d'une promotion
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
 *         description: Promotion trouvée
 */

/**
 * @swagger
 * /api/promotion/{id}:
 *   put:
 *     tags: [Promotion]
 *     summary: Modifier une promotion
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
 *             $ref: '#/components/schemas/Promotion'
 *
 *     responses:
 *       200:
 *         description: Promotion modifiée avec succès
 */

/**
 * @swagger
 * /api/promotion/{id}:
 *   delete:
 *     tags: [Promotion]
 *     summary: Supprimer une promotion
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
 *         description: Promotion supprimée avec succès
 */

/**
 * @swagger
 * /api/promotion/restaurent/{restaurentId}:
 *   get:
 *     tags: [Promotion]
 *     summary: Obtenir les promotions d'un restaurent
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
 *         description: Liste des promotions pour ce restaurent
 */