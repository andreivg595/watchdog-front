import { PointType } from "../enums/point-type.enum";

export interface PointConfig {
    type: PointType;
    color: string;
    iconUrl: string;
}