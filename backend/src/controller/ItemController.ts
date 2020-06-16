import { Request, Response } from "express";

import ItemService from "../service/ItemService";

const GET = {
    getItems: async (_req: Request, res: Response) => {
        try {
            const itemService = new ItemService();

            const item = await itemService.getChats();

            res.status(200).send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...GET };
