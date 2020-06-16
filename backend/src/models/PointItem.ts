import {
    Table,
    Model,
    Column,
    ForeignKey,
    AllowNull,
} from "sequelize-typescript";

import Item from "./Item";
import Point from "./Point";

export interface PointItemsInterface {
    item_id: number;
    point_id: number;
}

@Table({ tableName: "points_items", timestamps: false })
export default class PointItem extends Model<PointItem>
    implements PointItemsInterface {
    @ForeignKey(() => Item)
    @AllowNull(false)
    @Column
    item_id: number;

    @ForeignKey(() => Point)
    @AllowNull(false)
    @Column
    point_id: number;
}
