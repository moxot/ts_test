import { Users } from '../services';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../utils';

export const generateUser = async function(req: Request, res: Response, next: NextFunction) {
    try{
        res.send(await Users.generateUser());
    }catch(err){
        console.error(err.stack || err);
        next(new HTTPError(500, 'Internal server error'));
    }
};

export const getUsers = async function(req: Request, res: Response, next: NextFunction) {
    try{
        res.send(await Users.getUsers());
    }catch(err){
        console.error(err.stack || err);
        next(new HTTPError(500, 'Internal server error'));
    }
};

export const updateUser = async function(req: Request, res: Response, next: NextFunction) {
    try{
        let body = req.body;
        body.removed = false;
        let result = await Users.updateUser(req.params.userId, req.body);
        res.send({success: result.nModified > 0});
    }catch(err){
        console.error(err.stack || err);
        next(new HTTPError(500, 'Internal server error'));
    }
};

export const deleteUser = async function(req: Request, res: Response, next: NextFunction) {
    try{
        let result = await Users.deleteUser(req.params.userId);
        let success = !!result.deletedCount && result.deletedCount > 0;
        res.send({success});
    }catch(err){
        console.error(err.stack || err);
        next(new HTTPError(500, 'Internal server error'));
    }
};

export const loginUser = async function(req: Request, res: Response, next: NextFunction) {
    try{
        let result = {success: !!await Users.loginUser(req.body)};
        res.send(result);
    }catch(err){
        console.error(err.stack || err);
        next(new HTTPError(500, 'Internal server error'));
    }
};