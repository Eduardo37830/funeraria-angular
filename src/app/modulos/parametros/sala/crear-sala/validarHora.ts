import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarHoras(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const horaEntrada = control.get('horaEntradaCuerpo')?.value;
    const horaSalida = control.get('horaSalidaCuerpo')?.value;

    if (!horaEntrada || !horaSalida) {
      return null; // No validar si una de las horas no está presente
    }

    const entrada = new Date(horaEntrada);
    const salida = new Date(horaSalida);

    // Verificar que la hora de salida sea al menos 3 horas después de la hora de entrada
    const diferenciaHoras = (salida.getTime() - entrada.getTime()) / (1000 * 60 * 60); // Convertir la diferencia a horas
    if (diferenciaHoras < 3) {
      return { horasInvalidas: true }; // Validación fallida si la diferencia es menor a 3 horas
    }

    // Verificar si las horas están en el mismo día, mes, semana y año
    if (
      salida.getFullYear() !== entrada.getFullYear() ||
      salida.getMonth() !== entrada.getMonth() ||
      salida.getDate() !== entrada.getDate()
    ) {
      return { fechaInvalida: true }; // Validación fallida si las fechas no coinciden en año, mes o día
    }

    return null; // Validación exitosa
  };
}
