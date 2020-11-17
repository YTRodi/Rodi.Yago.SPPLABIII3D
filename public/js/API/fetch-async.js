import Anuncio_Auto from "../anuncio_auto.js";
import { $divSpinner } from "../controllers/controllersCRUDFetchAsync.js";
import crearTabla, { $divTabla } from "../tabla.js";

const BASE_URL = 'http://localhost:3000/anuncios';

// GET (solo la lista) 
export const traerSoloAnunciosFetchAsync = async() => {

    try {

        $divSpinner.textContent = '';
        $divSpinner.appendChild( crearPreloader() );

        const res = await fetch( BASE_URL );
        // console.log(res);

        if( !res.ok ) {
            
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }

        const data = await res.json();
        
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
        // console.log(dataParseada);

        $divSpinner.textContent = '';
        return dataParseada;

    } catch ( err ) {

        // console.log(err);
        throw { status: err.status, statusText: err.statusText };
        
    }

}

// GET (lista y crea la tabla) 
export const traerAnuncios = async() => {

    try {

        // Reutilización de código.
        let data = await traerSoloAnunciosFetchAsync();
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

        $divTabla.textContent = '';
        $divTabla.appendChild( crearTabla( dataParseada ) );


        return dataParseada;

    } catch ( err ) {

        // console.log(err);
        throw { status: err.status, statusText: err.statusText };
        
    }

}

// POST
export const altaAnuncioFetchAsync = async( anuncio ) => {

    try {

        $divSpinner.appendChild( crearPreloader() );

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify( anuncio )
        }

        const res = await fetch( BASE_URL, options);

        if( !res.ok ) {
            
            let msgError = res.statusText || 'Se produjo un error';
            throw { status: res.status, statusText: msgError };
        }

        // Actualizo la tabla.
        traerAnuncios();

        return true;

    } catch ( err ) {

        // console.log(err);
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