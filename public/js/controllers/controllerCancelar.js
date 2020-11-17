import { limpiarControles } from "../form.js";

export const eventHandlerCancelar = ( e ) => { e.preventDefault(); limpiarControles(); }