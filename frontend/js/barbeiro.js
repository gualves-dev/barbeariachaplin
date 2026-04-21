

// BarbeiroMenuStatus 1 a 20

const btnIndisponivel = document.querySelector(".MudarStatusProfissional");
const btnDisponivel = document.querySelector(".MudarStatusProfissionalDisponivel");
const barbeiroStatusMenu = document.querySelector(".BarbeiroMenuStatus");



// Cliente Box Config 25 a


const clienteBox = document.querySelector(".ClienteCardBox");
const chamarCliente = document.querySelector(".ChamarFinalizarCliente");
const finalizarCliente = document.querySelector(".FinalizarCliente");


chamarCliente.addEventListener('click', () => {

    console.log("Chamar Cliente");
    chamarCliente.classList.add("Hidden");
    finalizarCliente.classList.remove("Hidden");
    clienteBox.classList.add("Atendendo");
    barbeiroStatusMenu.classList.add("Atendendo");

});

finalizarCliente.addEventListener('click', () => {

    console.log("Finalizar Cliente");
    clienteBox.classList.remove("Atendendo");
    barbeiroStatusMenu.classList.remove("Atendendo");


});




// Barbearia Status Config  




const barbeariaStatusMainBox = document.querySelector(".BarbeariaStatusMainBox");














// js/barbeiro.js

// 1. Configurações Iniciais e Seleção de Elementos
const nomeBarbeiroLogado = "Gabriel"; // Pega o nome do barbeiro atual
const filaContainer = document.getElementById('filaBarbeiro');
const contadorFila = document.querySelector('.Legenda span');
const textoVazio = document.getElementById('textoApagavel');

// Botões de Status do Barbeiro
const btnFicarIndisponivel = document.querySelector('.MudarStatusProfissional');
const btnFicarDisponivel = document.querySelector('.MudarStatusProfissionalDisponivel');
const cardStatusBarbeiro = document.querySelector('.BarbeiroMenuStatus');

// Botões de Status da Barbearia
const btnFecharBarbearia = document.querySelector('.FecharBarbearia');
const btnAbrirBarbearia = document.querySelector('.AbrirBarbearia');

// --- 2. Lógica de Status do Barbeiro ---

function alterarStatusBarbeiro(disponivel) {
    if (disponivel) {
        btnFicarIndisponivel.classList.remove('Hidden');
        btnFicarDisponivel.classList.add('Hidden');
        cardStatusBarbeiro.classList.remove('Indisponivel');
        console.log("Status: Disponível");
    } else {
        btnFicarIndisponivel.classList.add('Hidden');
        btnFicarDisponivel.classList.remove('Hidden');
        cardStatusBarbeiro.classList.add('Indisponivel');
        console.log("Status: Indisponível");
    }
    // Aqui você chamaria sua API para atualizar no banco
    // api.post('/barbeiro/status', { nome: nomeBarbeiroLogado, status: disponivel });
}

btnFicarIndisponivel.addEventListener('click', () => alterarStatusBarbeiro(false));
btnFicarDisponivel.addEventListener('click', () => alterarStatusBarbeiro(true));
const bordaBarbearia = document.querySelector(".BarbeariaStatusMainBox");

// --- 3. Lógica de Status da Barbearia ---

btnFecharBarbearia.addEventListener('click', () => {
    alert("ATENÇAO VEREFICAR SE CHAVE MANUAL ATIVA")
    btnFecharBarbearia.classList.add('Hidden');
    btnAbrirBarbearia.classList.remove('Hidden');
    bordaBarbearia.style.border = "2px solid red";
    
});

btnAbrirBarbearia.addEventListener('click', () => {
    btnAbrirBarbearia.classList.add('Hidden');
    btnFecharBarbearia.classList.remove('Hidden');
    bordaBarbearia.style.border = "1px solid black";

});

// --- 4. Gerenciamento da Fila (Atender e Finalizar) ---

// Função para renderizar a fila (Simulando o que viria da API)
function renderizarFila(clientes) {
    // Filtragem: Apenas clientes para este barbeiro ou sem preferência
    const clientesFiltrados = clientes.filter(c =>
        c.profissional === nomeBarbeiroLogado || c.profissional === "Sem preferência"
    );

    filaContainer.innerHTML = ''; // Limpa a fila antes de renderizar

    if (clientesFiltrados.length === 0) {
        textoVazio.style.display = 'block';
        contadorFila.innerText = ' 0';
        return;
    }

    textoVazio.style.display = 'none';
    contadorFila.innerText = ` ${clientesFiltrados.length}`;

    clientesFiltrados.forEach(cliente => {
        const card = document.createElement('div');
        card.className = 'ClienteCardBox';
        card.innerHTML = `
            <div class="ClienteNome">
                <div class="BoxIMG"><img src="assets/icons8-usuário-24.png" alt="user"></div>
                <div class="text1212">${cliente.nome}</div>
            </div>
            <div class="ServicoCliente">
                <span>${cliente.servico}</span>
                <span>${cliente.profissional}</span>
                <span class="TimeBoxCliente">
                    <span class="CloackClienteIMG">
                        <img src="assets/icons8-clock-250.png">
                        <span class="text1212">${cliente.tempo} min</span>
                    </span>
                </span>
            </div>
            <div class="BtnClienteGerenciamento">
                <a href="https://wa.me/${cliente.telefone}" target="_blank">Mensagem</a>
                <button class="ChamarFinalizarCliente" onclick="iniciarAtendimento(this, ${cliente.id})">Atender</button>
                <button class="FinalizarCliente Hidden" onclick="finalizarAtendimento(this, ${cliente.id})">Finalizar</button>
            </div>
        `;
        filaContainer.appendChild(card);
    });
}

