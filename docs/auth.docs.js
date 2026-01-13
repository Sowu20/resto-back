/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l’authentification des utilisateurs
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     tags: [Authentification]
 *     summary: Création d’un compte utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé ou erreur de validation
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authentification]
 *     summary: Connexion utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie (JWT retourné)
 *       400:
 *         description: Mot de passe incorrect
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     summary: Liste de tous les utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Accès refusé
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Détails d’un utilisateur
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
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur introuvable
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags: [User]
 *     summary: Modifier un utilisateur
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur introuvable
 *       401:
 *         description: Non authentifié
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Supprimer un utilisateur
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
 *         description: Utilisateur supprimé avec succès
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Utilisateur introuvable
 *       401:
 *         description: Non authentifié
 */