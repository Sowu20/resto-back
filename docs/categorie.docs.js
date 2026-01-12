/**
 * @swagger
 * tags:
 *   name: Categorie
 *   description: Gestion des catégories de repas
 */

/**
 * @swagger
 * /api/categorie:
 *   post:
 *     tags: [Categorie]
 *     summary: Créer une catégorie
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/categorie:
 *   get:
 *     tags: [Categorie]
 *     summary: Lister toutes les catégories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorie'
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   get:
 *     tags: [Categorie]
 *     summary: Détails d’une catégorie
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
 *         description: Catégorie trouvée
 *       404:
 *         description: Catégorie introuvable
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   put:
 *     tags: [Categorie]
 *     summary: Modifier une catégorie
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
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       201:
 *         description: Catégorie modifiée avec succès
 *       404:
 *         description: Catégorie introuvable
 */

/**
 * @swagger
 * /api/categorie/{id}:
 *   delete:
 *     tags: [Categorie]
 *     summary: Supprimer une catégorie
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
 *         description: Catégorie supprimée avec succès
 *       400:
 *         description: ID invalide
 */