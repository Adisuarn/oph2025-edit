import Elysia from 'elysia'
import { authURLHandler,
         authCallbackHandler,
         getUser,
 } from '../controllers/autorizationHandler'

const authorizeRoutes = new Elysia({ prefix: '/auth'})
    .get('/google', async () => authURLHandler())
    .get('/google/callback', async ({request, redirect}) => {
        await authCallbackHandler(request)
        return redirect('http://localhost:3000/dashboard')
    })
    .get('/getuser', async () => getUser())


export default authorizeRoutes
