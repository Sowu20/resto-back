/**
 * @swagger
 * tags:
 *   name: Commande
 *   description: Gestion des commandes
 */

/**
 * @swagger
 * /api/commande:
 *   post:
 *     summary: Créer une commande
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/commande:
 *   get:
 *     summary: Lister toutes les commandes
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
 * /api/commande/{id}:
 *   get:
 *     summary: Détail d'une commande
 *     tags: [Commande]
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
 *         description: Commande trouvée
 *       404:
 *         description: Commande introuvable
 */

/**
 * @swagger
 * /api/commande/{id}:
 *   put:
 *     summary: Modifier une commande
 *     tags: [Commande]
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
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       202:
 *         description: Commande modifiée
 *       404:
 *         description: Commande introuvable
 */

/**
 * @swagger
 * /api/commande/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Commande]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Commande supprimée
 */

/**
 * @swagger
 * /api/commande:
 *   post:
 *     summary: Passer une commande via QR Code
 *     tags: [Commande]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - customer_phone
 *               - items
 *               - payment_method
 *               - tableId
 *               - restaurentId
 *             properties:
 *               customer_name:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CommandeItem'
 *               payment_method:
 *                 type: string
 *                 enum: [espece, virement]
 *               tableId:
 *                 type: string
 *               restaurentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commande passée avec succès
 *       500:
 *         description: Erreur serveur
 */