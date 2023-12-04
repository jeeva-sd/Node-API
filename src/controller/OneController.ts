import { Request, Response } from "express";
import { Controller, GET } from "../helpers/decorators";
import One from "../core/one";

@Controller("/one")
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
