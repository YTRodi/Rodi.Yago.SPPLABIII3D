// Controles
import { frmPrincipal } from "./form.js";
import { $botonFiltroTodos, $botonFiltroAlquiler, $botonFiltroVenta } from "./form.js";
import { $txtFiltro, $allInputs } from "./form.js";
import { $botonBaja, $botonModificar, $botonCancelar } from "./form.js";
import { limpiarControles } from "./form.js";

// ============================= Tabla ==============================
import crearTabla, { $divTabla } from "./tabla.js";
import { eventHandlerCancelar } from "./controllers/controllerCancelar.js";

// ============================= ( Fetch-async ) ==============================
import { traerSoloAnunciosFetchAsync, traerAnuncios } from "./API/fetch-async.js";
// Handlers CRUD (Fetch-async)
import { eventHandlerAltaFetchAsync } from "./controllers/controllersCRUDFetchAsync.js";

// ============================= ( Fetch ( Promesas ) ) ==============================
import { eventHandlerBajaFetch, eventHandlerModificarFetch } from "./controllers/controllersCRUDFetch.js";

let lista;

window.addEventListener( 'load', initHandlers );

async function initHandlers() {

    try {

        // GET ( Fetch-async )
        lista = await traerAnuncios();
        // console.log(lista);

        // ALTA ( Fetch-async )
        frmPrincipal.addEventListener( 'submit', async ( e ) => { 
        
            try 
                { await eventHandlerAltaFetchAsync( e ); } 
            catch ( error ) 
                { alert( error ); limpiarControles(); }

        });

        
        // BAJA ( Fetch con promesas )
        $botonBaja.addEventListener( 'click', async ( e ) => {

            try 
                { await eventHandlerBajaFetch( e ); } 
            catch (error) 
                { alert( error ); limpiarControles(); }

        });


        // MODIFICAR ( Fetch con promesas )
        $botonModificar.addEventListener( 'click', async ( e ) => {

            try 
                { await eventHandlerModificarFetch( e ); }
            catch (error) 
                { alert( error ); limpiarControles(); }
            
        });


        // CANCELAR
        $botonCancelar.addEventListener( 'click', ( e ) => { eventHandlerCancelar( e ); });


        // traerSoloAnuncios va a traer otra vez la lista sin refrescarme la tabla, ya que si elimino un registro y le vuelvo a pasar
        // la 'lista' original, al método 'filtroTodos/Alquiler/Venta', va a hacerme el cálculo con la lista anterior.
        // =============================== FILTROS ======================================
        $botonFiltroTodos.addEventListener( 'click', async( e ) => { e.preventDefault(); filtroTodos( await traerSoloAnunciosFetchAsync() ); } )

        $botonFiltroAlquiler.addEventListener( 'click', async( e ) => { e.preventDefault(); filtroAlquiler( await traerSoloAnunciosFetchAsync() ); } )
        
        $botonFiltroVenta.addEventListener( 'click', async( e ) => { e.preventDefault(); filtroVenta( await traerSoloAnunciosFetchAsync() ); } )


        // =============================== MAPEO DE TABLA ======================================
        $allInputs.forEach( el  =>  { mapearTabla( el, lista ); });

    } catch ( err ) {
        
        err.status && err.statusText
        ? console.error( `Estado de la petición: ${ err.status } - ${ err.statusText }` )
        : console.error( 'Error!' );

    }

};

// Filtros
function filtroTodos( lista ) {
    
    const precios = lista.map( x => x.precio );
    const lenPrecios = precios.length;
    const totalPrecios = precios.reduce( ( acc, el ) => acc + el, 0);
    const resultado = totalPrecios / lenPrecios;

    $txtFiltro.value = resultado;

}

function filtroAlquiler( lista ) {

    const soloAlquiler = lista.filter( x => x.transaccion === 'Alquiler' );
    const precios = soloAlquiler.map( x => x.precio );
    const lenPrecios = precios.length;
    const totalPrecios = precios.reduce( ( acc, el ) => acc + el, 0);
    const resultado = totalPrecios / lenPrecios;

    // $txtFiltro.value = Math.round( resultado );
    $txtFiltro.value = resultado;

}

function filtroVenta( lista ) {

    const soloVenta = lista.filter( x => x.transaccion === 'Venta' );
    const precios = soloVenta.map( x => x.precio );
    const lenPrecios = precios.length;
    const totalPrecios = precios.reduce( ( acc, el ) => acc + el, 0);
    const resultado = totalPrecios / lenPrecios;

    // $txtFiltro.value = Math.round( resultado );
    $txtFiltro.value = resultado;

}

// Mapear tabla
// Hago lo mismo que en los filtros, siempre tengo que trabajar con la lista actualizada, 
// por eso vuelvo a traer la lista sin refresca la tabla.
async function mapearTabla( el, lista ) {
    
    // el = checkbox.
    el.addEventListener( 'click', async() => { 
        
        lista = await traerSoloAnunciosFetchAsync();

        let listaMapeada = lista.map( row => {
            
            let fila = {};
            for (const key in row) {

                if ( document.getElementById('cbox'+key).checked ) {
                    fila[key] = row[key];
                }

            }
            return fila;
        })

        console.log(listaMapeada);
        $divTabla.textContent = '';
        $divTabla.appendChild( crearTabla( listaMapeada ) );

    });

};