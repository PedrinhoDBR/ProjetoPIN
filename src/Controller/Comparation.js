const translate = require('translate-google');

var canplaymin = true
var canplaymax = true
var requisitomin;
var requisitomax;
var index;
var isvalido = true;
var mensagem;
var type;
var txtmax;
var txtmin;
var textoOriginal;
var procuser;
var procgame;
var videouser;
var videogame;
var type2;
const sourceLanguage = 'auto'; 
var targetLanguage = 'en';
var teste= '';

async function comparar(arquivo, pcuser, cpu, gpu, gamespec,Jogo) {
    console.log('START:' + gamespec.cpu)

    mensagem = ''
    isvalido = true
    validapc(pcuser)
    canplaymax = true
    canplaymin = true

    var requisito = JSON.stringify(arquivo['pc_requirements'])

    requisito = requisito.substring(14)
    requisito = requisito.replace("', 'recommended': '", "")
    requisito = requisito.replace("\'}\"", "")
    requisito = requisito.replaceAll("\\\\t", "")
    index = requisito.search('Recomendados:')
    if (index == -1) {
        index = requisito.search('Recommended:')
    }
    if (index != -1) {
        requisitomin = requisito.substring(0, index)
        requisitomax = '<Strong>' + requisito.substring(index, requisito.length)

        await traduzir(requisitomin)
        txtmin = teste
        await traduzir(requisitomax)
        txtmax = teste
    } else {
        requisitomin = requisito
        requisitomax = ''
        await traduzir(requisitomin)
        txtmin = teste
        txtmax = ''
    }
    requisitomin = txtmin
    requisitomax = txtmax

    if (isvalido) {
        mensagem += '<strong>Mínimos:</strong><br>'
        await linguagem(1, requisitomin, pcuser, cpu, gpu, gamespec)
        if (requisitomax != '') {
            mensagem += ' <strong>Recomendados:</strong><br>'
            await linguagem(2, requisitomax, pcuser, cpu, gpu, gamespec)
        }
    }   
    // targetLanguage = 'pt'
    // await traduzir(requisitomin)
    // requisitomin = teste
    // if (requisitomax != ''){
    //     await traduzir(requisitomax)
    //     requisitomax = teste
    // }


    // await traduzir(Jogo)
    // var retornojogo = teste

    return { requisitomin, canplaymin, requisitomax, canplaymax, isvalido, mensagem };
}

function validapc(pcuser) {
    console.log(pcuser)
    if (pcuser.CPUID == null || pcuser.GPUID == null || pcuser.RAM == null || pcuser.Armazenamento == null) {
        isvalido = false;
    }
}

async function traduzir(textoo) {
    const resultado = await translate(textoo, { from: sourceLanguage, to: targetLanguage });
    console.log('resultado: ' + resultado);
    teste = resultado;
}

async function linguagem(ind, req, pcuser, cpu, gpu, gamespec) {
    await memoriaEN(ind, req, pcuser);
    await armazenamentoEN(ind, req, pcuser);
    await CpuGpu(ind, req, cpu, gpu, gamespec);
}

function armazenamentoEN(ind, req, pcuser) {
    const palavrasChaveArmazenamento = ['storage', 'storage space', 'hard disk space', 'disk space', 'hard drive'];
    const textoLowerCase = req.toLowerCase();
    var indexaux = -1;

    palavrasChaveArmazenamento.forEach(element => {
        if (indexaux == -1) {
            indexaux = textoLowerCase.indexOf(element);
        }
    });

    var str = req.substring(indexaux);
    armazenamentoMatch(ind, str, pcuser);
}

function armazenamentoMatch(ind, str, pcuser) {
    str = str.split('<br>')[0];

    var indexstr = str.search('GB');
    if (indexstr == -1) {
        indexstr = str.search('MB');
        if (indexstr != -1) {
            type = 'MB';
        }
    } else {
        type = 'GB';
    }
    var aux = str.substring(0, indexstr);
    let matches = aux.replace(/[^0-9]/g, "");

    if (pcuser.Armazenamento >= matches.trim()) {
        valida(ind, true);
    } else {
        mensagem += 'Armazenamento insuficiente' + '<br>';
        valida(ind, false);
    }
}

