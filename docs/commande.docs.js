/**
 * @swagger
 * tags:
 *   name: Commande
 */

/**
 * @swagger
 * /commande:
 *   post:
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantite, statut, total_commande, user, restaurent, repas]
 *             properties:
 *               quantite:
 *                 type: number
 *               statut:
 *                 type: string
 *                 enum: [en_attente, en_cours, termine]
 *               total_commande:
 *                 type: number
 *               user:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               restaurent:
 *                 type: string
 *                 description: ID du restaurant
 *               repas:
 *                 type: string
 *                 description: ID du repas
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /commande:
 *   get:
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   quantite:
 *                     type: number
 *                   statut:
 *                     type: string
 *                     enum: [en_attente, en_cours, termine]
 *                   total_commande:
 *                     type: number
 *                   user:
 *                     type: string
 *                   restaurent:
 *                     type: string
 *                   repas:
 *                     type: string
 */

/**
 * @swagger
 * /commande/{id}:
 *   get:
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 quantite:
 *                   type: number
 *                 statut:
 *                   type: string
 *                   enum: [en_attente, en_cours, termine]
 *                 total_commande:
 *                   type: number
 *                 user:
 *                   type: string
 *                 restaurent:
 *                   type: string
 *                 repas:
 *                   type: string
 *       404:
 *         description: Commande non trouvée
 */

/**
 * @swagger
 * /commande/{id}:
 *   put:
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite:
 *                 type: number
 *               statut:
 *                 type: string
 *                 enum: [en_attente, en_cours, termine]
 *               total_commande:
 *                 type: number
 *     responses:
 *       200:
 *         description: Commande modifiée avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Commande non trouvée
 */

/**
 * @swagger
 * /commande/{id}:
 *   delete:
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la commande
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       404:
 *         description: Commande non trouvée
 */