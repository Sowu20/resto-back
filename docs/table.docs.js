/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Gestion des tables et QR Codes
 */

/**
 * @swagger
 * /api/table:
 *   post:
 *     tags: [Table]
 *     summary: Créer une table
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
 *       403:
 *         description: Accès réservé aux restaurateurs
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/table:
 *   get:
 *     tags: [Table]
 *     summary: Lister les tables du restaurateur
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
 *       403:
 *         description: Accès interdit
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/table/{id}:
 *   get:
 *     tags: [Table]
 *     summary: Détails d’une table
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       404:
 *         description: Table introuvable
 *       400:
 *         description: ID invalide
 */

/**
 * @swagger
 * /api/table/{id}:
 *   put:
 *     tags: [Table]
 *     summary: Modifier une table
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
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Table introuvable
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/table/{id}:
 *   delete:
 *     tags: [Table]
 *     summary: Supprimer une table
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
 *         description: Table supprimée avec succès
 *       403:
 *         description: Accès interdit
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/table/scan/{qrCode}:
 *   get:
 *     tags: [Table]
 *     summary: Scanner le QR Code d’une table
 *     parameters:
 *       - in: path
 *         name: qrCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de la table
 *       403:
 *         description: Table occupée
 *       404:
 *         description: QR Code invalide
 */

/**
 * @swagger
 * /api/table/menu/{qrCode}:
 *   get:
 *     tags: [Table]
 *     summary: Récupérer les menus et repas via QR Code
 *     parameters:
 *       - in: path
 *         name: qrCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menus et repas disponibles
 *       404:
 *         description: QR Code invalide
 */