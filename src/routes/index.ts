import { Express, Router } from "express";
import { appConfig } from "../config";
import OneController from "../controller/OneController";
import TwoController from "../controller/TwoController";

// export const combineRouters = (app: Express) => {
//     const apiRouter = Router();
//     attachControllers(apiRouter, [OneController], {
//       middleware: {
        
//       },
//     });
//     app.use(`/api`, apiRouter);
//   };
  

export const combineRouter = [
    OneController, TwoController
];