import { exception, dataFound, jsonHttp } from "../../helpers";

class UserCore {

    @exception()
    public async userList() {
        const userResponse = await jsonHttp.get(`/users`);
        return dataFound(userResponse);
    }

    @exception()
    public async userById(params: any) {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export default UserCore;