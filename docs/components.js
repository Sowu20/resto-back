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
 *         name:
 *           type: string
 *         adress:
 *           type: string
 *         phone:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *     Restaurent:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         adresse:
 *           type: string
 *         telephone:
 *           type: number
 *         email:
 *           type: string
 *         disponibilite:
 *           type: string
 *           enum: [ouvert, ferme]
 *         user:
 *           type: string
 *           description: ID de l'utilisateur
 *
 *     Menu:
 *       type: object
 *       properties:
 *         nom:
 *           type: string
 *         categorie:
 *           type: string
 *           enum: [ENTREE, PLAT, DESSERT]
 *         description:
 *           type: string
 *         restaurent:
 *           type: string
 *           description: ID du restaurent
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
 *           enum: [disponible, non_disponible]
 *         menu:
 *           type: string
 *           description: ID du menu
 *         restaurent:
 *           type: string
 *           description: ID du restaurent
 *
 *     Commande:
 *       type: object
 *       properties:
 *         quantite:
 *           type: number
 *         statut:
 *           type: string
 *           enum: [en_attente, en_cours, termine]
 *         total_commande:
 *           type: number
 *         user:
 *           type: string
 *           description: ID de l'utilisateur
 *         restaurent:
 *           type: string
 *           description: ID du restaurent
 *         repas:
 *           type: string
 *           description: ID du repas
 */