import mongoose from 'mongoose';
import userType from '../../schemas/userType';

const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: {
        type: String,
        unique: true
    },
    picture: String,
    password: String, 
    removed: Boolean
});

const userModel = mongoose.model<userType & mongoose.Document>('User', userSchema);
export default userModel;