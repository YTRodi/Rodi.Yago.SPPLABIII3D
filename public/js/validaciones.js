export const validarString = ( dato ) => {

    let retorno;
    //i = No discrimina mayúsculas de minúsculas
    //g = Global
    //m = Multi line, inluye ^ y $ match (start/end de la línea)

    ( /[a-zñÑáéíóúÁÉÍÓÚ]/igm.test( dato ) )
    ? retorno = dato
    : retorno = null;

    // console.log( retorno );

    return retorno;

}