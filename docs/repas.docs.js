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
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/repas:
 *   get:
 *     tags: [Repas]
 *     summary: Lister tous les repas
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
 *     summary: Détails d’un repas
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
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Repas'
 *     responses:
 *       200:
 *         description: Repas modifié avec succès
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
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Repas supprimé avec succès
 *       400:
 *         description: ID invalide
 */