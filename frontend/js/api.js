// Função que roda assim que a página carrega
const URL_BASE =  "https://barbearia-chaplinofc-production.up.railway.app"; //"http://localhost:8080";  "https://barbearia-chaplinofc-production.up.railway.app"


async function inicializarPainelCliente() {
    const filaContainer = document.getElementById("fila");

    // https://barbearia-chaplinofc-production.up.railway.app


    const statusResponse = await fetch(`${URL_BASE}/api/status`);
    const isAbeto = await statusResponse.json();
    const statusH5 = document.querySelector(".BarberInfoBox h5");
    const bordaBarbearia = document.querySelector(".BarberPoleContainer");
    const btnComeIn = document.querySelector("#entrarNaFila1");

    if (isAbeto) {
        statusH5.innerHTML = "ABERTO";
        statusH5.style.color = "Green"; // Ou a cor que preferir
    } else {
        statusH5.innerHTML = "FECHADO";
        statusH5.style.color = "red";
        bordaBarbearia.classList.add("BordaStatusPretoEBranco")
        btnComeIn.style.backgroundColor = "white";
        btnComeIn.style.color = "Black";
        btnComeIn.style.animation = "none";
        btnComeIn.textContent = "fila fechada";


    }

    const gabrielBox = document.querySelector("#gabrielBoxFila");
    const pedroBox = document.querySelector("#pedroBoxFila");
    const ramonBox = document.querySelector("#ramonFila");
    const guilhermeBox = document.querySelector("#guilhermeBoxFila");


    // Texto Status

    const textoGabriel = document.getElementById("textoStatusGabriel");
    const textoPedro = document.getElementById("textoStatusPedro");
    const textoRamon = document.getElementById("textoStatusRamon");
    const textoGuilherme = document.getElementById("textoStatusGuilherme");






    fetch(`${URL_BASE}/api/profissionais`)
        .then(res => res.json())
        .then(lista => {

            lista.forEach(p => {
                console.log(p.nome + " - " + p.status);

                if (p.nome === "Gabriel" && p.status === "INDISPONIVEL") {
                    gabrielBox.style.border = "2px solid red";
                    textoGabriel.textContent = "Indisponivel";
                    textoGabriel.style.color = "red";
                }
                else if (p.nome === "Gabriel" && p.status === "DISPONIVEL") {
                    gabrielBox.style.border = "1px solid black";
                    textoGabriel.textContent = "Livre";
                    textoGabriel.style.color = "green";

                }
                else if (p.nome === "Gabriel" && p.status === "ATENDENDO") {
                    gabrielBox.style.border = "1px solid black";
                    textoGabriel.textContent = "Em Atendimento";
                    textoGabriel.style.color = "orange";
                }
                else if (p.nome === "Gabriel" && p.status === "REFEICAO") {
                    gabrielBox.style.border = "1px solid black";
                    textoGabriel.textContent = "Intervalo (Refeiçao)";
                    textoGabriel.style.fontSize = "10px";
                    textoGabriel.style.color = "purple";
                }


                // Pedro
                else if (p.nome === "Pedro" && p.status === "INDISPONIVEL") {
                    pedroBox.style.border = "2px solid red";
                    textoPedro.textContent = "Indisponivel";
                    textoPedro.style.color = "red";

                }
                else if (p.nome === "Pedro" && p.status === "DISPONIVEL") {
                    pedroBox.style.border = "1px solid black";
                    textoPedro.textContent = "Livre";
                    textoPedro.style.color = "green";
                }
                else if (p.nome === "Pedro" && p.status === "ATENDENDO") {
                    pedroBox.style.border = "1px solid black";
                    textoPedro.textContent = "Em Atendimento";
                    textoPedro.style.color = "orange";
                }
                else if (p.nome === "Pedro" && p.status === "REFEICAO") {
                    pedroBox.style.border = "1px solid black";
                    textoPedro.textContent = "Intervalo (Refeiçao)";
                    textoPedro.style.fontSize = "10px"
    
                    textoPedro.style.color = "purple";
                }
                // Ramon

                else if (p.nome === "Ramon" && p.status === "INDISPONIVEL") {

                    ramonBox.style.border = "2px solid red";
                    textoRamon.textContent = "Indisponivel";
                    textoRamon.style.color = "red";
                }
                else if (p.nome === "Ramon" && p.status === "DISPONIVEL") {
                    ramonBox.style.border = "1px solid black";
                    textoRamon.textContent = "Livre";
                    textoRamon.style.color = "green";
                }
                else if (p.nome === "Ramon" && p.status === "ATENDENDO") {
                    ramonBox.style.border = "1px solid black";
                    textoRamon.textContent = "Em Atendimento";
                    textoRamon.style.color = "orange";
                }
                else if (p.nome === "Ramon" && p.status === "REFEICAO") {
                    ramonBox.style.border = "1px solid black";
                    textoRamon.textContent = "Intervalo (Refeiçao)";
                    textoRamon.style.fontSize = "10px"
                    textoRamon.style.color = "purple";
                }

                //Guilherme

                else if (p.nome === "Guilherme" && p.status === "INDISPONIVEL") {

                    guilhermeBox.style.border = "2px solid red";
                    textoGuilherme.textContent = "Indisponivel";
                    textoGuilherme.style.color = "red";
                }
                else if (p.nome === "Guilherme" && p.status === "DISPONIVEL") {
                    guilhermeBox.style.border = "1px solid black";

                    textoGuilherme.textContent = "Livre";
                    textoGuilherme.style.color = "green";
                }
                else if (p.nome === "Guilherme" && p.status === "ATENDENDO") {
                    guilhermeBox.style.border = "1px solid black";
                    textoGuilherme.textContent = "Em Atendimento";
                    textoGuilherme.style.color = "orange";
                }
                else if (p.nome === "Guilherme" && p.status === "REFEICAO") {
                    guilhermeBox.style.border = "1px solid black";
                    textoGuilherme.textContent = "Intervalo (Refeiçao)";
                    textoGuilherme.style.fontSize = "10px"
                    textoGuilherme.style.color = "purple";
                }

            });

        });


    try {
        // 1. Busca todos os clientes no seu Java
        const response = await fetch(`${URL_BASE}/api/clientes`);
        const clientes = await response.json();


        const idLogado = localStorage.getItem("ID_CLIENTE_CHAPLIN");
        const boxPosicao = document.getElementById("statusPosicaoCliente");
        const textoPosicao = document.getElementById("numeroPosicao");

        if (idLogado && clientes.length > 0) {
            // Procura o índice do cliente na lista pelo ID
            // Usamos +1 porque o array começa no 0, mas a posição na fila começa no 1
            const posicao = clientes.findIndex(c => String(c.id) === String(idLogado)) + 1;

            if (posicao > 0) {
                boxPosicao.style.display = "block"; // Mostra o contador
                textoPosicao.textContent = `${posicao}º`; // Ex: 3º
            } else {
                // Se o ID existe mas não está na lista, ele já foi atendido ou removido
                boxPosicao.style.display = "none";
                localStorage.removeItem("ID_CLIENTE_CHAPLIN");
            }
        } else {
            boxPosicao.style.display = "none";
        }

        // 2. Limpa a mensagem de "Nenhuma pessoa na fila"
        filaContainer.innerHTML = "";

        // 3. Criar contadores para os barbeiros
        let contagem = { gabriel: 0, pedro: 0, ramon: 0, guilherme: 0, nenhum: 0 };
        let tempoTotal = { gabriel: 0, pedro: 0, ramon: 0, guilherme: 0 };


        // 4. Desenhar a Fila e Contar
        clientes.forEach(cliente => {
            const prof = cliente.profissional.toLowerCase();

            // Incrementa contadores
            if (contagem.hasOwnProperty(prof)) {
                contagem[prof]++;
                tempoTotal[prof] += parseInt(cliente.tempo || 30);

            }

            // Cria o card simples para o CLIENTE ver na fila
            const card = document.createElement("div");
            card.className = "Filadiv"; // Usa sua classe de estilo
            card.innerHTML = ` <div class="ClienteCardBox">
                                    <div class="ClienteNome">
                            <div class="BoxIMG"><img src="assets/icons8-usuário-24.png" alt="user png"></div>
                            <div class="text1212">${cliente.nome}</div>
                        </div>

                        <div class="ServicoCliente"><span id="servicocliente">${cliente.servico}</span><span
                                id="profissionalEscolhido">${cliente.profissional}</span> <span class="TimeBoxCliente"><span
                                    class="CloackClienteIMG"><img src="assets/icons8-relógio-30.png" alt=""><span
                                        class="text1212" id="tempoCliente">${cliente.tempo} min</span></span></span> </div>
                </div>
            `;

            // 🔥 pega o elemento interno do card
            const box = card.querySelector(".ClienteCardBox");

            // 🔥 aplica estilo baseado no status
            if (cliente.status === "EM_ATENDIMENTO") {
                box.style.border = "3px solid orange";
            } else {
                box.style.border = "1px solid black";
            }

            filaContainer.appendChild(card);

        });

        // Se a fila estiver vazia após o fetch, volta o texto original
        if (clientes.length === 0) {
            filaContainer.innerHTML = "<h6>Nenhuma pessoa na fila no momento</h6>";
        }

    } catch (error) {
        console.error("Erro ao carregar fila inicial:", error);
    }


    // --- ADICIONE ISSO AQUI NO FINAL ---
    const idLogado = localStorage.getItem("ID_CLIENTE_CHAPLIN");
    const btnSair = document.getElementById("sairDaFila");

    if (idLogado && btnSair) {
        // Se existe um ID salvo, o botão deve aparecer mesmo após o F5
        btnSair.classList.remove("Hidden");
    } else if (btnSair) {
        // Se não tem ID, garante que o botão fique escondido
        btnSair.classList.add("Hidden");
    }
}
// 6. Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", inicializarPainelCliente);





