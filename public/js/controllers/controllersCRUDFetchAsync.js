import { obtenerAnuncio_AutoForm, limpiarControles } from "../form.js";

// Fetch-async
import { altaAnuncioFetchAsync } from "../API/fetch-async.js";

export const $divSpinner = document.querySelector( '#divSpinner' );

// -------- Manejadores --------
//! =============================== CRUD (FETCH ASYNC)======================================
export const eventHandlerAltaFetchAsync = async( e ) => {
    
    e.preventDefault();

    try {
        
        const anuncioForm = obtenerAnuncio_AutoForm();
    
        if( anuncioForm ) {
            
            // POST
            if ( await altaAnuncioFetchAsync( anuncioForm ) ) { 
    
                alert( 'Alta exitosa!' );
                limpiarControles();
                
            }
    
        }

    } catch ( err ) {
        
        throw { status: err.status, statusText: err.statusText };

    }
    
}
