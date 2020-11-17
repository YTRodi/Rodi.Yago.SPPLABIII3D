import Anuncio_Auto from "./anuncio_auto.js";
import { validarString } from "./validaciones.js";

// ------ Controles Formulario ------

// Form principal.
export const frmPrincipal = document.querySelector( '#form-principal' );

// LabelId, TextBox's, radioButton
export const $labelId = document.querySelector( '#labelId' );
export const $txtId = document.querySelector( '#txtId' );
export const $txtTitulo = document.querySelector('#txtTitulo');
export const $rdoTransaccion = frmPrincipal.transaccion;
export const $txtDescripcion = document.querySelector( '#txtDescripcion' );
export const $numbPrecio = document.querySelector( '#numbPrecio' );
export const $numbPuertas = document.querySelector( '#numbPuertas' );
export const $numbKMs = document.querySelector( '#numbKMs' );
export const $numbPotencia = document.querySelector( '#numbPotencia' );


// Divs ( Alta, Baja, Modificar );
export const $divBaja = document.querySelector( '#divBaja' );
export const $divModif = document.querySelector( '#divModif' );
export const $divAlta = document.querySelector( '#divAlta' );


// Botones ( Alta, Baja, Modificar, LimpiarTabla );
export const $botonAlta = document.querySelector( '#btnAlta' );
export const $botonBaja = document.querySelector( '#btnBaja' );
export const $botonModificar = document.querySelector( '#btnModif' );
export const $botonCancelar = document.querySelector( '#btnCancelar' );

// Botones de los filtros (dropdown)
export const $botonFiltroTodos = document.getElementById( 'btnFiltroTodos' );
export const $botonFiltroAlquiler = document.getElementById( 'btnFiltroAlquiler' );
export const $botonFiltroVenta = document.getElementById( 'btnFiltroVenta' );

// TextBox Filtro
export const $txtFiltro = document.getElementById( 'txtFiltro' );

// Inputs type checkbox
export const $allInputs = document.querySelectorAll( '.cbox' );

// ------ Funciones ------
export const obtenerAnuncio_AutoForm = () => {

    const nuevoAnuncio = new Anuncio_Auto( 0,
                                            validarString( $txtTitulo.value ),
                                            $rdoTransaccion.value,
                                            validarString( $txtDescripcion.value ),
                                            parseInt( $numbPrecio.value ),
                                            parseInt( $numbPuertas.value ),
                                            parseInt( $numbKMs.value ),
                                            parseInt( $numbPotencia.value ));

    if ( nuevoAnuncio.titulo && nuevoAnuncio.descripcion ) {

        return nuevoAnuncio;

    } else {

        throw new Error( `El titulo y/o la descripción no pueden ser sólo números.` );

    }

}

export const limpiarControles = () => {

    $txtTitulo.value = '';
    $rdoTransaccion.value = 'Venta';
    $txtDescripcion.value = '';
    $numbPrecio.value = '0';
    $numbPuertas.value = '';
    $numbKMs.value = '';
    $numbPotencia.value = '';

    $txtFiltro.value = 'N/A';
    $allInputs.forEach( el => { el.checked = true; });
    
    $divAlta.classList.remove( 'desaparecer' );
    $botonAlta.classList.remove( 'desaparecer' ); // Le saco la clase desaparecer al botón del alta

    $divBaja.classList.add( 'desaparecer' );
    $divModif.classList.add( 'desaparecer' );

    $labelId.classList.add( 'desaparecer' );
    $txtId.classList.add( 'desaparecer' );
    $botonBaja.classList.add( 'desaparecer' );
    $botonModificar.classList.add( 'desaparecer' );
    
};