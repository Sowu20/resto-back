/**
 * @swagger
 * tags:
 *   - name: Restaurent
 */

/**
 * @swagger
 * /restaurant:
 *   post:
 *     tags: [Restaurent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurent'
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /restaurant:
 *   get:
 *     tags: [Restaurent]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurent'
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   get:
 *     tags: [Restaurent]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurent'
 *       404:
 *         description: Restaurant non trouvé
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   put:
 *     tags: [Restaurent]
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
 *       200:
 *         description: Restaurant modifié avec succès
 *       404:
 *         description: Restaurant non trouvé
 */

/**
 * @swagger
 * /restaurant/{id}:
 *   delete:
 *     tags: [Restaurent]
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
 *       404:
 *         description: Restaurant non trouvé
 */