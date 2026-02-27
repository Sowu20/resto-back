/**
 * @swagger
 * tags:
 *   name: Restaurent
 *   description: Gestion des restaurents
 */


/**
 * @swagger
 * /api/restaurent:
 *   post:
 *     tags: [Restaurent]
 *     summary: Créer un restaurent
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
 *         description: Restaurent créé avec succès
 *       400:
 *         description: Erreur
 *       403:
 *         description: Accès interdit
 */


/**
 * @swagger
 * /api/restaurent:
 *   get:
 *     tags: [Restaurent]
 *     summary: Liste des restaurents
 *     responses:
 *       200:
 *         description: Liste des restaurents
 */


/**
 * @swagger
 * /api/restaurent/{id}:
 *   get:
 *     tags: [Restaurent]
 *     summary: Détail d’un restaurent
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
 *         description: Restaurent trouvé
 *       404:
 *         description: Restaurent introuvable
 */


/**
 * @swagger
 * /api/restaurent/{id}:
 *   put:
 *     tags: [Restaurent]
 *     summary: Modifier un restaurent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Restaurent modifié
 */


/**
 * @swagger
 * /api/restaurent/{id}:
 *   delete:
 *     tags: [Restaurent]
 *     summary: Supprimer un restaurent
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
 *         description: Restaurent supprimé
 */


/**
 * @swagger
 * /api/restaurent/localisation:
 *   get:
 *     tags: [Restaurent]
 *     summary: Trouver les restaurents proches
 *     parameters:
 *       - name: latitude
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: longitude
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: distance
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Restaurents proches trouvés
 */


/**
 * @swagger
 * /api/restaurent/stats:
 *   get:
 *     tags: [Restaurent]
 *     summary: Statistiques des restaurents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques
 */


/**
 * @swagger
 * /api/restaurent/search:
 *   get:
 *     tags: [Restaurent]
 *     summary: Rechercher un restaurent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurent
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Résultat de recherche
 */


/**
 * @swagger
 * /api/restaurent/status_restaurent:
 *   get:
 *     tags: [Restaurent]
 *     summary: Restaurents par status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           example: ouvert
 *     responses:
 *       200:
 *         description: Restaurents filtrés
 */


/**
 * @swagger
 * /api/restaurent/liste:
 *   get:
 *     tags: [Restaurent]
 *     summary: Liste restaurents avec utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste restaurents
 */