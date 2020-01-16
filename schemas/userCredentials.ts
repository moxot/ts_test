import { String, Record, Static, Array } from 'runtypes';

const UserCredentials = Record({
    email: String,
    password: String
});
type UserCredentials = Static<typeof UserCredentials>;

export default UserCredentials;