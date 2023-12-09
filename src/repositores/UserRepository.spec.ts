import { EntityManager } from "typeorm"
import { User } from "../entities/User"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { UserRepository } from "./UserRepository"

describe('UserRepository', () => {
    let userRepository: UserRepository
    let managerMock: Partial<EntityManager>
    
    const mockUser:User = {
        id_user:'123456',
        name: 'Test name',
        email: 'test@test.com',
        password: 'password'
    }

    beforeAll ( async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        })
        userRepository = new UserRepository(managerMock as EntityManager)
    })

    it (' Deve cadastrar um novo usuário no banco de dados',async () => {
        const response = await userRepository.createUser(mockUser) 
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
    })
})