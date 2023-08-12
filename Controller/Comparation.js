//tem que separar o minimun do recomended
const comparar = {
    comparar(arquivo) {
        //remover caracteres especiais
        var requisito = JSON.stringify(arquivo['pc_req'])
        var canplay = true

        requisito = requisito.substring(14)
        requisito = requisito.replace("', 'recommended': '","")
        requisito = requisito.replace("\'}\"","")
        requisito = requisito.replaceAll("\\\\t","")

        //verificar a linguagem
        linguagem(requisito)
        
        return {requisito,canplay}
    }
}

function linguagem(req){
    const a = req.search('Processador')
    if (a == -1){
        // memoria()
        procEN(req)
    }else{
        procBR(req)
    }
}

// memoria

function procBR(req){
    const processador = req.search('Processador')
}

function procEN(req){

}

module.exports = comparar;