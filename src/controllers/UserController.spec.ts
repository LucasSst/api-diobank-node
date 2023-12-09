import { UserController } from "./UserController"

import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
} 

jest.mock('../services/UserService', () => {
    return{ UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})
describe('UserController', ()=>{
    

    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it ('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name:'Lucas',
                email:'Lucas@test.com',
                password: 'password'
            }
        } as Request
              
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "Usuário criado"})
    })



    it ('Deve informar erro caso o nome seja indefinido', ()=>{
        const mockRequest = {
            body: {
                name: '',
                email: 'Lucas@test.com',
                password: 'password'
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Todos os campos são obrigatórios'})
        
    
    })

    it ('Deve informar erro caso o usuário não informe o password', ()=>{
        const mockRequest = {
            body: {
                name: 'Lucas',
                email: 'Lucas@test.com',
                password: ''
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)        
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Todos os campos são obrigatórios'})
        
    })

    it ('Deve informar erro caso o email seja indefinido', ()=>{
        const mockRequest = {
            body: {
                name: 'Lucas',
                email: '',
                password: 'password'
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)        
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Todos os campos são obrigatórios'})
        
    })


 
    
 

    it ('Deve retornar a mensagem de usuário deletado', () => {
        const mockRequest = {
            body: {
                name: 'Lucas',
                email: 'email@dio.bank',
                password: 'password'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse) 
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({message: 'Usuário Deletado'})
    })


    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params:{
                userId: '123456',
            }
        }) 
        
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })
    

   
})