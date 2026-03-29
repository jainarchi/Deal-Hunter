import {Router} from 'express'
import authControllers from '../controllers/auth.controllers.js'
import { authUser } from '../middleware/authMiddleware.js'


const router = Router()

/** 
@route POST /api/auth/register
@desc Register user
@access Public
*/
router.post('/register' , authControllers.register )



/** 
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
*/

router.post('/login' , authControllers.login )



/**
 * @route GET /api/auth/get-me
 * @desc Get current user
 * @access Private
 */

router.get('/get-me' , authUser , authControllers.getMe)






export default router