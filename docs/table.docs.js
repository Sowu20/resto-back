/**
 * @swagger
 * tags:
 *   name: Table
 */

/**
 * @swagger
 * /table:
 *   post:
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *                $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: Table créée avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /table:
 *   get:
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 */

/**
 * @swagger
 * /table/{id}:
 *   get:
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la table
 *     responses:
 *       200:
 *         description: Table trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       404:
 *         description: Table non trouvée
 */

/**
 * @swagger
 * /table/scan/{qrCode}:
 *    get:
 *      tags: [Table]
 *      parameters:
 *          - in: path
 *            name: qrCode
 *            required: true
 *            schema:
 *              type: string
 *            description: QR Code de la table
 *      responses:
 *        200:
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Table'
 *        404:
 *          description: QR Code invalide
 */

/**
 * @swagger
 * /Table/{id}:
 *   put:
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Table'
 *     responses:
 *       200:
 *         description: Table modifiée avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Table non trouvée
 */

/**
 * @swagger
 * /table/{id}:
 *   delete:
 *     tags: [Table]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la table
 *     responses:
 *       200:
 *         description: Table supprimée avec succès
 *       404:
 *         description: Table non trouvée
 */