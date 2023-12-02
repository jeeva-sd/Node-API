import { Request, Response } from "express";
import { Controller, GET } from "../helpers/decorators";
import Antony from "../core/one";

@Controller("/one")
class OneController {
    private core: Antony;
    constructor() {
        this.core = this.instance();
    }

    @GET("/")
    public register(req: Request, res: Response) {
        return this.core.login(req, res);
    }

    private instance() {
        if (this.core) return this.core;
        else this.core = new Antony();

        return this.core;
    }
}

export default OneController;
