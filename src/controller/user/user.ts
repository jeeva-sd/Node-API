import { Request } from "express";
import { controller, GET } from "../../helpers";
import UserCore from "../../core/user";
import { validate } from "../../middleware";
import { userById } from "./userHandler";

@controller("/user")
class UserController {
    private core: UserCore;

    @GET("/list")
    public userList() {
        return this.instance().userList();
    }

    @GET("/:userId", [validate(userById)])
    public userById(req: Request) {
        return this.instance().userById(req.parameters);
    }

    private instance() {
        if (!this.core) this.core = new UserCore();
        return this.core;
    }
}

export default UserController;