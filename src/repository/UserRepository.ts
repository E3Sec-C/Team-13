import UserModel from "../models/UserModel";
import { user } from "../types/user";
import CrudRepository from "./CrudRepository";
import bcrypt from "bcryptjs";

class UserRepository extends CrudRepository<user> {

  constructor() {
    super(UserModel);
  }

  async signin({userId, password, role}:user) {

    try {

        // Fetch user from the database by userId
        const user = await UserModel.findOne({userId:userId});

        if (!user) {
            throw new Error('User not found');
        }

        // Check if the provided role matches the user's role
        if (user.role !== role) {
            throw new Error('Incorrect role');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        return {
            success:true,
            message:"signin successfull",
            userId:user.userId,
            role:user.role,
        };

    } catch (error) {
      throw new Error("Failed to signin");
    }
  }

  async signup({userId, password, role}:user){

    try{
        const userAlready =await UserModel.findOne({userId:userId});
        if(userAlready){
            throw new Error("User already existed");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const data={
            userId:userId,
            password:hashedPassword,
            role:role
        }
        const response = await UserModel.create(data);
        return response;
    }catch(error){
        throw new Error("Failed to signup");
    }
  }

  async updatepassword({userId, password, role}:user){

    try{
        const userAlready = await UserModel.findOne({userId:userId});
        if(!userAlready){
            throw new Error("No user found");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedData={
            userId:userId,
            password:hashedPassword,
            role:role,
        }

        const response = await UserModel.findOneAndUpdate({userId:userId},updatedData);
        return response;
    }catch(error){
        throw new Error("Failed to update Password");
    }
  }

  async removeUser(userId:string){
    try{
        const userAlready = await UserModel.findOne({userId:userId});
        if(!userAlready){
            throw new Error("No User existed");
        }
        const response = await UserModel.deleteOne({userId:userId});
        return response;
    }catch(error){
        throw new Error("Failed to remove user");
    }
  }
}

export default new UserRepository();
