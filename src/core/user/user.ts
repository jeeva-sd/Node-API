import { TryCatch, dataFound, dataList, jsonHttp } from "../../helpers";

class UserCore {

    @TryCatch()
    public async userList(params: any) {
        const userResponse = await jsonHttp.get('/users');
        return dataFound(userResponse);
    }
}

export default UserCore;