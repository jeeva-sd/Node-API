import { Request } from "express";
import { TryCatch, dataFound } from "../helpers";

class One {

    @TryCatch()
    public async getOne(req: Request) {
        const { page } = req.query;
        const one = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`)
            .then(response => response.json());

        return dataFound(one);
    }
}

export default One;