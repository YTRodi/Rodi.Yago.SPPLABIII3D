import Anuncio_Auto from "../anuncio_auto.js";
import { $divSpinner } from "../controllers/controllersCRUDFetchAsync.js";
import crearTabla, { $divTabla } from "../tabla.js";

const BASE_URL = 'http://localhost:3000/anuncios';

export const traerAnunciosFetch = () => {

    try {

        $divSpinner.textContent = '';
        $divSpinner.appendChild( crearPreloader() );

        // GET
        return fetch( BASE_URL )
            .then( res => {
                
                if (!res.ok ) return Promise.reject( res );
                return res.json()

            })
            .then( data => {

                const dataParseada = [];
        
                data.forEach(element => {

                    // Los parseo, porque los objetos que me pasan por el db.json son del tipo Object.
                    // Al parsearlos a tipo Anuncio_Auto, los id se me corrigen y se me quedan en la primer columna.
                    const anuncioParseado = new Anuncio_Auto( element.id,
                        element.titulo,
                        element.transaccion,
                        element.descripcion,
                        element.precio,
                        element.num_puertas,
                        element.num_KMs,
                        element.potencia);

                    dataParseada.push( anuncioParseado );

                });

                $divSpinner.textContent = '';
                $divTabla.textContent = '';
                $divTabla.appendChild( crearTabla( dataParseada ) );

                return dataParseada;
                
            })
            .catch( err => {
                console.log(err);
            } )
            

    } catch ( err ) {

        throw { status: err.status, statusText: err.statusText };
        
    }

}

// DELETE
export const bajaAnuncioFetch = ( id ) => {

    
    try {

        $divSpinner.appendChild( crearPreloader() );
        
        const options = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        }

        return fetch( `${ BASE_URL }/${ id }`, options )
            .then( res => {
                
                if (!res.ok ) return Promise.reject( res );
                return res.json()

            })
            .then( data => {

                // Actualizo la tabla.
                traerAnunciosFetch();

                return true;
                
            })
            .catch( err => {
                console.log(err);
            } )

        
    } catch ( err ) {

        throw { status: err.status, statusText: err.statusText };

    }

}


// MODIFICAR
export const modificarAnuncioFetch = ( id, objAnuncio ) => {

    $divSpinner.appendChild( crearPreloader() );

    try {

        const options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify( objAnuncio )
        }

        return fetch( `${ BASE_URL }/${ id }`, options )
            .then( res => {
                
                if (!res.ok ) return Promise.reject( res );
                return res.json()

            })
            .then( data => {

                // Actualizo la tabla.
                traerAnunciosFetch();

                return true;
                
            })
            .catch( err => {
                console.log(err);
            } )
        
    } catch ( err ) {

        throw { status: err.status, statusText: err.statusText };

    }

}


// Functions
const crearPreloader = () => {

    const spinnerCar = document.createElement( 'img' );

    spinnerCar.width = 80;
    spinnerCar.src = './spinnercar.gif';
    spinnerCar.alt = 'Spinner para la carga de la tabla.';

    return spinnerCar;
}