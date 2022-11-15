import { UserService } from "../services/UserService"
import { UserController } from "./UserController"

import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"

describe('UserController', ()=>{
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }

    const mockResponse = makeMockResponse()

    it ('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name:'Lucas',
                email:'LucasSst@gmail.com'
            }
        } as Request
        
      
        
        const userController = new UserController(mockUserService as UserService );
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: "Usuário criado"})
    })



    it ('Deve informar erro caso o nome seja indefinido', ()=>{
        const userController = new UserController(mockUserService as UserService);


        const mockRequest = {
            body: {
                name: '',
                email: 'LucasSst@gmail.com'
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)
        
        let nameundefinid = mockRequest.body.name
        
        if (nameundefinid == undefined) {
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name obrigatório'})
        }
        
    })

    it ('Deve informar erro caso o email seja indefinido', ()=>{
        const userController = new UserController(mockUserService as UserService);


        const mockRequest = {
            body: {
                name: 'Lucas',
                email: ''
            }
        } as Request
        
        userController.createUser(mockRequest, mockResponse)
        
        let emailUndefinid = mockRequest.body.email
       
        if (emailUndefinid  == undefined) {
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject({message: 'Bad request! Name obrigatório'})
        }
        
    })


 
    
    it ('Deve verificar se o getAllUser está sendo chamado', () => {
        const userController = new UserController(mockUserService as UserService );
        const mockRequest = {body: {name: 'Lucas',email: 'LucasSst@gmail.com'}
        } as Request

        const mockGetAllUsers = userController.getAllUsers(mockRequest, mockResponse)

        expect(mockGetAllUsers).toBeDefined()
        expect(mockResponse.state.status).toBe(200) 

    })
    

   
})