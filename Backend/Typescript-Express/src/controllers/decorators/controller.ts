import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys, Methods } from './enums';
import { NextFunction, Request, RequestHandler, Response } from 'express';

function bodyValidators(keys: string): RequestHandler{
    return function(req: Request, res: Response, next: NextFunction){
        if(!req.body){
            res.status(422).send("Invalid request");
            return;
        }

        for (const key of keys) {
            if(!req.body[key]){
                res.status(422).send(`Missing property ${key}`);
                return
            }
        }
        next();
    }

}

function controller(routePrefix: string){
    return function(target: Function){
        const router = AppRouter.getInstance();
        const res = Object.getOwnPropertyNames(target.prototype);  //This works for "target": "es2016" in tsconfig.json
        res.forEach(function(key){
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requiredBodyProps);
            if(path) router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
        });
    }
}

export {controller};