// 5. Funções de Ação (Conexão com seu Backend Java)
function iniciarAtendimento(botaoAtender, clienteId) {
    const card = botaoAtender.closest('.ClienteCardBox');
    const botaoFinalizar = card.querySelector('.FinalizarCliente');

    // Troca os botões visualmente
    botaoAtender.classList.add('Hidden');
    botaoFinalizar.classList.remove('Hidden');
    card.classList.add('Atendendo');

    console.log(`API: Mudando status do cliente ${clienteId} para EM_ATENDIMENTO`);
    // Exemplo de chamada API:
    // fetch(`/api/atendimento/iniciar/${clienteId}`, { method: 'POST' });
}

function finalizarAtendimento(botaoFinalizar, clienteId) {
    const card = botaoFinalizar.closest('.ClienteCardBox');
    
    // Efeito visual de saída
    card.style.opacity = '0';
    setTimeout(() => {
        card.remove();
        console.log(`API: Finalizando cliente ${clienteId} e removendo da fila`);
        // Aqui chamaria o backend para deletar/finalizar
        // fetch(`/api/atendimento/finalizar/${clienteId}`, { method: 'DELETE' });
    }, 500);
}



document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        console.log("Página em segundo plano: Pausando processos...");
        // Aqui você poderia parar timers, se tivesse algum.
    } else {
        console.log("Página visível novamente: Atualizando dados...");
        // Quando o usuário volta para a aba, o site atualiza a fila sozinho uma única vez
        renderizarFila();

}});



const btnVerQrCode = document.querySelector(".BTNQrCode");
const btnVerLinks = document.querySelector(".BTNCopiarLink");

const btnEsconderQrcode = document.querySelector("#fecharQrCodeBox");
const btnEsconderLinks = document.querySelector("#fecharLinksBox");

const btnCopiarLinkBarbearia = document.querySelector("#linkBarbeariaBTN");
const btnCopiarLinkPessoal = document.querySelector("#linkPessoalBTN");

const QrcodeBox = document.querySelector(".QrCodeBox");
const LinksBox = document.querySelector(".CopiarLinkBox");

const linkBarbearia = "https://barbeariachaplin.vercel.app";


btnVerQrCode.addEventListener('click', () =>{
    console.log("clicou");
    QrcodeBox.removeAttribute("id");
});

btnVerLinks.addEventListener('click', () =>{
    console.log("clicou");
    LinksBox.removeAttribute("id");
});

btnEsconderLinks.addEventListener('click', () =>{
    console.log("clicou");
    LinksBox.id = "hidden";
});

btnEsconderQrcode.addEventListener('click', () =>{
    console.log("clicou");
    QrcodeBox.id = "hidden";
});

