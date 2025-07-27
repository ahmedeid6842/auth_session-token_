import 'express';
import {IUserDocument} from '../models/users';

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
        }
    }
}