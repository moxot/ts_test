import { String, Record, Static, Array } from 'runtypes';
const Name = Record({
    title: String,
    first: String,
    last: String
});
type Name = Static<typeof Name>;

const Picture = Record({
    medium: String
});
type Picture = Static<typeof Picture>;

const Login = Record({
    password: String
});
type Login = Static<typeof Login>;

const GeneratedUser = Record({
    name: Name,
    gender: String,
    email: String,
    picture: Picture,
    login: Login
});
type GeneratedUser = Static<typeof GeneratedUser>;

const GeneratedUsers = Record({
    results: Array(GeneratedUser)
});
type GeneratedUsers = Static<typeof GeneratedUsers>;

export {GeneratedUser, GeneratedUsers};