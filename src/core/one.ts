import { Request, Response } from "express";
import { dataFound, dataList } from "../helpers";
import { ResponseX } from "../helpers/decorators";


class Antony {

    @ResponseX()
    public async login(_req: Request, _res: Response) {
        const one = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json());

        const two = await fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json());

        return dataFound({ one, two });
    }
}

export default Antony;