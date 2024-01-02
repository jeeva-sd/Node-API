import { Exception, dataFound, dbError, jsonHttp } from "../../helpers";
import UserQueries from "../../database/queries/user";

class UserCore {
    private userQueries;

    constructor() {
        this.userQueries = UserQueries.getInstance();
    }

    @Exception()
    public async getUserList() {
        const userList: any = await this.userQueries.getUserList();
        if (userList.error) return dbError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: any) {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export default UserCore;