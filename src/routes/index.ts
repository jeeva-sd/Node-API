import { Express, Router } from "express";
import { appConfig } from "../config";
import OneController from "../controller/OneController";

// export const combineRouters = (app: Express) => {
//     const apiRouter = Router();
//     attachControllers(apiRouter, [OneController], {
//       middleware: {
        
//       },
//     });
//     app.use(`/api`, apiRouter);
//   };
  

export const combineRouter = [
    OneController,
];