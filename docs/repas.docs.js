/**
 * @swagger
 * tags:
 *   name: Repas
 *   description: Gestion des repas
 */


/**
 * @swagger
 * /api/repas:
 *   post:
 *     tags: [Repas]
 *     summary: Créer un repas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Repas'
 *     responses:
 *       201:
 *         description: Repas créé avec succès
 *       400:
 *         description: Erreur
 */


/**
 * @swagger
 * /api/repas:
 *   get:
 *     tags: [Repas]
 *     summary: Liste des repas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des repas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Repas'
 */


/**
 * @swagger
 * /api/repas/{id}:
 *   get:
 *     tags: [Repas]
 *     summary: Détail d’un repas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Repas trouvé
 *       404:
 *         description: Repas introuvable
 */


/**
 * @swagger
 * /api/repas/{id}:
 *   put:
 *     tags: [Repas]
 *     summary: Modifier un repas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Repas'
 *     responses:
 *       200:
 *         description: Repas modifié
 *       404:
 *         description: Repas introuvable
 */


/**
 * @swagger
 * /api/repas/{id}:
 *   delete:
 *     tags: [Repas]
 *     summary: Supprimer un repas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Repas supprimé
 *       400:
 *         description: ID invalide
 */


/**
 * @swagger
 * /api/repas/categorie/{categorieId}/repas:
 *   get:
 *     tags: [Repas]
 *     summary: Liste des repas par catégorie
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categorieId
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des repas
 */