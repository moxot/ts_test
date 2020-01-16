import { String, Record, Static, Boolean } from 'runtypes';

const User = Record({
    name: String,
    gender: String,
    email: String,
    picture: String,
    password: String, 
    removed: Boolean
});
type User = Static<typeof User>;

export default User;