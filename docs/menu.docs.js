/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Gestion des menus
 */

/**
 * @swagger
 * /api/menu:
 *   post:
 *     tags: [Menu]
 *     summary: Créer un menu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu créé avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     tags: [Menu]
 *     summary: Lister tous les menus
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     tags: [Menu]
 *     summary: Détails d’un menu
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
 *         description: Menu trouvé
 *       404:
 *         description: Menu introuvable
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     tags: [Menu]
 *     summary: Modifier un menu
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
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu modifié avec succès
 *       404:
 *         description: Menu introuvable
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     tags: [Menu]
 *     summary: Supprimer un menu
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
 *         description: Menu supprimé avec succès
 *       400:
 *         description: ID invalide
 */