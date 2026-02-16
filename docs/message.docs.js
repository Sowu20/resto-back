/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Gestion des messages et notifications
 */

/**
 * @swagger
 * /api/message:
 *   post:
 *     tags: [Message]
 *     summary: Envoyer un message
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver:
 *                 type: string
 *                 example: "64d3f2b5a12d3b0012345678"
 *               title:
 *                 type: string
 *                 example: "Nouvelle notification"
 *               content:
 *                 type: string
 *                 example: "Votre commande a été livrée"
 *
 *     responses:
 *       201:
 *         description: Message envoyé avec succès
 */

/**
 * @swagger
 * /api/message:
 *   get:
 *     tags: [Message]
 *     summary: Lister tous les messages
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Liste des messages
 */

/**
 * @swagger
 * /api/message/{id}:
 *   get:
 *     tags: [Message]
 *     summary: Détail d'un message
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Message trouvé
 */

/**
 * @swagger
 * /api/message/{id}:
 *   delete:
 *     tags: [Message]
 *     summary: Supprimer un message
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Message supprimé avec succès
 */

/**
 * @swagger
 * /api/message/{id}/read:
 *   put:
 *     tags: [Message]
 *     summary: Marquer un message comme lu
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Message marqué comme lu
 */