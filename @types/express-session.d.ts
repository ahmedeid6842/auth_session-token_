import "express-session";
import { IUserDocument } from "../models/users";

declare module "express-session" {
    interface SessionData {
      user?: IUserDocument;
      isLoggedIn?: boolean;
    }
  }