function valida(ind, tipo) {
    if (!tipo) {
        if (ind == 1) {
            canplaymin = false;
        } else {
            canplaymax = false;
        }
    }
}

async function memoriaEN(ind, req, pcuser) {
    var str = req.substring(req.indexOf("Memory"));


    const valor = await memoriaMatch(str);
    if (type2 == 'MB'){
        var valormemoria  = '0,'+valor
    }else{
        var valormemoria  = valor
    }

    if (pcuser.RAM >= parseInt(valormemoria)) {
        valida(ind, true);
    } else {
        mensagem += 'Memória RAM insuficiente' + '<br>';
        valida(ind, false);
    }
}

function memoriaMatch(str) {
    str = str.split('<br>')[0];

    var indexstr2 = str.search('GB');
    if (indexstr2 == -1) {
        indexstr2 = str.search('MB');
        if (indexstr2 != -1) {
            type2 = 'MB';
        }
    }else{
        type2 = 'GB'
    }
    let matches = str.match(/(\d+)/);

    if (matches) {
        return matches[0];
    }
}

async function CpuGpu(ind, req, cpu, gpu, gamespec){
    await getpython(req, cpu, gpu, gamespec);
    await procEN(ind)
    await VideoCardEN(ind)
}

async function VideoCardEN(ind) {
    var typeA;
    var typeB;
    var auxmemory1 = videogame[0]['Memory']
    var auxmemory2 = videouser[0]['Memory']
    if (auxmemory1.includes(',')){
        var MemoryGame = auxmemory1.split(',')
    }else{
        var MemoryGame = ['0','0','0']
    }
    if (auxmemory2.includes(',')){
        var MemoryUser = auxmemory2.split(',')
    }else{
        var MemoryUser = ['0','0','0']
    }

    
    var ddrGame = MemoryGame[1].replace(/[^0-9]/g, "").trim()
    var ddrUser = MemoryUser[1].replace(/[^0-9]/g, "").trim()
    var ValorMemoriaGame = MemoryGame[0].replace(/[^0-9]/g, "").trim()
    var ValorMemoriaUser = MemoryUser[0].replace(/[^0-9]/g, "").trim()
    var indexstr = MemoryGame[0].search('GB');
    if (indexstr == -1) {indexstr = MemoryGame[0].search('MB'); if (indexstr != -1) {typeA = 'MB';}} else {typeA = 'GB';}
    var indexstr2 = MemoryUser[0].search('GB');
    if (indexstr2 == -1) {indexstr2 = MemoryUser[0].search('MB'); if (indexstr2 != -1) {typeB = 'MB';}} else {typeB = 'GB';}

    if (parseInt(ddrUser) == parseInt(ddrGame)){
        if (parseInt(ValorMemoriaUser) == parseInt(ValorMemoriaGame)){
            if (typeB == 'GB'){
                if (typeA == 'GB'){
                    validaclock(ind)
                }else{
                    valida(ind, true);
                }
            }else{
                if (typeA == 'GB'){
                    mensagem += 'Placa de vídeo fraco' + '<br>';
                    valida(ind, false);
                }else{
                    validaclock(ind)
                }
            }
        }else if(parseInt(ValorMemoriaUser) > parseInt(ValorMemoriaGame)){
            valida(ind, true);
        }else{
            mensagem += 'Placa de vídeo fraco' + '<br>';
            valida(ind, false);
        }
    }else if(ddrUser > ddrGame){
        valida(ind, true);
    }else{
        mensagem += 'Placa de vídeo fraco' + '<br>';
        valida(ind, false);
    }

}

function validaclock(ind){
    var GPUClockGame = videogame[0]['GPU clock'].replace(/[^0-9]/g, "").trim()
    var GPUClockUser = videouser[0]['GPU clock'].replace(/[^0-9]/g, "").trim()
    var MemoryClockGame = videogame[0]['Memory clock'].replace(/[^0-9]/g, "").trim()
    var MemoryClockUser = videouser[0]['Memory clock'].replace(/[^0-9]/g, "").trim()

    if (parseInt(GPUClockUser) >= parseInt(GPUClockGame) & parseInt(MemoryClockUser) >= parseInt(MemoryClockGame)){
        valida(ind, true);
    }else{
        mensagem += 'Placa de vídeo fraco' + '<br>';
        valida(ind, false);
    }
}

