import { Request } from "express";
import { Controller, GET } from "../../helpers";
import UserCore from "../../core/user";
import { validate } from "../../middleware";
import { userById } from "./userHandler";

@Controller("/user")
class UserController {
    private userCore: UserCore;

    @GET("/list")
    public userList() {
        return this.userInstance().getUserList();
    }

    @GET("/:userId", [validate(userById)])
    public userById(req: Request) {
        return this.userInstance().getUserById(req.parameters);
    }

    private userInstance() {
        if (!this.userCore) this.userCore = new UserCore();
        return this.userCore;
    }
}

export default UserController;