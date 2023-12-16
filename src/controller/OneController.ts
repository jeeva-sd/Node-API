import { Request, Response } from "express";
import { Controller, GET } from "../helpers";
import One from "../core/one";
import { exampleMiddleware } from "../middleware";
import { CUSTOM_RESPONSE } from "../helpers/decorators";

@Controller("/one", [exampleMiddleware])
class OneController {
    private core: One;
    constructor() {
        this.core = this.instance();
    }

    @GET("/")
    @CUSTOM_RESPONSE()
    public register(req: Request, res: Response) {
        return this.core.getOne(req, res);
    }

    @GET("/next")
    public registerTwo(req: Request, res: Response) {
        return this.core.getNext(req, res);
    }

    private instance() {
        if (!this.core) this.core = new One();
        return this.core;
    }
}

export default OneController;
