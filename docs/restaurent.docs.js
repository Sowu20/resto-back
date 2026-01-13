/**
 * @swagger
 * tags:
 *   name: Restaurent
 *   description: Gestion des restaurants
 */

/**
 * @swagger
 * /api/restaurent:
 *   post:
 *     tags: [Restaurent]
 *     summary: Créer un restaurant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - adresse
 *               - telephone
 *               - latitude
 *               - longitude
 *             properties:
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               telephone:
 *                 type: string
 *               email:
 *                 type: string
 *               disponibilite:
 *                 type: boolean
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       400:
 *         description: Données invalides ou restaurant déjà existant
 *       403:
 *         description: Accès réservé aux restaurateurs
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/restaurent:
 *   get:
 *     tags: [Restaurent]
 *     summary: Liste des restaurants
 *     responses:
 *       200:
 *         description: Liste des restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurent'
 */

/**
 * @swagger
 * /api/restaurent/{id}:
 *   get:
 *     tags: [Restaurent]
 *     summary: Détails d’un restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurent'
 *       404:
 *         description: Restaurant introuvable
 *       400:
 *         description: ID invalide
 */

/**
 * @swagger
 * /api/restaurent/{id}:
 *   put:
 *     tags: [Restaurent]
 *     summary: Modifier un restaurant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurent'
 *     responses:
 *       202:
 *         description: Restaurant modifié avec succès
 *       403:
 *         description: Accès interdit (non propriétaire)
 *       404:
 *         description: Restaurant introuvable
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/restaurent/{id}:
 *   delete:
 *     tags: [Restaurent]
 *     summary: Supprimer un restaurant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant supprimé avec succès
 *       403:
 *         description: Accès réservé aux administrateurs
 *       404:
 *         description: Restaurant introuvable
 *       401:
 *         description: Non authentifié
 */