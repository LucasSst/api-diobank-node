import 'reflect-metadata'
import express, {Request, Response} from 'express';
import { router } from './routes';
import { AppDataSource } from './database';

const server = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((erro) => {
        console.error(erro)
    })

server.use(express.json())
server.use(router)

server.get('/', (request: Request, response:Response) =>{
    return response.status(200).json({ massage: 'DioBank API'})
})



server.listen(5000, () => console.log('Server on'))