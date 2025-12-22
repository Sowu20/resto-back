/**
 * @swagger
 * tags:
 *   name: Authentification
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nom, prenom, adresse, telephone, username, email]
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               telephone:
 *                 type: number
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *       400:
 *         description: Email ou mot de passe incorrect
 */

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   telephone:
 *                     type: number
 *                   role:
 *                     type: string
 *                     enum: [ADMIN, RESTAURATEUR, CLIENT]
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 adresse:
 *                   type: string
 *                 telephone:
 *                   type: number
 *                 role:
 *                   type: string
 *                   enum: [ADMIN, RESTAURATEUR, CLIENT]
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               telephone:
 *                 type: number
 *               role:
 *                 type: string
 *                 enum: [ADMIN, RESTAURATEUR, CLIENT]
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Utilisateur non trouvé
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */