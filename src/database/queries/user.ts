import { DbException } from "../../helpers";
import { db } from "..";

class UserQueries {
    private static instance: UserQueries | null = null;

    private constructor() {
        // Private constructor to prevent external instantiation
    }

    public static getInstance(): UserQueries {
        if (!UserQueries.instance) {
            UserQueries.instance = new UserQueries();
        }
        return UserQueries.instance;
    }

    @DbException()
    public async getUserList() {
        const userList = await db.user.findMany();
        return userList;
    }
}

export default UserQueries;
