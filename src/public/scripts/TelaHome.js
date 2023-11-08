function openDialog() {
  var dialog = document.getElementById("CadastroPC");
  dialog.showModal();
}

function fecharDialog() {
  var dialog = document.getElementById("CadastroPC")
  dialog.close();
}

function TrocarEstrela(param){
  console.log(param)
  if (document.getElementById(param).src.includes("Images/icones/estrelacheia.png")){
      document.getElementById(param).src = "Images/icones/estrelavazia.png"

      SETFav(param,false)
  }else {
      document.getElementById(param).src = "Images/icones/estrelacheia.png"
      SETFav(param,true)

  }

}
function SETFav(idgame,isdelete){
  console.log(idgame+" A "+isdelete)
  fetch('/favorito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({idgame:idgame,flag:isdelete}) // Se você precisa enviar dados no corpo da solicitação, coloque-os aqui
  })
}


const campoDeTexto = document.getElementById("search-input");

fetch(`/getusuario`)
.then(response => response.json())
.then(data => {
  usuario = data.resultado
  
})
.catch(error => {
 console.log("Erro na solicitação ao servidor: " + error.message)
})


campoDeTexto.addEventListener("input", function() {      
  const textoInserido = campoDeTexto.value;
  
  getlistajogos(textoInserido)

});

function getlistajogos(textoInserido){

fetch(`/consultar?texto=${textoInserido}`)
.then(response => response.json())
.then(data => {

    atualizarJogos(data.resultado,data.favoritos)
})
.catch(error => {
   console.log("Erro na solicitação ao servidor: " + error.message)
})
}


function atualizarJogos(novosJogos,listafavoritos) {
  const jogosContainer = document.getElementById("jogoslita");

  // Limpa o conteúdo atual
  jogosContainer.innerHTML = "";

  for (const jogo of novosJogos) {
    const jogoItem = document.createElement("div");
    jogoItem.className = "jogos-item";

    const jogoImage = document.createElement("div");
    jogoImage.className = "jogos-image";
    const img = document.createElement("img");
    img.src = jogo.header_image;
    img.alt = "";
    jogoImage.appendChild(img);

    const jogoInfo = document.createElement("div");
    jogoInfo.className = "jogos-info";
    const nomeJogo = document.createElement("h2");
    nomeJogo.className = "name-jogo";
    nomeJogo.textContent = jogo.name;

    const botaoFoda = document.createElement("div");
    botaoFoda.className = "botao-foda";

    const botaoInfo = document.createElement("button");
    botaoInfo.className = "botao";
    botaoInfo.textContent = "Informações";
    botaoInfo.addEventListener("click", () => {
      chamartela(jogo.appid);
    });

    const estrelaid = document.createElement("div");
    estrelaid.id = 'estrelaid';
  //   estrelaid.style.display = "none";

    const appidInput = document.createElement("input");
    appidInput.type = "text";
    appidInput.value = jogo.appid;
    appidInput.style.display = "none";

    const usuarioIDInput = document.createElement("input");
    usuarioIDInput.type = "text";
    
    usuarioIDInput.value = usuario.id;
    usuarioIDInput.style.display = "none";
    
    var isFav =  listafavoritos.includes(jogo.appid)

    const botaoEstrela = document.createElement("input");
    botaoEstrela.id = `${jogo.appid}`;
    botaoEstrela.type = "image";
    botaoEstrela.className = "botao favorito";
    if (isFav){
      botaoEstrela.src = "Images/icones/estrelacheia.png";
    }else{
    botaoEstrela.src = "Images/icones/estrelavazia.png";
  }
    botaoEstrela.title = "favoritar";
    botaoEstrela.addEventListener("click", () => {
      TrocarEstrela(botaoEstrela.id);
    });

    estrelaid.appendChild(appidInput);
    estrelaid.appendChild(usuarioIDInput);
    estrelaid.appendChild(botaoEstrela);

    botaoFoda.appendChild(botaoInfo);
    botaoFoda.appendChild(estrelaid);

    jogoInfo.appendChild(nomeJogo);
    jogoInfo.appendChild(botaoFoda);

    jogoItem.appendChild(jogoImage);
    jogoItem.appendChild(jogoInfo);

    jogosContainer.appendChild(jogoItem);
  }
}



