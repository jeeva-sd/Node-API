import { Request } from "express";
import { Controller, GET } from "../../helpers";
import UserCore from "../../core/user";
import { validate } from "../../middleware";
import { userById } from "./userHandler";

@Controller("/user")
class UserController {
    private core: UserCore;

    constructor() {
        this.core = this.instance();
    }

    @GET("/list")
    public userList(req: Request) {
        return this.core.userList(req.parameters);
    }

    @GET("/:userId", [validate(userById)])
    public userById(req: Request) {
        return this.core.userById(req.parameters);
    }

    private instance() {
        if (!this.core) this.core = new UserCore();
        return this.core;
    }
}

export default UserController;
