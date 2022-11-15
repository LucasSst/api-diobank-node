export interface User {
    name:string,
    email:string
}

const db = [
    {
        name: 'Joaquim',
        email: "joaquim@dio.com",
    }
]



export class UserService {
    db:User []

    constructor (database = db) {
        this.db = database
    }
    
    createUser = (name:string, email:string) => {
        const user = {
            name,
            email,
        }
        
        this.db.push(user)
        console.log (`Db atualizado`, this.db)
    }

    getAllUsers = () =>{
        return this.db
    }

    deleteUser (){
        this.db.pop()
        console.log('Db deletou o usuário', this.db)
    }
}