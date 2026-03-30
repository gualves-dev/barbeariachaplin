const URL_BASE = "https://barbearia-chaplinofc-production.up.railway.app";


let ID_PROFISSIONAL_LOGADO = 0;

// pega o texto da página
const textoBarbeiroLogin = document
    .querySelector(".NomeBarbeiro")
    .textContent
    .trim();

function descobrirBarbeiro() {

    if (textoBarbeiroLogin === "Gabriel") {
        ID_PROFISSIONAL_LOGADO = 1;

    } else if (textoBarbeiroLogin === "Pedro") {
        ID_PROFISSIONAL_LOGADO = 2;

    } else if (textoBarbeiroLogin === "Ramon") {
        ID_PROFISSIONAL_LOGADO = 3;

    } else if (textoBarbeiroLogin === "Guilherme") {
        ID_PROFISSIONAL_LOGADO = 4;
    }

    console.log("ID do profissional:", ID_PROFISSIONAL_LOGADO);
}

// chama a função
descobrirBarbeiro();




btnIndisponivel.addEventListener('click', async () => {

    console.log("Ficar Indisponível");

    try {

        const res = await fetch(`https://barbearia-chaplinofc-production.up.railway.app/api/profissionais/${ID_PROFISSIONAL_LOGADO}/indisponivel`, {
            method: "PUT"
        });

        if (!res.ok) throw new Error("Erro ao mudar status");

        // 🔥 Atualiza UI
        btnDisponivel.classList.remove("Hidden");
        btnIndisponivel.classList.add("Hidden");
        barbeiroStatusMenu.classList.add("Indisponivel");
        barbeiroStatusMenu.classList.remove("Disponivel");

    } catch (err) {
        console.error("Erro:", err);
    }

});



btnDisponivel.addEventListener('click', async () => {

    console.log("Ficar Disponivel");

    try {

        const res = await fetch(`https://barbearia-chaplinofc-production.up.railway.app/api/profissionais/${ID_PROFISSIONAL_LOGADO}/disponivel`, {
            method: "PUT"
        });

        if (!res.ok) throw new Error("Erro ao mudar status");

        // 🔥 Atualiza UI
        console.log("Ficar Disponivel")
        btnIndisponivel.classList.remove("Hidden");
        btnDisponivel.classList.add("Hidden");
        barbeiroStatusMenu.classList.remove("Indisponivel")


    } catch (err) {
        console.error("Erro:", err);
    }


});







async function atualizarFila() {
    const filaContainer = document.getElementById('filaBarbeiro');
    const nomeBarbeiroElem = document.querySelector('.NomeBarbeiro');
    if (!filaContainer || !nomeBarbeiroElem) return;

    const nomeBarbeiro = nomeBarbeiroElem.textContent.trim();

    try {
        const response = await fetch(`${URL_BASE}/api/clientes`);
        const clientes = await response.json();

        const filtrados = clientes.filter(c => {
            const p = (c.profissional || "").toLowerCase();
            const alvo = nomeBarbeiro.toLowerCase();
            return p === alvo || p === 'nenhum' || p === '';
        });

        let htmlGerado = "";
        if (filtrados.length === 0) {
            htmlGerado = '<h6 id="textoApagavel">Sem Clientes Na Fila</h6>';
        } else {
            filtrados.forEach(cliente => {
                // --- AJUSTE AQUI: Verifica o status do banco ---
                const estaAtendendo = cliente.status === "EM_ATENDIMENTO";

                // Adiciona uma classe extra se estiver atendendo para a borda branca
                const classeCard = estaAtendendo ? "ClienteCardBox AtendendoAgora" : "ClienteCardBox";
                const hiddenAtender = estaAtendendo ? "Hidden" : "";
                const hiddenFinalizar = estaAtendendo ? "" : "Hidden";

                htmlGerado += `
                <div class="${classeCard}">
                    <div class="ClienteNome">
                        <div class="BoxIMG"><img src="assets/icons8-usuário-24.png" alt="user png"></div>
                        <div class="text1212">${cliente.nome}</div> </div>
                    <div class="ServicoCliente">
                        <span>${cliente.servico}</span>
                        <span id="profissionalEscolhido">${cliente.profissional}</span>
                        <span class="text1212">${cliente.tempo} min</span>
                    </div>
                    <div class="BtnClienteGerenciamento">
                        <a id="LinkNumberCliente" href="https://wa.me/${cliente.numero}">
                            <img src="assets/logo-whatsapp-branco-png-icone-whatsapp-png-branco-11562849301ohgxjt9m7x-removebg-preview.png">
                            Mensagem
                        </a>
                        
                        <button class="ChamarFinalizarCliente ${hiddenAtender}" data-id="${cliente.id}">Atender</button>
                        <button class="FinalizarCliente ${hiddenFinalizar}" data-id="${cliente.id}">Finalizar</button>
                    </div>
                </div>`;
            });
        }

        filaContainer.innerHTML = htmlGerado;

    } catch (erro) {
        console.error("Erro na API:", erro);
    }
}
// ESCUTADOR DE CLIQUES (Delegação de Eventos)
document.addEventListener('click', async (event) => {
    const target = event.target;

    // Lógica do botão ATENDER
    if (target.classList.contains('ChamarFinalizarCliente')) {
        const id = target.getAttribute('data-id');
        try {
            const res = await fetch(`${URL_BASE}/api/clientes/chamar/${id}/${ID_PROFISSIONAL_LOGADO}`, { method: 'PUT' });
            if (res.ok) {
                target.classList.add('Hidden');
                target.parentElement.querySelector('.FinalizarCliente').classList.remove('Hidden');
                console.log("Atendimento iniciado");
            }
        } catch (e) { console.error(e); }
    }

    // Lógica do botão FINALIZAR
    if (target.classList.contains('FinalizarCliente')) {
        const id = target.getAttribute('data-id');
        if (!confirm("Finalizar atendimento?")) return;
        try {
            const res = await fetch(`${URL_BASE}/api/clientes/finalizar/${id}/${ID_PROFISSIONAL_LOGADO}`, { method: 'DELETE' });
            if (res.ok) {
                alert("Finalizado!");
                atualizarFila();
            }
        } catch (e) { console.error(e); }
    }
    aplicarStatusFinal();
});

