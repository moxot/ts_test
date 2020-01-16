import mongoose from 'mongoose';

import * as userStorage from './user';
export { userStorage };

export const init = async function(mongourl: string){
    await mongoose.connect(mongourl, { useNewUrlParser: true });
    mongoose.connection.on('error', err => {
        console.error(err.stack || err);
        process.exit(1);
    });
};