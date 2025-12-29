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
 *             items:
 *                $ref: '#/components/schemas/Commande'
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
 *                 $ref: '#/components/schemas/Commande'
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
 *               $ref: '#/components/schemas/Commande'
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
 *           $ref: '#/components/schemas/Commande'
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