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
 *
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: number
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [restaurant, Admin]
 *         password:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     Restaurent:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - email
 *         - password
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: number
 *         email:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Ouvert, Fermé]
 *         image:
 *           type: string
 *         password:
 *           type: string
 *         user:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *             coordonnes:
 *               type: array
 *               items:
 *                 type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
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
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         isDefault:
 *           type: boolean
 *         image:
 *           type: string
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         validDays:
 *           type: string
 *           enum:
 *             - lundi
 *             - mardi
 *             - mercredi
 *             - jeudi
 *             - vendredi
 *             - samedi
 *             - dimanche
 *         restaurent:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     Categorie:
 *       type: object
 *       required:
 *         - name
 *         - restaurent
 *         - menu
 *         - commande
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         isActive:
 *           type: boolean
 *         restaurent:
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
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         isAvaible:
 *           type: boolean
 *         image:
 *           type: string
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
 *         - qrCode
 *         - restaurent
 *       properties:
 *         _id:
 *           type: string
 *         numero_table:
 *           type: number
 *         qrCode:
 *           type: string
 *         statut:
 *           type: string
 *           enum: [libre, occupe]
 *         restaurent:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     CommandeItem:
 *       type: object
 *       required:
 *         - repas
 *         - nom_repas
 *         - prix_unitaire
 *         - quantite
 *         - total
 *       properties:
 *         repas:
 *           type: string
 *         nom_repas:
 *           type: string
 *         prix_unitaire:
 *           type: number
 *         quantite:
 *           type: number
 *         total:
 *           type: number
 *
 *     Commande:
 *       type: object
 *       required:
 *         - items
 *         - restaurent
 *         - table
 *       properties:
 *         _id:
 *           type: string
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
 *           enum:
 *             - en_attente
 *             - livres
 *             - annules
 *         payment_status:
 *           type: string
 *           enum:
 *             - en_attente
 *             - en_traitement
 *             - paye
 *             - non_paye
 *         payment_method:
 *           type: string
 *           enum:
 *             - espece
 *             - virement
 *         source:
 *           type: string
 *         total_amount:
 *           type: number
 *         restaurent:
 *           type: string
 *         table:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         sender:
 *           type: string
 *         receiver:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         isRead:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     Notification:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         _id:
 *           type: string
 *         titre:
 *           type: string
 *         contenu:
 *           type: string
 *         lue:
 *           type: boolean
 *         user:
 *           type: string
 *
 *     Promotion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titre_promo:
 *           type: string
 *         description:
 *           type: string
 *         date_debut:
 *           type: string
 *           format: date-time
 *         date_fin:
 *           type: string
 *           format: date-time
 *         pourcentage_reduction:
 *           type: number
 *         restaurent:
 *           type: string
 *
 *     OffreSpeciale:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titre_offre:
 *           type: string
 *         description:
 *           type: string
 *         restaurent:
 *           type: string
 *         repas:
 *           type: string
 *
 *     Payement:
 *       type: object
 *       required:
 *         - commande
 *       properties:
 *         _id:
 *           type: string
 *         methode:
 *           type: string
 *         statut:
 *           type: string
 *           enum:
 *             - en_cours
 *             - en_attente
 *             - termine
 *         montant:
 *           type: number
 *         commande:
 *           type: string
 *
 *     Annonce:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         titre:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */