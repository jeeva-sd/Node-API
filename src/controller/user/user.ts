import { Request, Response } from "express";
import { Controller, GET } from "../../helpers";
import UserCore from "../../core/user";

@Controller("/user")
class UserController {
    private core: UserCore;

    constructor() {
        this.core = this.instance();
    }

    @GET("/list")
    public userList(req: Request, res: Response) {
        return this.core.userList();
    }

    private instance() {
        if (!this.core) this.core = new UserCore();
        return this.core;
    }
}

export default UserController;
