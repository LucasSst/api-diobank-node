import { UserService, User } from "./UserService"

describe('UserService', () => {
    const mockDb:User[] = []
    const userService = new UserService(mockDb);
    const mockConsole = jest.spyOn(global.console, 'log')

    it('Deve adicionar um novo usuário', ()=> {
        
        userService.createUser('Higo', 'Higo@test.com');
        expect (mockConsole).toHaveBeenCalledWith('Db atualizado', mockDb)
        
    })

    it ( 'Deve deletar um usuário', () => {
        userService.deleteUser() 
        expect (mockConsole).toHaveBeenCalledWith('Db deletou o usuário', mockDb)
    })
})