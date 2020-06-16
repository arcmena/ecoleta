import {
    Table,
    Model,
    Column,
    AllowNull,
    Unique,
    BelongsToMany,
} from "sequelize-typescript";

import PointItem from "./PointItem";
import Point from "./Point";

export interface ItemInterface {
    id?: number;
    title: string;
    image: string;
}

@Table({ tableName: "items", timestamps: false })
export default class Item extends Model<Item> implements ItemInterface {
    @AllowNull(false)
    @Unique(true)
    @Column
    title: string;

    @AllowNull(false)
    @Unique(true)
    @Column
    image: string;

    @BelongsToMany(() => Point, () => PointItem)
    point_items: Point[];
}
