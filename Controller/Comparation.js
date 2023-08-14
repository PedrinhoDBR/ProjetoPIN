//tem que separar o minimun do recomended
var canplay = true
const comparar = {
    comparar(arquivo,pcuser) {
        canplay = true
        //remover caracteres especiais
        var requisito = JSON.stringify(arquivo['pc_req'])
        

        requisito = requisito.substring(14)
        requisito = requisito.replace("', 'recommended': '","")
        requisito = requisito.replace("\'}\"","")
        requisito = requisito.replaceAll("\\\\t","")


        //verificar a linguagem
        linguagem(requisito,pcuser)
        return {requisito,canplay}
    }
}

function checar(canplay){

}

function linguagem(req,pcuser){
    const a = req.search('Processador')

    if (a == -1){
        memoriaEN(req,pcuser)
        procEN(req)
    }else{
        memoriaBR(req,pcuser)
        procBR(req)
    }
}

function memoriaEN(req,pcuser){
    var str = req.substring(req.indexOf("Memory"));
    const valor = memoriaMatch(str)

    if (pcuser < valor){
        canplay = false
        return
    }else{
        // canplay = true
        return
    }
}

function memoriaBR(req,pcuser){
    var str = req.substring(req.indexOf("Memória"));
    const valor = memoriaMatch(str)

    if (pcuser < valor){
        canplay = false
        return
    }else{
        // canplay = true
        return
    }
}

function memoriaMatch(str){
    str  = str.split('<br>')[0]
    let matches = str.match(/(\d+)/);
    // Display output if number extracted
    if (matches) {
        return matches[0];
    }
}

function procBR(req){
    const processador = req.search('Processador')
}

function procEN(req){

}

module.exports = comparar;