btnCopiarLinkBarbearia.addEventListener('click', () =>{
    navigator.clipboard.writeText(linkBarbearia).then(() => {
        // Feedback visual para o barbeiro saber que funcionou
        alert("Link da Barbearia copiado!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
    });
});

btnCopiarLinkPessoal.addEventListener('click', () =>{
    console.log("clicou");
    // Pega a URL exata que está aberta no navegador
    const urlAtual = window.location.href;

    navigator.clipboard.writeText(urlAtual).then(() => {
        // Feedback visual (pode ser um alert ou mudar o texto do botão)
        alert("Link da página atual copiado!");
        console.log("URL copiada: " + urlAtual);
    }).catch(err => {
        console.error("Erro ao copiar link: ", err);
        alert("Ops! Não conseguimos copiar o link automaticamente.");
    });
});


    const btnConfigTime = document.querySelector(".ConfiguracaoDeHorario");
    const btnConfigTimeClose = document.querySelector("#closeConfTime");
    const cardConfigTimeBox = document.querySelector(".card-configuracao");
    const BoxConfig = document.querySelector(".BoxSwitchesMain");


    btnConfigTime.addEventListener('click', () =>{
       
        BoxConfig.removeAttribute("id");
    });

    btnConfigTimeClose.addEventListener('click', () =>{
        cardConfigTimeBox.id = "hidden";
    });

    const closeTimeCofingBox = document.querySelector("#closeConfigTime");

    closeTimeCofingBox.addEventListener('click', () =>{
        BoxConfig.id = "hidden"




    }) ;




    // --- SELEÇÃO DE ELEMENTOS ---
const chkManual = document.getElementById('chk');        // Switch Manual
const chkProgramado = document.getElementById('chk2');   // Switch Programado
const chkAutomatico = document.getElementById('chk3');   // Switch Automático

const btnAbrir = document.querySelector(".AbrirBarbearia");
const btnFechar = document.querySelector(".FecharBarbearia");
const boxMain = document.querySelector(".BarbeariaStatusMainBox");

const inputData = document.getElementById('inputData');
const inputAbre = document.getElementById('inputAbre');
const inputFecha = document.getElementById('inputFecha');
const statusInfo = document.getElementById('statusAgendamento');

// --- 1. CARREGAR CONFIGURAÇÕES AO INICIAR ---
async function carregarConfiguracoes() {
    try {
        const res = await fetch(`${URL_BASE}/api/status/config`);
        const config = await res.json();

        // Aplica os valores nos Switches
        chkManual.checked = config.chaveManual;
        chkProgramado.checked = config.chaveProgramada;
        chkAutomatico.checked = config.chaveAutomatica;

        // Aplica os valores nos Inputs de Horário
        inputData.value = config.dataProgramada || "";
        inputAbre.value = config.inicioProgramado ? config.inicioProgramado.substring(0, 5) : "08:30";
        inputFecha.value = config.fimProgramado ? config.fimProgramado.substring(0, 5) : "19:30";

        // Atualiza a UI (Botões abrir/fechar e cores)
        atualizarInterfaceVisual(config.abertoManual);
        verificarStatusNaTela(); 
        
    } catch (err) {
        console.error("Erro ao carregar configurações:", err);
    }
}

// --- 2. SALVAR TUDO (A FUNÇÃO MESTRE) ---
async function salvarConfiguracao() {
    // Montamos o objeto exatamente como o Java espera
    const config = {
        id: 1,
        chaveManual: chkManual.checked,
        chaveProgramada: chkProgramado.checked,
        chaveAutomatica: chkAutomatico.checked,
        abertoManual: !btnFechar.classList.contains("Hidden"), // Se o botão fechar está visível, é porque está aberto
        dataProgramada: inputData.value || null,
        inicioProgramado: inputAbre.value ? inputAbre.value + ":00" : null,
        fimProgramado: inputFecha.value ? inputFecha.value + ":00" : null
    };

    try {
        const res = await fetch(`${URL_BASE}/api/status/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(config)
        });

        if (res.ok) {
            console.log("Banco de dados atualizado!");
            verificarStatusNaTela(); // Atualiza o texto de status
        }
    } catch (err) {
        console.error("Erro ao salvar:", err);
    }
}

// --- 3. FUNÇÕES DE APOIO ---

function atualizarInterfaceVisual(estaAberto) {
    if (estaAberto) {
        btnAbrir.classList.add("Hidden");
        btnFechar.classList.remove("Hidden");
        boxMain.classList.add("Atendendo");
        boxMain.classList.remove("Indisponivel");
    } else {
        btnAbrir.classList.remove("Hidden");
        btnFechar.classList.add("Hidden");
        boxMain.classList.remove("Atendendo");
        boxMain.classList.add("Indisponivel");
    }
}

async function verificarStatusNaTela() {
    // Chama o endpoint que faz o cálculo real
    const res = await fetch(`${URL_BASE}/api/status/is-open`);
    const abertoAgora = await res.json();
    
    if (abertoAgora) {
        statusInfo.innerHTML = "✅ Barbearia operando: <b>ABERTA</b>";
        statusInfo.style.color = "#00ff00";
    } else {
        statusInfo.innerHTML = "🚫 Barbearia operando: <b>FECHADA</b>";
        statusInfo.style.color = "#ff4444";
    }
}

// --- 4. EVENTOS (LISTENERS) ---


const chkAutomatico2 = document.getElementById('chk2');

chkAutomatico2.addEventListener('change', (event) => {
     const BoxTimeImput = document.querySelector(".card-configuracao")

    if (event.target.checked) {
        BoxTimeImput.removeAttribute("id");
    } else {
        BoxTimeImput.id = "hidden";
    }
    

});

// Botão Manual Abrir
btnAbrir.addEventListener('click', () => {
    atualizarInterfaceVisual(true);
    salvarConfiguracao();
});

// Botão Manual Fechar
btnFechar.addEventListener('click', () => {
    atualizarInterfaceVisual(false);
    salvarConfiguracao();
});

// Ao mudar qualquer Switch, ele já salva no banco
[chkManual, chkProgramado, chkAutomatico].forEach(el => {
    el.addEventListener('change', salvarConfiguracao);
});

// Botão Salvar Programação de Horário
document.getElementById('btnSalvarProgramacao').addEventListener('click', () => {
    salvarConfiguracao();
    alert("Programação enviada ao servidor!");
});

// Botão Cancelar (Desliga a chave programada e salva)
document.getElementById('btnCancelarAgendamento').addEventListener('click', () => {
    chkProgramado.checked = false;
    salvarConfiguracao();
});

// Inicia tudo
window.addEventListener('load', carregarConfiguracoes);