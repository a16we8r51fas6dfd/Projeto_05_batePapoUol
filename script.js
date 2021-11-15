const usuario = prompt("fala seu nome pro tio aqui")
const usuarioObj = {name: usuario}

const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")

const requisicaoLogin = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", usuarioObj)

promessa.then(carregarMensagens)
promessa.catch(promessaDoidera)

function promessaDoidera() {
    console.log("deu tudo errado")
}

requisicaoLogin.then(requisicaoIriri)
requisicaoLogin.catch(requisicaoDoidera)

function requisicaoIriri(resposta) {
    console.log("iriri é o robs")
}

function requisicaoDoidera() {
    console.log("deu doidera no login")
}

function carregarMensagens(resposta) {
    console.log(resposta.data)
    const mensagensEl = document.querySelector("main > ul")

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
    ultimaMensagem.scrollIntoView()
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

}

//************************* ENVIAR MENSAGEM ***************************//