// Enviar Dados para o Back end

document.getElementById("formAgendamento").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;

    const number = document.getElementById("telefone").value;

    // 🔥 PROFISSIONAL
    const profissionalSelecionado = document.querySelector('input[name="profissional"]:checked');

    if (!profissionalSelecionado) {
        alert("Escolha um profissional!");
        return;
    }

    const profissional = profissionalSelecionado.value;

    // 🔥 SERVIÇOS
    const checkboxes = document.querySelectorAll('input[name="servico"]:checked');

    if (checkboxes.length === 0) {
        alert("Escolha pelo menos um serviço!");
        return;
    }

    let tempoTotal = 0;
    let servicosSelecionados = [];

    checkboxes.forEach(cb => {
        tempoTotal += parseInt(cb.value);
        servicosSelecionados.push(cb.parentElement.textContent.trim());
    });

    // 🔥 OBJETO FINAL
    const cliente = {
        nome: nome,
        profissional: profissional,
        servico: servicosSelecionados.join(" + "),
        tempo: tempoTotal,
        numero: number
    };

    console.log(cliente);

    try {
        const res = await fetch(`${URL_BASE}/api/clientes/entrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!res.ok) throw new Error("Barbeiro Indisponivel");

        const clienteSalvo = await res.json();
        localStorage.setItem("ID_CLIENTE_CHAPLIN", clienteSalvo.id); // Salva o ID no PC do cliente

        console.log(clienteSalvo);

        alert("✅ Agendamento feito com sucesso!");

        const btnSairDaFila = document.getElementById("sairDaFila");
        if (btnSairDaFila) {
            btnSairDaFila.classList.remove("Hidden");
        }

        // 🔥 O PULO DO GATO:
        // Após salvar, chamamos a função que busca tudo do banco de novo
        // e reconstrói as caixinhas e contadores na tela do cliente.
        inicializarPainelCliente();

        // Limpa o formulário e fecha o modal (opcional)
        document.getElementById("formAgendamento").reset();
        document.getElementById("hidden2").classList.add("Hidden");

    } catch (err) {
        console.error("Erro no agendamento:", err);
        alert("Barbeiro Indisponivel.");
    }

    atualizarDashboardGeral();
});








async function atualizarDashboardGeral() {
    try {
        const response = await fetch(`${URL_BASE}/api/clientes`);
        const clientes = await response.json();


        // --- ADICIONE ESTA LINHA AQUI ---
        // Pega o elemento onde você quer mostrar o texto (crie um ID no HTML chamado 'totalFilaGeral')
        const elemTotalGeral = document.querySelector('#contadorFila');
        if (elemTotalGeral) {
            elemTotalGeral.textContent = `${clientes.length}`;
        }
        // -------------------------------

        const status = {
            "Gabriel": { qtd: 0, tempo: 0 },
            "Pedro": { qtd: 0, tempo: 0 },
            "Ramon": { qtd: 0, tempo: 0 },
            "Guilherme": { qtd: 0, tempo: 0 }
        };

        let tempoTotalEmpresa = 0;

        clientes.forEach(c => {
            // Ajusta o nome para bater com as chaves do objeto acima
            const nomeProf = c.profissional.charAt(0).toUpperCase() + c.profissional.slice(1).toLowerCase();
            if (status[nomeProf]) {
                status[nomeProf].qtd++;
                status[nomeProf].tempo += Number(c.tempo);
            }
            tempoTotalEmpresa += Number(c.tempo);
        });

        for (let barbeiro in status) {
            // Atualiza os Números de Clientes
            const elemQtd = document.getElementById(`filaNumber${barbeiro}`);
            if (elemQtd) elemQtd.textContent = status[barbeiro].qtd;

            // Atualiza os Minutos
            const elemTempo = document.getElementById(`${barbeiro.toLowerCase()}StatusText`);
            if (elemTempo) elemTempo.textContent = ` ${status[barbeiro].tempo} min`;

            // ATENÇÃO: Lógica para as cores dos Boxes baseada nos seus IDs específicos
            let boxId = `${barbeiro.toLowerCase()}BoxFila`;
            if (barbeiro === "Ramon") boxId = "ramonFila"; // Ajuste para o seu ID diferente

            const boxElem = document.getElementById(boxId);
            if (boxElem) {
                boxElem.classList.remove('Atendendo', 'Aguardando', 'Indisponivel');

                // Regra de cores da sua legenda:
                if (status[barbeiro].qtd > 0) {
                    boxElem.classList.add('Atendendo'); // ⚪ Branco
                } else {
                    boxElem.classList.add('Indisponivel'); // 🔴 Vermelho
                }
            }
        }

        // Tempo Médio Geral da Fila
        const mediaGeral = clientes.length > 0 ? Math.round(tempoTotalEmpresa / clientes.length) : 0;
        const elemMedia = document.getElementById('tempoMedioTextFila');
        if (elemMedia) elemMedia.textContent = `${mediaGeral} min`;

    } catch (erro) {
        console.error("Erro no Dashboard:", erro);
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
    await inicializarPainelCliente();
    await atualizarDashboardGeral();
    console.log("Funcionou");

    // Volta o texto original depois de 1 segundo
    setTimeout(() => {
        btnAtualizar.innerHTML = "🔄 <span class='texto-botao'>Atualizar Fila</span>";
    }, 1000);
});

 async function desistirDaFila() {
    // 1. Pega o ID que salvamos quando o cliente entrou na fila
    const idCliente = localStorage.getItem("ID_CLIENTE_CHAPLIN");

    // 2. Se não tiver ID, nem tenta (segurança)
    if (!idCliente) {
        alert("Erro: ID de agendamento não encontrado.");
        return;
    }

    // 3. Confirmação para o cliente não clicar sem querer
    if (confirm("Deseja realmente sair da fila?")) {
        try {
            // 4. Faz a chamada DELETE para o seu Backend Java
            const res = await fetch(`${URL_BASE}/api/clientes/sair/${idCliente}`, {
                method: "DELETE"
            });

            if (res.ok) {
                // SUCESSO!
                alert("Você foi removido da fila com sucesso!");

                // 5. Limpa o "rastro" do cliente no navegador
                localStorage.removeItem("ID_CLIENTE_CHAPLIN");

                // 6. Esconde o botão de sair novamente
                const btnSair = document.getElementById("sairDaFila");
                if (btnSair) btnSair.classList.add("Hidden");

                // 7. Atualiza a tela para sumir o nome dele da lista
                inicializarPainelCliente(); 
                atualizarDashboardGeral();

            } else {
                // Caso o Java retorne erro (ex: 404 ou 500)
                const msgErro = await res.text();
                alert("Não foi possível sair: " + msgErro);
            }

        } catch (err) {
            // Caso o servidor esteja fora do ar ou sem internet
            console.error("Erro na conexão:", err);
            alert("Erro de conexão com o servidor.");
        }
    }
}






// Ao carregar a página, verifica se o cara já tinha escolhido um fundo antes
window.onload = () => {
    const salvo = localStorage.getItem('preferencia-fundo');
    if (salvo === 'glass') {
        document.body.classList.add('tema-glass');
    }
    inicializarPainelCliente(); // Carrega o status inicial
    atualizarDashboardGeral();
};