async function procEN(ind) {
    if (procgame[0].Cores.includes('/')){
        var CoresGame = procgame[0].Cores.split('/')[1].trim();
    }else{
        var CoresGame = procgame[0].Cores.split('/')[0].trim();
    }
    if (procuser[0].Cores.includes('/')){
        var CoresUser = procuser[0].Cores.split('/')[1].trim();
    }else{
        var CoresUser = procuser[0].Cores.split('/')[0].trim();
    }

    var AuxClockGame = procgame[0].Clock.split(' ')[0].trim();
    var AuxClockUser = procuser[0].Clock.split(' ')[0].trim();

    var ClockGame = manipulaclock(AuxClockGame);
    var ClockUser = manipulaclock(AuxClockUser);


    if (CoresGame != '' && CoresUser != '') {
        if (parseInt(CoresUser)*parseInt(ClockUser) >= parseInt(CoresGame)*parseInt(ClockGame)) {
            valida(ind, true);

        } else {
            mensagem += 'Processador fraco' + '<br>';
            valida(ind, false);
        }
    } else {
        mensagem += 'Erro na API de peças de computador' + '<br>';
        valida(ind, false);
    }
}

function manipulaclock(txt) {
    if (txt.length == 4) {
        return txt;
    } else if (txt.includes('.')) {
        var aux = txt.replace('.', '');
        while (aux.length != 4) {
            aux += 0;
        }
        return aux;
    } else {
        while (txt.length != 4) {
            txt += 0;
        }
        return txt;
    }
}

async function getpython(req, cpu, gpu, gamespec) {
    const { spawn } = require("child_process");

    const childGame = spawn("python", ['request.py']);

    const onData = new Promise((resolve) => {
        childGame.stdout.once("data", (buffer) => {
            const response = JSON.parse(buffer);
            console.log("22222222222222:", response);
            procuser = response;
            resolve(response);
        });
    });

    childGame.stdin.write(JSON.stringify({ args: [cpu.PecaDescricao, 'cpu-specs'] }) + "\n");

    const childGame2 = spawn("python", ['request.py']);
    const onData2 = new Promise((resolve) => {
        childGame2.stdout.once("data", (buffer) => {
            const response = JSON.parse(buffer);
            console.log("22222222222222:", response);
            procgame = response;
            resolve(response);
        });
    });

    if (gamespec.CPU.includes('GHz')){
        var spec = gamespec.CPU.substring(0,(gamespec.CPU.length-7))
    }else{
        var spec = gamespec.CPU
    }
    if (spec == 'Intel Core 2 Duo T5750'){
        spec = 'Intel Core 2 Duo'
    }
    console.log('spec: '+spec)
    childGame2.stdin.write(JSON.stringify({ args: [spec, 'cpu-specs'] }) + "\n");

    const childGame3 = spawn("python", ['request.py']);

    const onData3 = new Promise((resolve) => {
        childGame3.stdout.once("data", (buffer) => {
            const response = JSON.parse(buffer);
            videouser = response;
            console.log("3333333333333333:", response);
            resolve(response);
        });
    });
    

    childGame3.stdin.write(JSON.stringify({ args: [gpu.PecaDescricao, 'gpu-specs'] }) + "\n");

    const childGame4 = spawn("python", ['request.py']);

    const onData4 = new Promise((resolve) => {
        childGame4.stdout.once("data", (buffer) => {
            const response = JSON.parse(buffer);
            videogame = response;
            console.log("3333333333333333:", response);
            resolve(response);
        });
    });
    var graph = gamespec.GraphicsCard.split('/')[0].trim();
   
    childGame4.stdin.write(JSON.stringify({ args: [graph,'gpu-specs'] }) + "\n");

    childGame.on("exit", (code) => console.log("exitCode1:", code));
   
    childGame2.on("exit", (code) => console.log("exitCode2:", code));

    childGame3.on("exit", (code) => console.log("exitCode3:", code));

    childGame4.on("exit", (code) => console.log("exitCode4:", code));
    const [response4, response, response2, response3] = await Promise.all([onData4, onData, onData2, onData3]);


}

module.exports = comparar;
