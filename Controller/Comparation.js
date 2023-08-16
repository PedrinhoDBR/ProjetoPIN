//tem que separar o minimun do recomended
var canplaymin = true
var canplaymax = true
var requisitomin;
var requisitomax;
var index;
const comparar = {
    comparar(arquivo,pcuser) {
        canplaymax = true
        canplaymin = true
        //remover caracteres especiais
        var requisito = JSON.stringify(arquivo['pc_req'])
        

        requisito = requisito.substring(14)
        requisito = requisito.replace("', 'recommended': '","")
        requisito = requisito.replace("\'}\"","")
        requisito = requisito.replaceAll("\\\\t","")
        index = requisito.search('Recomendados:')
        if (index == -1){
            index = requisito.search('Recommended:')
        }
        if (index != -1){
            requisitomin = requisito.substring(0,index)
            requisitomax = '<Strong>'+requisito.substring(index,requisito.length)
        }else{
            requisitomin = requisito
            requisitomax = ''
        }
        
        
        linguagem(1,requisitomin,pcuser)
        linguagem(2,requisitomax,pcuser)
    
        return {requisitomin,canplaymin,requisitomax,canplaymax};
    }
}

function checar(canplay){

}

function linguagem(ind,req,pcuser){
    const a = req.search('Processador')

    if (a == -1){
        memoriaEN(ind,req,pcuser)
        procEN(req)
    }else{
        memoriaBR(ind,req,pcuser)
        procBR(req)
    }
}

function valida(ind,tipo){
    if (!tipo){
        if (ind == 1){
            canplaymin = false
            return
        }else{
            canplaymax = false
            return
        }
    }else{
        if (ind == 1 && canplaymin){
            canplaymin = true
            return
        }
        if (ind == 2 && canplaymax){
            canplaymax = true
            return
        }
    }
}

function memoriaEN(ind,req,pcuser){
    var str = req.substring(req.indexOf("Memory"));
    const valor = memoriaMatch(str)
    if (pcuser.RAM >= valor){
        valida(ind,true)
        return
    }else{
        valida(ind,false)
        return
    }
}

function memoriaBR(ind,req,pcuser){
    var str = req.substring(req.indexOf("Memória"));
    const valor = memoriaMatch(str)
    if (pcuser.RAM >= valor){
        valida(ind,true)
        return
    }else{
        valida(ind,false)
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