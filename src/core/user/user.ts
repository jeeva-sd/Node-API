import { Exception, dataFound, jsonHttp } from "../../helpers";

class UserCore {

    @Exception()
    public async getUserList() {
        const userResponse = await jsonHttp.get(`/users`);
        return dataFound(userResponse);
    }

    @Exception()
    public async getUserById(params: any) {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export default UserCore;