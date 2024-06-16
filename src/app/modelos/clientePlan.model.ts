export class ClientePlanModel {
    id?: number;
    nombre?: string;
    detalles?: string;
    tarifa?: number;
    fechaAdquisicion?: Date;
    fechaVencimiento?: Date;
    cantidadBeneficiarios?: number;
    activo?: boolean;
    clienteId?: number;
    planId?: number;
    descuento?: number;
}