export class ClienteModel {
    id?: number;
    primerNombre?: string;
    segundoNombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    correo?: string;
    celular?: string;
    foto?: string;
    ciudadResidencia?: string;
    direccion?: string;
    fechaRegistro?: Date;
    activo?: boolean;
    _idSeguridad?: string;
}