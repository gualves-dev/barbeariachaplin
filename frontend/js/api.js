// Função que roda assim que a página carrega

async function inicializarPainelCliente() {
    const filaContainer = document.getElementById("fila");


    const statusResponse = await fetch("https://barbearia-chaplinofc-production.up.railway.app/api/status");
    const isAbeto = await statusResponse.json();
    const statusH5 = document.querySelector(".BarberInfoBox h5");
    const bordaBarbearia = document.querySelector(".BarberInfoBox");

    if (isAbeto) {
        statusH5.innerHTML = "⚪ ABERTO";
        statusH5.style.color = "white"; // Ou a cor que preferir
        bordaBarbearia.style.border = "1px solid white";
    } else {
        statusH5.innerHTML = "🔴 FECHADO";
        statusH5.style.color = "red";
        bordaBarbearia.style.border = "1px solid red";
    }

    const gabrielBox = document.querySelector("#gabrielBoxFila");
    const pedroBox = document.querySelector("#pedroBoxFila");
    const ramonBox = document.querySelector("#ramonFila");
    const guilhermeBox = document.querySelector("#guilhermeBoxFila");





    fetch("https://barbearia-chaplinofc-production.up.railway.app/api/profissionais")
        .then(res => res.json())
        .then(lista => {

            lista.forEach(p => {
                console.log(p.nome + " - " + p.status);

                if (p.nome === "Gabriel" && p.status === "INDISPONIVEL") {

                    gabrielBox.style.border = "1px solid red";
                }
                else if (p.nome === "Gabriel" && p.status === "DISPONIVEL") {

                    gabrielBox.style.border = "1px solid black";
                }
                else if (p.nome === "Gabriel" && p.status === "ATENDENDO") {

                    gabrielBox.style.border = "1px solid white";
                } // Pedro
                else if (p.nome === "Pedro" && p.status === "INDISPONIVEL") {

                    pedroBox.style.border = "1px solid red";
                }
                else if (p.nome === "Pedro" && p.status === "DISPONIVEL") {

                    pedroBox.style.border = "1px solid black";
                }
                else if (p.nome === "Pedro" && p.status === "ATENDENDO") {

                    pedroBox.style.border = "1px solid white";
                } // Ramon

                else if (p.nome === "Ramon" && p.status === "INDISPONIVEL") {

                    ramonBox.style.border = "1px solid red";
                }
                else if (p.nome === "Ramon" && p.status === "DISPONIVEL") {

                    ramonBox.style.border = "1px solid black";
                }
                else if (p.nome === "Ramon" && p.status === "ATENDENDO") {

                    ramonBox.style.border = "1px solid white";
                }//Guilherme

                else if (p.nome === "Guilherme" && p.status === "INDISPONIVEL") {

                    guilhermeBox.style.border = "1px solid red";
                }
                else if (p.nome === "Guilherme" && p.status === "DISPONIVEL") {

                    guilhermeBox.style.border = "1px solid black";
                }
                else if (p.nome === "Guilherme" && p.status === "ATENDENDO") {

                    guilhermeBox.style.border = "1px solid white";
                }

            });

        });


    try {
        // 1. Busca todos os clientes no seu Java
        const response = await fetch("https://barbearia-chaplinofc-production.up.railway.app/api/clientes");
        const clientes = await response.json();

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
                                    class="CloackClienteIMG"><img src="assets/icons8-clock-250.png" alt=""><span
                                        class="text1212" id="tempoCliente">${cliente.tempo} min</span></span></span> </div>
                </div>
            `;

            // 🔥 pega o elemento interno do card
            const box = card.querySelector(".ClienteCardBox");

            // 🔥 aplica estilo baseado no status
            if (cliente.status === "EM_ATENDIMENTO") {
                box.style.border = "2px solid white";
            } else {
                box.style.border = "2px solid black";
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
        const res = await fetch("https://barbearia-chaplinofc-production.up.railway.app/api/clientes/entrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!res.ok) throw new Error("Erro ao salvar no banco");

        alert("✅ Agendamento feito com sucesso!");

        // 🔥 O PULO DO GATO:
        // Após salvar, chamamos a função que busca tudo do banco de novo
        // e reconstrói as caixinhas e contadores na tela do cliente.
        inicializarPainelCliente(); 

        // Limpa o formulário e fecha o modal (opcional)
        document.getElementById("formAgendamento").reset();
        document.getElementById("hidden2").classList.add("Hidden"); 

    } catch (err) {
        console.error("Erro no agendamento:", err);
        alert("Erro ao conectar com o servidor.");
    }
});




async function atualizarDashboardGeral() {
    try {
        const response = await fetch(`https://barbearia-chaplinofc-production.up.railway.app/api/clientes`);
        const clientes = await response.json();

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

// Chamar a cada 30 segundos junto com a fila
setInterval(atualizarDashboardGeral, 30000);
window.addEventListener('load', atualizarDashboardGeral);