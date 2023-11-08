var generos = []
var index = 0;
var indexaux = 0;
var genero;
// var map = new Map()
const getgeneros = {
    getgeneros(texto){
        generos = []
        genero = JSON.stringify(texto)

        index = genero.search('py_tags":')

        genero = genero.substring(index+10,genero.length)
        index = genero.search('"}]')
        genero = genero.substring(0,index)
        generos = genero.split(';')

        return generos;
    }
}

module.exports = getgeneros;