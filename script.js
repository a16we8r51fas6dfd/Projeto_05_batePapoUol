const mensagemInput = document.querySelector("footer > input")
mensagemInput.value = ""


let usuario = prompt("fala seu nome pro tio aqui")
let usuarioObj = {name: usuario}

const promessaMensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
const requisicaoLogin = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", usuarioObj)

promessaMensagens.then(carregarMensagens)
promessaMensagens.catch(console.log("deu ruim nas mensagens"))

requisicaoLogin.then(sucessoLogin)
requisicaoLogin.catch(falhaLogin)

function sucessoLogin() {
    console.log("entramos")
}

function falhaLogin() {
    usuario = prompt("nome de usuário já em uso, tentar outro")
    usuarioObj = {name: usuario}

    const requisicaoLogin = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", usuarioObj)

    requisicaoLogin.then(sucessoLogin)
    requisicaoLogin.catch(falhaLogin)
}

function carregarMensagens(resposta) {
    const mensagensEl = document.querySelector("main > ul")

    let ultimaMensagemTexto = ""

    mensagensEl.innerHTML = ""

    mensagensEl.innerHTML = ""
    for(let i = 0; i < resposta.data.length; i++) {
        if(i !== resposta.data.length - 1 && (resposta.data[i].to === usuario || resposta.data[i].to === "Todos")) {
            mensagensEl.innerHTML += `
            <li class="mensagem-box ${resposta.data[i].type}">
            
                <p><span>(${resposta.data[i].time})</span><strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</p>
                </li>`
            } else if(i === resposta.data.length - 1 && (resposta.data[i].to === usuario || resposta.data[i].to === "Todos")) {
                mensagensEl.innerHTML += `
                <li class="mensagem-box ${resposta.data[i].type} ultima-mensagem">
                
                <p><span>(${resposta.data[i].time})</span><strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</p>
                </li>`
            }
    }
        
    const ultimaMensagem = document.querySelector(".ultima-mensagem")
    
    if(ultimaMensagemTexto !== ultimaMensagem.textContent) {
        ultimaMensagem.scrollIntoView()
        ultimaMensagemTexto = ultimaMensagem.textContent
    }
    
        
}


setInterval(recarregarMensagens, 3000)

function recarregarMensagens() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    
    promessa.then(carregarMensagens)
}

//************************* MANTER CONEXÃO ***************************//

setInterval(manterConexao, 5000)

function manterConexao() {
    const manterPromessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuarioObj)
    
    manterPromessa.then(conexaoMantida)
    manterPromessa.catch(conexaoDoidera)
}

function conexaoMantida() {
    console.log("conexão mantida")
}

function conexaoDoidera() {
    console.log("caimos")
}

//************************* ENVIAR MENSAGEM ***************************//

function enviarMensagem() {
    const mensagem = document.querySelector("footer > input").value
    
    const mensagemObj = {
        from: usuario,
        to: "Todos",
        text: mensagem,
        type: "message"
    }

    const mensagemPost = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagemObj)
    
    mensagemInput.value = ""
    
    mensagemPost.then(recarregarMensagens)
    mensagemPost.catch(console.log("merda ao enviar"))
}

//************************* ENVIAR MENSAGEM ***************************//