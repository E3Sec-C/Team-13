import { user } from "../types/user";
import { UserRepository } from "../repository/index"

class UserService{
    async signin(userData: user){
        
        return await UserRepository.signin(userData);
    }

    async signup(userData:user):Promise<user|null>{

        return await UserRepository.signup(userData);
    }

    async updatePassword(userData:user):Promise<user|null>{

        return await UserRepository.updatepassword(userData);
    }

    async removeUser(userId:string){

        return await UserRepository.removeUser(userId);
    }
}

export default new UserService ();