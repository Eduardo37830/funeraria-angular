import { SalaModel } from "./sala.model";

export class SedeModel {
    id?: number;
    nombre?: string;
    direccion?: string;
    salas?: SalaModel[];
}