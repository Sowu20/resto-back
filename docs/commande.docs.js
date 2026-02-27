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
 *     tags: [Commande]
 *     summary: Créer une commande (utilisateur connecté)
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
 *         description: Commande créée
 *       400:
 *         description: Erreur
 */


/**
 * @swagger
 * /api/commande:
 *   get:
 *     tags: [Commande]
 *     summary: Liste des commandes
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
 *     tags: [Commande]
 *     summary: Détail d’une commande
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
 *         description: Commande trouvée
 *       404:
 *         description: Non trouvée
 */


/**
 * @swagger
 * /api/commande/{id}:
 *   put:
 *     tags: [Commande]
 *     summary: Modifier une commande
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       202:
 *         description: Modifiée
 */


/**
 * @swagger
 * /api/commande/{id}:
 *   delete:
 *     tags: [Commande]
 *     summary: Supprimer une commande
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: Supprimée
 */



/**
 * @swagger
 * /api/commande/{restaurentId}/stats:
 *   get:
 *     tags: [Commande]
 *     summary: Statistiques générales du restaurent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurentId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Statistiques
 */


/**
 * @swagger
 * /api/commande/{restaurentId}/revenus:
 *   get:
 *     tags: [Commande]
 *     summary: Revenus par jour
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurentId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Revenus
 */


/**
 * @swagger
 * /api/commande/{restaurentId}/status:
 *   get:
 *     tags: [Commande]
 *     summary: Nombre de commandes par status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurentId
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: Stats status
 */


/**
 * @swagger
 * /api/commande/{restaurentId}/meilleurs_ventes:
 *   get:
 *     tags: [Commande]
 *     summary: Top 5 repas vendus
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurentId
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: Top ventes
 */


/**
 * @swagger
 * /api/commande/{restaurentId}/commandes_recente:
 *   get:
 *     tags: [Commande]
 *     summary: 5 dernières commandes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: restaurentId
 *         required: true
 *         in: path
 *     responses:
 *       200:
 *         description: Commandes récentes
 */



/**
 * @swagger
 * tags:
 *   name: Admin Commande
 *   description: Dashboard administrateur commandes
 */


/**
 * @swagger
 * /api/commande/admin/status:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Statistiques rapides
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats
 */


/**
 * @swagger
 * /api/commande/admin/statorder:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Statistiques commandes complètes
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/commande/admin/listcommande:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Liste commandes avec filtres
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/commande/admin/revenuchart:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Graphique revenus
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/commande/admin/recent_order:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Commandes récentes admin
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /api/commande/admin/top_sell:
 *   get:
 *     tags: [Admin Commande]
 *     summary: Repas les plus vendus
 *     security:
 *       - bearerAuth: []
 */