import Point, { PointInterface } from "../models/Point";
import Item from "../models/Item";
import PointItem, { PointItemsInterface } from "../models/PointItem";

export default class PointService {
    getPoints = (): Promise<Point[]> =>
        new Promise((resolve, reject) =>
            Point.findAll()
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        );

    getPointById = (point_id: number): Promise<Point> =>
        new Promise((resolve, reject) =>
            Point.findByPk(point_id, {
                include: [
                    {
                        model: Item,
                        attributes: ["title"],
                        through: { attributes: [] },
                    },
                ],
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        );

    getPointFiltered = (
        city: string,
        uf: string,
        parsedItems: number
    ): Promise<Point[]> =>
        new Promise((resolve, reject) =>
            Point.findAll({
                where: {
                    city: city,
                    uf: uf,
                },
                include: [
                    {
                        model: Item,
                        attributes: ["title"],
                        through: {
                            attributes: [],
                            where: {
                                item_id: parsedItems,
                            },
                        },
                    },
                ],
            })
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        );

    createPoint = (pointData: PointInterface): Promise<Point> =>
        new Promise((resolve, reject) =>
            Point.create(pointData)
                .then((response) => resolve(response.id))
                .catch((error) => reject(error))
        );

    insertPointItems = (pointItems: PointItemsInterface) =>
        new Promise((resolve, reject) =>
            PointItem.create(pointItems)
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        );
}
