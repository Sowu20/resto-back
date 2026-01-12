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
 *       required:
 *         - name
 *         - adress
 *         - phone
 *         - email
 *         - password
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
 *       required:
 *         - nom
 *         - adresse
 *         - telephone
 *       properties:
 *         nom:
 *           type: string
 *         adresse:
 *           type: string
 *         telephone:
 *           type: string
 *         email:
 *           type: string
 *
 *     Menu:
 *       type: object
 *       required:
 *         - name
 *         - startTime
 *         - endTime
 *         - validDays
 *         - restaurent
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         isDefault:
 *           type: boolean
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         validDays:
 *           type: string
 *           enum: [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche]
 *         restaurent:
 *           type: string
 *
 *     Categorie:
 *       type: object
 *       required:
 *         - name
 *         - resturent
 *         - menu
 *         - commande
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         resturent:
 *           type: string
 *         menu:
 *           type: string
 *         commande:
 *           type: string
 *
 *     Repas:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - isAvaible
 *         - menu
 *         - restaurent
 *         - categorie
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         isAvaible:
 *           type: boolean
 *         menu:
 *           type: string
 *         restaurent:
 *           type: string
 *         categorie:
 *           type: string
 *
 *     Table:
 *       type: object
 *       required:
 *         - numero_table
 *         - restaurent
 *       properties:
 *         numero_table:
 *           type: number
 *         qrCode:
 *           type: string
 *         statut:
 *           type: string
 *           enum: [libre, occupe]
 *         restaurent:
 *           type: string
 *
 *     CommandeItem:
 *       type: object
 *       required:
 *         - repas
 *         - quantite
 *       properties:
 *         repas:
 *           type: string
 *         quantite:
 *           type: number
 *
 *     Commande:
 *       type: object
 *       required:
 *         - items
 *         - restaurent
 *         - table
 *       properties:
 *         order_number:
 *           type: string
 *         customer_name:
 *           type: string
 *         customer_phone:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CommandeItem'
 *         status:
 *           type: string
 *           enum: [en_attente, en_cours, termine]
 *         payment_status:
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
 *         table:
 *           type: string
*/