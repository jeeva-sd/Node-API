import { Express, Router } from "express";
import { appConfig } from "../config";
import UserController from "../controller/user";

// export const combineRouters = (app: Express) => {
//     const apiRouter = Router();
//     attachControllers(apiRouter, [OneController], {
//       middleware: {

//       },
//     });
//     app.use(`/api`, apiRouter);
//   };


export const combineRouter = [
    UserController
];