var generos = []
var index = 0;
var indexaux = 0;
var genero;
// var map = new Map()
const getgeneros = {
    getgeneros(texto){
        generos = []
        genero = JSON.stringify(texto)

        index = genero.search("'description':")

        while (index != -1){
            genero = genero.substring(index+16,genero.length)
            pegargenero(genero)

            index = genero.search("'description':")
        }
        return generos;
    }
}

function pegargenero(){
    indexaux = genero.search("'}")
    generos.push(genero.substring(0,indexaux))
}

module.exports = getgeneros;