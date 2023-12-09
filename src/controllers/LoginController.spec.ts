import {LoginController} from "./LoginController"
import { Request} from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"



const mockUserService = {
    getAuthenticatedUser: jest.fn(),
    getToken: jest.fn()
} 

jest.mock('../services/UserService', () => {
    return{ UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('LoginController', () => {

    const mockResponse = makeMockResponse()
    
    const mockRequest = {
        body: {
            name:'Lucas',
            email:'Lucas@test.com',
            password: 'password'
        }
    } as Request


    it ('Deve logar na contar ou apresentar erro.', async() => {
        expect.assertions(2);
        
        const loginController = new LoginController();
        
        loginController.login(mockRequest, mockResponse)
        
        try {
            jest.spyOn(mockUserService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(token)) 
            const token = await loginController.userService.getToken('Lucas@test.com', 'password')
            expect(mockResponse.state.json).toMatchObject({token})
            //expect(token).toBeUndefined()
            expect(mockResponse.state.status).toBe(200)

        } catch (error) {
            expect(mockResponse.state.status).toBe(500)
            expect(mockResponse.state.json).toMatchObject({ message: 'Email/password invalid!'})

        }
        
    })

})