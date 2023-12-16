import { Request, Response } from "express";
import { ResponseX, TryCatch, dataFound } from "../helpers";

class One {

    @TryCatch()
    @ResponseX()
    public async getOne(req: Request, _res: Response) {
        const { page } = req.query;
        const one = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`)
            .then(response => response.json());

        return dataFound(one);
    }

    @TryCatch()
    // @ResponseX()
    public async getNext(req: Request, _res: Response) {
        const { page } = req.query;
        const one = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`)
            .then(response => response.json());

        return dataFound(one);
    }
}

export default One;