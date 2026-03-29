import {Router} from 'express'
import authControllers from '../controllers/auth.controllers'
import { authUser } from '../middleware/authMiddleware'


const router = Router()

/** 
@route POST /auth/register
@desc Register user
@access Public
*/
router.post('/register' , authControllers.register )



/** 
 * @route POST /auth/login
 * @desc Login user
 * @access Public
*/

router.post('/login' , authControllers.login )



/**
 * @route GET /auth/get-me
 * @desc Get current user
 * @access Private
 */

router.get('/get-me' , authUser , authControllers.getMe)






export default router