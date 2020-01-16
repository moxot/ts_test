import { asyncHttpRequest } from '../utils';
import userType from '../schemas/userType';
import UserCredentials from '../schemas/userCredentials';
import { GeneratedUser, GeneratedUsers } from '../schemas/generatedUser';
import bcrypt from 'bcrypt';
import { userStorage } from '../storage';
import https from 'https';
import config from '../config';

const saltRounds = config.saltRounds;

export class User {
    public name: string;
    public gender: string;
    public email: string;
    public picture: string;
    public password: string;
    public removed: boolean;

    constructor(user: userType){
        this.name = user.name;
        this.gender = user.gender;
        this.email = user.email;
        this.picture = user.picture;
        this.password = user.password;
        this.removed = user.removed;
    }
};

const requestOptions: https.RequestOptions = config.randomUserApi;

export async function generateUser(){
    let parsedUsers: GeneratedUsers = JSON.parse(await asyncHttpRequest(requestOptions));
    let parsedUser: GeneratedUser = parsedUsers.results[0];

    GeneratedUser.check(parsedUser);

    let user = new User({
        name: `${parsedUser.name.title}. ${parsedUser.name.first} ${parsedUser.name.last}`,
        gender: parsedUser.gender,
        email: parsedUser.email,
        picture: parsedUser.picture.medium,
        password: await bcrypt.hash(parsedUser.login.password, saltRounds), 
        removed: false
    });
    
    return await userStorage.addUser(user);
}

export async function getUsers(){
    return await userStorage.getUsers();
};

export async function updateUser(userId: string, data: userType){
    userType.check(data);
    data.password = await bcrypt.hash(data.password, saltRounds);
    return await userStorage.updateUser(userId, data);
};

export async function deleteUser(userId: string){
    return await userStorage.deleteUser(userId);
};

export async function loginUser(creds: UserCredentials){
    UserCredentials.check(creds);
    let user = await userStorage.loginUser(creds);
    if(user){
        return await bcrypt.compare(creds.password, user.password);
    }else{
        return false;
    }
};
