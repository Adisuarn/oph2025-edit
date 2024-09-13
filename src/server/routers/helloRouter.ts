import Elysia, {t} from 'elysia'
import { HelloHandler } from '../controllers/helloHandler'

const helloRouter = new Elysia({ prefix: '/hello'})
    .get('/', () => HelloHandler())

export default helloRouter
