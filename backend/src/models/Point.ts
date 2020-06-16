import {
    Table,
    Model,
    Column,
    AllowNull,
    Max,
    BelongsToMany,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";

import PointItem from "./PointItem";
import Item from "./Item";

export interface PointInterface {
    id?: number;
    name: string;
    email: string;
    whatsapp: string;
    image: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
    image_url?: string;
}

@Table({ tableName: "points" })
export default class Point extends Model<Point> implements PointInterface {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    whatsapp: string;

    @AllowNull(false)
    @Column
    image: string;

    @AllowNull(false)
    @Column(DataTypes.DECIMAL(9, 6))
    latitude: number;

    @AllowNull(false)
    @Column(DataTypes.DECIMAL(9, 6))
    longitude: number;

    @AllowNull(false)
    @Column
    city: string;

    @AllowNull(false)
    @Max(2)
    @Column
    uf: string;

    @Column(DataTypes.VIRTUAL)
    image_url: string;

    @BelongsToMany(() => Item, () => PointItem)
    items: Item[];
}
