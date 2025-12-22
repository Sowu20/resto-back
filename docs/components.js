/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         prenom:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, RESTAURATEUR, CLIENT]
 *         adresse:
 *            type: string
 *         telephone:
 *            type: number
 *         username:
 *            type: string
 *         email:
 *            type: string
 *         password:
 *            type: string 
 *
 *     Restaurant:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         adresse:
 *           type: string
 *         telephone:
 *            type: number
 *         email:
 *            type: string
 *         disponibilite:
 *             type: string
 *             enum: [OUVERT, FERME]
 *         user:
 *             type: string
 *             description: Id de l'utilisateur
 *
 *     Menu: 
 *       type: object
 *       properties:
 *         non:
 *           type: string
 *         categorie:
 *           type: string
 *           enum: [ENTREE, PLAT, DESSERT]
 *         description:
 *           type: string
 *        restaurent:
 *           type: string
 *           descrption: ID du restaurent
 * 
 *     Repas: 
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         prix:
 *           type: number
 *         disponibilite:
 *           type: string
 *           enum: [DISPONIBLE, NON DISPONIBLE]
 *         total_commande:
 *           type: number
 *         menu:
 *           type: string
 *           description: ID du menu
 *         restaurent:
 *           type: string
 *           descrption: ID du restaurent
 * 
 *     Commande: 
 *       type: object
 *       properties:
 *         quantite:
 *           type: number
 *         statut:
 *           type: string
 *           enum: [EN_ATTENTE, EN_COURS, TERMINE]
 *         total_commande:
 *           type: number
 *         user:
 *           type: string
 *           description: ID de l'utilisateur
 *         restaurent:
 *           type: string
 *           descrption: ID du restaurent
 *         repas:
 *           type: string
 *           description: ID du repas
 */