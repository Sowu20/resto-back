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
 *     CategorieRepas:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         restaurent:
 *           type: string
 *           description: ID de Restaurent
 *         menu:
 *           type: string
 *           description: ID de Menu
 *         commande:
 *           type: string
 *           description: ID de commande
 *
 *     Repas:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         descrition:
 *           type: string
 *         price:
 *           type: number
 *         isAvaible:
 *           type: boolean
 *         menu:
 *           type: string
 *           description: ID du menu
 *         restaurent:
 *           type: string
 *           description: ID du restaurent
 *         categorie:
 *           type: string
 *           description: ID de catégorie
 *
 *     Commande:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         order_number:
 *           type: string
 *         customer_name:
 *           type: string
 *         customer_phone:
 *           type: string
 *         status:
 *           type: string
 *           enum: [en_attente, en_cours, termine]
 *         payment_staus:
 *           type: string
 *           enum: [en_attente, en_traitement, paye, non_paye]
 *         payment_method:
 *           type: string
 *           enum: [espece, virement]
 *         source:
 *           type: string
 *         total_amount:
 *           type: number
 *         restaurent:
 *           type: string
 *           description: ID du restaurant
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Table:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         qrCode:
 *           type: string
 *         statut:
 *           type: string
 *           enum: [libre, occupe]
 *         restaurent:
 *           type: string
 *           description: ID du restaurent
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */