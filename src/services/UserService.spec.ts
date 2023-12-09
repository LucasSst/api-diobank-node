import { UserService} from "./UserService"
import * as jwt from 'jsonwebtoken';

jest.mock('../repositores/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')


const mockUserRepository = require('../repositores/UserRepository')

describe('UserService', () => {
    
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        id_user:'123456',
        name:'Lucas',
        email: 'Lucas@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async()=> {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Lucas', 'Lucas@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user:'123456',
            name:'Lucas',
            email: 'Lucas@test.com',
            password: '123456'
        })
        
    })

    it('Devo retornar um token de usuário', async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))  
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('Lucas@test.com', '123456')
        expect(token).toBe('token')
    })

    it ('Deve retornar um ID de um usuário', async () => {
        mockUserRepository.getUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.getUser('123456')
        expect(mockUserRepository.getUser).toHaveBeenCalled()
        expect(response).toMatchObject({id_user:'123456'})
    })


    it('Deve retonar um erro, caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error ('Email/password invalid!'))
    })

})