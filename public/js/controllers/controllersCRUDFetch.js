import { limpiarControles } from "../form.js";
import { $txtId } from "../form.js";
import { $txtTitulo, $rdoTransaccion, $txtDescripcion, $numbPrecio, $numbPuertas, $numbKMs, $numbPotencia } from "../form.js";
import { bajaAnuncioFetch, modificarAnuncioFetch, traerAnunciosFetch } from "../API/fetch.js";
import { validarString } from "../validaciones.js";
import { traerSoloAnunciosFetchAsync } from "../API/fetch-async.js";

// -------- Manejadores --------
export const eventHandlerBajaFetch = async( e ) => {

    e.preventDefault();

    try {
        
        const idAnuncioSeleccionado = parseInt( $txtId.value );

        if ( await bajaAnuncioFetch( idAnuncioSeleccionado ) ) { 

            alert( 'Baja exitosa!' );
            limpiarControles();
            
        }
        
    } catch (error) {
        
        throw { status: err.status, statusText: err.statusText };

    }

}

export const eventHandlerModificarFetch = async( e ) => {

    e.preventDefault();

    try {

        // Necesito traer la lista de nuevo, porque en el caso de que de de alta un nuevo anuncio
        // no me va a dejar modificarlo porque la app web seguirá trabajando con la lista anterior.
        let lista = await traerSoloAnunciosFetchAsync();

        const idAnuncioSeleccionado = parseInt( $txtId.value );
        const filtrado = lista.filter( x => x.id === idAnuncioSeleccionado);
        
        filtrado[0].titulo = validarString( $txtTitulo.value );
        filtrado[0].transaccion = $rdoTransaccion.value;
        filtrado[0].descripcion = validarString( $txtDescripcion.value );
        filtrado[0].precio = parseInt( $numbPrecio.value );
        filtrado[0].num_puertas = parseInt( $numbPuertas.value );
        filtrado[0].num_KMs = parseInt( $numbKMs.value );
        filtrado[0].potencia = parseInt( $numbPotencia.value );
        // console.log(filtrado[0]);
        

        if ( await modificarAnuncioFetch( idAnuncioSeleccionado, filtrado[0] ) ) { 

            alert( 'Modificación exitosa!' );
            limpiarControles();
            
        }

    } catch (error) {
        
        alert( error );
        limpiarControles();

    }

}
