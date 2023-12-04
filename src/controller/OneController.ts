import { NextFunction, Request, Response } from "express";
import { Controller, GET } from "../helpers/decorators";
import One from "../core/one";

const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.hasOwnProperty('page')) next();
    else return res.send('No Query FOund')
};

@Controller("/one", [exampleMiddleware])
class OneController {
    private core: One;
    constructor() {
        this.core = this.instance();
    }

    @GET("/")
    public register(req: Request, res: Response) {
        return this.core.getOne(req);
    }

    private instance() {
        if (!this.core) this.core = new One();
        return this.core;
    }
}

export default OneController;
