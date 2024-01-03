import { Request } from "express";
import { Controller, GET } from "../../helpers";
import { validateParams } from "../../middleware";
import { userByIdSchema } from "./schema";
import { UserCore } from "../../core/user";

@Controller("/user")
class UserController extends UserCore {

    constructor() {
        super();
    }

    @GET("/list")
    public userList() {
        return this.getUserList();
    }

    @GET("/:userId", [validateParams(userByIdSchema)])
    public userById(req: Request) {
        return this.getUserById(req.parameters);
    }
}

export default UserController;