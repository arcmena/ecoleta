import { Request, Response } from "express";

import PointService from "../service/PointService";

const GET = {
    getAllPoints: async (req: Request, res: Response) => {
        try {
            const pointService = new PointService();

            const data = await pointService.getPoints();

            data.forEach((point) => {
                point.image_url = `http://192.168.100.127:3300/uploads/${point.image}`;
            });

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    getPointById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const pointService = new PointService();

            const point = await pointService.getPointById(Number(id));

            if (!point) {
                res.status(400).send({
                    message: `No point found with the ID ${id}`,
                });
            }

            point.image_url = `http://192.168.100.127:3300/uploads/${point.image}`;

            res.status(200).send({ point });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    getPointFiltered: async (req: Request, res: Response) => {
        try {
            const { city, uf, items } = req.query;

            const parsedItems = String(items)
                .split(",")
                .map((item) => Number(item.trim()));

            const pointService = new PointService();

            const point = await pointService.getPointFiltered(
                city,
                uf,
                parsedItems
            );

            point.image_url = `http://192.168.100.127:3300/uploads/${point.image}`;

            res.status(200).send({ point });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

const POST = {
    createPoint: async (req: Request, res: Response) => {
        try {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                items,
            } = req.body;

            const pointData = {
                image: req.file.filename,
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
            };

            const pointService = new PointService();

            const point_id = await pointService.createPoint(pointData);

            items
                .split(",")
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                    const items = {
                        item_id,
                        point_id,
                    };
                    pointService.insertPointItems(items);
                });

            res.status(200).send({ id: point_id, pointData });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...GET, ...POST };
