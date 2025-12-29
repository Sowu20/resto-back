/**
 * @swagger
 * tags:
 *   - name: Repas
 */

/**
 * @swagger
 * /repas:
 *   post:
 *     tags: [Repas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Repas'
 *     responses:
 *       201:
 *         description: Repas créé avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /repas:
 *   get:
 *     tags: [Repas]
 *     responses:
 *       200:
 *         description: Liste des repas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Repas'
 */

/**
 * @swagger
 * /repas/{id}:
 *   get:
 *     tags: [Repas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du repas
 *     responses:
 *       200:
 *         description: Repas trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Repas'
 *       404:
 *         description: Repas non trouvé
 */

/**
 * @swagger
 * /repas/{id}:
 *   put:
 *     tags: [Repas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du repas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Repas'
 *     responses:
 *       200:
 *         description: Repas modifié avec succès
 *       404:
 *         description: Repas non trouvé
 */

/**
 * @swagger
 * /repas/{id}:
 *   delete:
 *     tags: [Repas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du repas
 *     responses:
 *       200:
 *         description: Repas supprimé avec succès
 *       404:
 *         description: Repas non trouvé
 */