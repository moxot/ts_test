import userModel from './models/user';
import userType from '../schemas/userType';
import UserCredentials from '../schemas/userCredentials';

export const addUser = async function(data: userType){
    try{
        let createdUser = new userModel(data);
        return await createdUser.save();
    }catch(err){
        throw err;
    }
};
export const getUsers = async function(){
    try{
        return await userModel.find({removed: false});
    }catch(err){
        throw err;
    }
};
export const updateUser = async function(userId: string, data: userType){
    try{
        return await userModel.replaceOne({_id: userId}, data);
    }catch(err){
        throw err;
    }
};

export const deleteUser = async function(userId: string){
    try{
        return await userModel.deleteOne({_id: userId});
    }catch(err){
        throw err;
    }
};

export const loginUser = async function(creds: UserCredentials){
    try{
        return await userModel.findOne({email: creds.email});
    }catch(err){
        throw err;
    }
};