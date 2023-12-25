import { GUARD, dataFound, jsonHttp } from "../../helpers";

class UserCore {

    @GUARD()
    public async userList(params: any) {
        const userResponse = await jsonHttp.get(`/users`);
        return dataFound(userResponse);
    }

    @GUARD()
    public async userById(params: any) {
        const userResponse = await jsonHttp.get(`/users/4`);
        return dataFound(userResponse);
    }
}

export default UserCore;