/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Gestion des tables et QR Code
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
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: Table créée
 */


/**
 * @swagger
 * /api/table:
 *   get:
 *     tags: [Table]
 *     summary: Liste des tables
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tables
 */


/**
 * @swagger
 * /api/table/{id}:
 *   get:
 *     tags: [Table]
 *     summary: Détail d'une table
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
 *         description: Table trouvée
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
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Table modifiée
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
 *       - name: id
 *         required: true
 *         in: path
 *     responses:
 *       201:
 *         description: Table supprimée
 */


/**
 * @swagger
 * /api/table/scan/{qrCode}:
 *   get:
 *     tags: [Table]
 *     summary: Scanner QR Code
 *     parameters:
 *       - name: qrCode
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table trouvée via QR Code
 */


/**
 * @swagger
 * /api/table/menu/{qrCode}:
 *   get:
 *     tags: [Table]
 *     summary: Obtenir menus et repas via QR Code
 *     parameters:
 *       - name: qrCode
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Menus et repas
 */