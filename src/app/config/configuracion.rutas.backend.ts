export namespace ConfiguracionRutasBackend {
    export const urlSeguridad = 'http://localhost:3000/';
    export const urlNegocio = 'http://localhost:3001/';
    export const urlChat = 'http://localhost:3010';
    export const cllaveCaptcha= '6LeT1-gpAAAAAMRDVvH9MUdT0bhN3j972y-725E_'
  
    export const next_public_epayco: string = process.env["PUBLIC_KEY"]!;
    export const next_private_epayco = process.env["PRIVATE_KEY"]!;
   
}