export class SalaModel {
    id?: number;
    nombre?: string;
    tipo?: string;
    capacidad?: number;
    horaEntradaCuerpo?: Date;
    horaSalidaCuerpo?: Date;
    disponibilidad?: boolean;
    sedeId?: number;
}