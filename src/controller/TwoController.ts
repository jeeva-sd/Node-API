import { Request, Response } from "express";
import { Controller, GET } from "../helpers";
import One from "../core/one";

@Controller("/two")
class TwoController {
    private core: One;
    constructor() {
        this.core = this.instance();
    }

    @GET("/")
    public register(req: Request, res: Response) {
        return res.send('Hi')
    }

    private instance() {
        if (!this.core) this.core = new One();
        return this.core;
    }
}

export default TwoController;
