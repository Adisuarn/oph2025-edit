import Elysia from 'elysia'
import { authURLHandler,
         authCallbackHandler
 } from '../controllers/autorizationHandler'

const authorizeRoutes = new Elysia({ prefix: '/auth'})
    .get('/google', async () => authURLHandler())
    .get('/google/callback', async ({request, redirect}) => {
        await authCallbackHandler(request)
        return redirect('http://localhost:3000')
    })


export default authorizeRoutes
