import { TryCatch, dataFound, dataList, jsonHttp } from "../../helpers";

class UserCore {

    @TryCatch()
    public async userList(params: any) {
        const userResponse = await jsonHttp.get(`/users`);
        return dataFound(userResponse);
    }

    @TryCatch()
    public async userById(params: any) {
        console.log(params, 'params');
        const userResponse = await jsonHttp.get(`/users/4`); //${params.userId}
        return dataFound(userResponse);
    }
}

export default UserCore;