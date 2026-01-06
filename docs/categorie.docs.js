/**
 * @swagger
 * tags:
 *   name: Categorie
 */

/**
 * @swagger
 * /categorie:
 *   post:
 *     tags: [Categorie]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *                $ref: '#/components/schemas/CategorieRepas'
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /categorie:
 *   get:
 *     tags: [Categorie]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategorieRepas'
 */

/**
 * @swagger
 * /categorie/{id}:
 *   get:
 *     tags: [Categorie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategorieRepas'
 *       404:
 *         description: Catégorie non trouvée
 */

/**
 * @swagger
 * /categorie/{id}:
 *   put:
 *     tags: [Categorie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/CategorieRepas'
 *     responses:
 *       200:
 *         description: Catégorie modifiée avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catégorie non trouvée
 */

/**
 * @swagger
 * /categorie/{id}:
 *   delete:
 *     tags: [Categorie]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 */