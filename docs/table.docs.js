/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Gestion des tables
 */

/**
 * @swagger
 * /api/table:
 *   post:
 *     summary: Créer une table
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_table
 *               - restaurent
 *             properties:
 *               numero_table:
 *                 type: number
 *               restaurent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Table créée avec succès
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /api/table:
 *   get:
 *     summary: Lister toutes les tables
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 */

/**
 * @swagger
 * /api/table/{id}:
 *   get:
 *     summary: Détail d'une table
 *     tags: [Table]
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
 *         description: Table trouvée
 *       404:
 *         description: Table introuvable
 */

/**
 * @swagger
 * /api/table/{id}:
 *   put:
 *     summary: Modifier une table
 *     tags: [Table]
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
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: Table modifiée avec succès
 *       404:
 *         description: Table introuvable
 */

/**
 * @swagger
 * /api/table/{id}:
 *   delete:
 *     summary: Supprimer une table
 *     tags: [Table]
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
 *         description: Table supprimée
 */

/**
 * @swagger
 * /api/table/scan/{qrCode}:
 *   get:
 *     summary: Scanner le QR Code d'une table
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: qrCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de la table
 *       404:
 *         description: QR Code invalide
 */

/**
 * @swagger
 * /api/table/menu/{qrCode}/restaurent/{restaurentId}:
 *   get:
 *     summary: Récupérer les menus et repas d'une table via QR Code
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: qrCode
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: restaurentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menus et repas disponibles
 *       403:
 *         description: Table ne correspond pas au restaurent
 *       404:
 *         description: QR Code invalide
 */