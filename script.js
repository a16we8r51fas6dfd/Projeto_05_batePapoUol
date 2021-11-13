const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")

promessa.then(carregarMensagens)

function carregarMensagens(resposta) {
    console.log(resposta.data)
    const mensagensEl = document.querySelector("main > ul")

    for(let i = 0; i < 1000; i++) {
            mensagensEl.innerHTML += `
            <li class="mensagem-box ${resposta.data[i].type}">
                
                <p><span>(${resposta.data[i].time})</span><strong>${resposta.data[i].from}</strong> para <strong>${resposta.data[i].to}</strong>: ${resposta.data[i].text}</p>
            </li>`
        }
}