// Início







function aplicarStatusFinal() {

    const boxes = {
        gabriel: document.querySelector("#gabrielBox2"),
        pedro: document.querySelector("#pedrobox2"),
        ramon: document.querySelector("#ramonBox2"),
        guilherme: document.querySelector("#guilhermeBox2")
    };

    fetch("https://barbearia-chaplinofc-production.up.railway.app/api/profissionais")
        .then(res => res.json())
        .then(lista => {

            lista.forEach(p => {

                const nome = (p.nome || "").toLowerCase().trim();
                const box = boxes[nome];

                console.log("Nome:", nome, "Status:", p.status, "Box:", box);

                aplicarStatus(box, p.status);
            });

        })
        .catch(err => {
            console.error("Erro ao buscar profissionais:", err);
        });


    // 🔥 FUNÇÃO ÚNICA
    function aplicarStatus(box, status) {
        if (!box) return;

        if (status === "INDISPONIVEL") {
            btnDisponivel.classList.remove("Hidden");
            btnIndisponivel.classList.add("Hidden");
            box.style.border = "1px solid red";
        } else if (status === "DISPONIVEL") {
            btnIndisponivel.classList.remove("Hidden");
            btnDisponivel.classList.add("Hidden");
            box.style.border = "1px solid black";
        } else if (status === "ATENDENDO") {
            box.style.border = "1px solid white";
        }
    }





}









const btnTema = document.getElementById('btn-tema');
const btnAtualizar = document.getElementById('btn-atualizar');

// Lógica de Trocar o Plano de Fundo
btnTema.addEventListener('click', () => {
    // Alterna a classe 'tema-glass' no body
    document.body.classList.toggle('tema-glass');

    // Salva a escolha para não resetar quando der F5
    const modoGlass = document.body.classList.contains('tema-glass');
    localStorage.setItem('preferencia-fundo', modoGlass ? 'glass' : 'escuro');
});

// Lógica de Atualizar a Fila (O comando pro Railway)
btnAtualizar.addEventListener('click', async () => {
    // Feedback visual de carregando
    btnAtualizar.innerText = "⏳...";

    // Chama a função que você já tem para buscar o status
    await atualizarFila();
    console.log("Funcionou");

    // Volta o texto original depois de 1 segundo
    setTimeout(() => {
        btnAtualizar.innerHTML = "🔄 <span class='texto-botao'>Atualizar Fila</span>";
    }, 1000);
});

// Ao carregar a página, verifica se o cara já tinha escolhido um fundo antes
window.onload = () => {
    const salvo = localStorage.getItem('preferencia-fundo');
    if (salvo === 'glass') {
        document.body.classList.add('tema-glass');
    }
    atualizarFila(); // Carrega o status inicial
};




// Executa assim que a página carrega
window.addEventListener('load', () => {
    atualizarFila();
    // Se você tiver a função de atualizar os cards de status dos colegas:
    // atualizarStatusBarbeiros();
});


