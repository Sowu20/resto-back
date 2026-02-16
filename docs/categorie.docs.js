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
 *       401:
 *         description: Non authentifié
 */


/**
 * @swagger
 * /api/categorie:
 *   get:
 *     tags: [Categorie]
 *     summary: Liste des catégories
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
 *       401:
 *         description: Non authentifié
 */


/**
 * @swagger
 * /api/categorie/{id}:
 *   get:
 *     tags: [Categorie]
 *     summary: Détail d'une catégorie
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorie'
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
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       200:
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
 *         description: Catégorie supprimée
 *       400:
 *         description: ID invalide
 */


/**
 * @swagger
 * /api/categorie/menu/{menuId}/repas:
 *   get:
 *     tags: [Categorie]
 *     summary: Liste des catégories par menu
 *     description: Récupère les catégories d’un menu pour le restaurent connecté
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorie'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */