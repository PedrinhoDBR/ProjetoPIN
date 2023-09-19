//tem que separar o minimun do recomended
var canplaymin = true
var canplaymax = true
var requisitomin;
var requisitomax;
var index;
var isvalido = true;
var mensagem;
var type;
const comparar = {
    comparar(arquivo,pcuser) {
        mensagem = ''
        isvalido = true
        validapc(pcuser)
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
        if (isvalido){   
            mensagem += '<strong>Mínimos:</strong><br>'
            linguagem(1,requisitomin,pcuser)
            if (requisitomax != ''){
                mensagem += ' <strong>Recomendados:</strong><br>'
            }
            linguagem(2,requisitomax,pcuser)    
        }
        return {requisitomin,canplaymin,requisitomax,canplaymax,isvalido,mensagem};
    }
}

function validapc(pcuser){
    console.log(pcuser)
    if (pcuser.CPUID == null){
        isvalido = false
        return
    }else if(pcuser.GPUID == null){
        isvalido = false
        return
    }else if(pcuser.RAM == null){
        isvalido = false
        return
    }else if(pcuser.Armazenamento == null){
        isvalido = false
        return
    }else{
        return
    }
    return
}

function checar(canplay){

}

function linguagem(ind,req,pcuser){
    const a = req.search('Processador')

    if (a == -1){
        memoriaEN(ind,req,pcuser)
        armazenamentoEN(ind,req,pcuser)
        procEN(req)
    }else{
        memoriaBR(ind,req,pcuser)
        armazenamentoBR(ind,req,pcuser)
        procBR(req)
    }
}

function armazenamentoEN(ind,req,pcuser){
    var indexaux = req.indexOf("Hard Disk Space")

    if (indexaux == -1){
        indexaux = req.indexOf("Hard Drive")
    } 
    var str = req.substring(indexaux);
    armazenamentoMatch(ind,str,pcuser)
}

function armazenamentoBR(ind,req,pcuser){
    var str = req.substring(req.indexOf("Armazenamento"));
    armazenamentoMatch(ind,str,pcuser)
}

function armazenamentoMatch(ind,str,pcuser){
    str  = str.split('<br>')[0]
    
    var indexstr = str.search('GB')
    if (indexstr == -1){
        indexstr = str.search('MB')
        if (indexstr != -1){
            type = 'MB'
        }
    }else{
        type = 'GB'
    }
    var aux = str.substring(0,indexstr)
    // let matches = aux.match(/(\d+)/);
    let matches = aux.replace(/[^0-9]/g, "");
    // [int(s) for s in txt.split() if s.isdigit()]
    
    
    if (pcuser.Armazenamento >= matches[0]){
        valida(ind,true)
        return
    }else{
        mensagem += 'Armazenamento insuficiente' + '<br>'
        valida(ind,false)
        return
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
        mensagem += 'Memória RAM insuficiente' + '<br>'
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
        mensagem += 'Memória RAM insuficiente' + '<br>'
        valida(ind,false)
        return
    }
}

// function 

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