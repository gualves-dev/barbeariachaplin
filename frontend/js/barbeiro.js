
const URL_BASE =  "https://barbearia-chaplinofc-production.up.railway.app"; //"http://localhost:8080";  "https://barbearia-chaplinofc-production.up.railway.app"



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


    btnConfigTime.addEventListener('click', () =>{
        cardConfigTimeBox.removeAttribute("id");
    });

    btnConfigTimeClose.addEventListener('click', () =>{
        cardConfigTimeBox.id = "hidden";
    });


const btnSalvar = document.getElementById('btnSalvarProgramacao');
const statusAgendamento = document.getElementById('statusAgendamento');
const btnCancelar = document.getElementById('btnCancelarAgendamento');

// --- 1. FUNÇÃO PARA FALAR COM O JAVA ---
async function enviarComandoForcado(valor) {
    try {
        // 1. Avisa a variável de controle no Java
        await fetch(`${URL_BASE}/api/status/force?valor=${valor}`, { method: 'POST' });

        // 2. Sincroniza o Banco de Dados se for abrir ou fechar
        if (valor === 1) {
            await fetch(`${URL_BASE}/api/status/abrir`, { method: 'POST' });
        } else if (valor === 0) {
            await fetch(`${URL_BASE}/api/status/fechar`, { method: 'POST' });
        }
        
        console.log("Sincronizado com servidor. Valor:", valor);
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
    }
}

// --- 2. SALVAR AGENDAMENTO ---
btnSalvar.addEventListener('click', () => {
    const dataRef = document.getElementById('inputData').value;
    const horaAbre = document.getElementById('inputAbre').value;
    const horaFecha = document.getElementById('inputFecha').value;

    if (!dataRef) return alert("Escolha uma data!");

    const programacao = { data: dataRef, abertura: horaAbre, fechamento: horaFecha };
    localStorage.setItem("PROGRAMACAO_GERENTE", JSON.stringify(programacao));
    
    alert("Programação salva com sucesso!");
    verificarStatusAgendado();
});

// --- 3. CANCELAR AGENDAMENTO (VOLTAR AO AUTOMÁTICO) ---
btnCancelar.addEventListener('click', async () => {
    localStorage.removeItem("PROGRAMACAO_GERENTE"); // Limpa o Storage
    
    await enviarComandoForcado(-1); // Avisa o Java para voltar ao padrão (11:29 - 22:30)
    await fetch(`${URL_BASE}/api/status/abrir`, { method: 'POST' });
    alert("Agendamento cancelado! Sistema operando no automático.");
    verificarStatusAgendado();
});

// --- 4. A REGRA DE NEGÓCIO (CORRIGIDA) ---
function verificarStatusAgendado() {
    const config = JSON.parse(localStorage.getItem("PROGRAMACAO_GERENTE"));
    
    // PEGAR DATA LOCAL CORRETA (Isso resolve o problema do dia 16/17)
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hojeDataLocal = `${ano}-${mes}-${dia}`;

    if (!config) {
        statusAgendamento.innerHTML = "📅 Modo: <b>Automático</b> (8:29 - 19:30)";
        statusAgendamento.style.color = "#888";
        return;
    }

    // Compara com a data local e não com o ISOString (que é bugado)
    if (config.data === hojeDataLocal) {
        const agoraMinutos = agora.getHours() * 60 + agora.getMinutes();
        const [hA, mA] = config.abertura.split(":").map(Number);
        const [hF, mF] = config.fechamento.split(":").map(Number);
        
        const minAbre = (hA * 60) + mA;
        const minFecha = (hF * 60) + mF;

        if (agoraMinutos >= minAbre && agoraMinutos < minFecha) {
            enviarComandoForcado(1); // Força abrir
            statusAgendamento.innerHTML = `✅ Programação Ativa: Aberto até ${config.fechamento}`;
            statusAgendamento.style.color = "#00ff00";
        } else {
            enviarComandoForcado(0); // Força fechar
            statusAgendamento.innerHTML = `🚫 Programação Ativa: Fechado (Abre às ${config.abertura} ou 8h30 Amanha)`;
            statusAgendamento.style.color = "#ff4444";
        }
    } else {
        // Se tem algo no storage mas não é para hoje, volta pro automático
        enviarComandoForcado(-1);
        statusAgendamento.innerHTML = `📅 Programado para ${config.data}. Hoje: <b>Automático</b>`;
        statusAgendamento.style.color = "#888";

        // Se a data já passou, limpa o storage para não lixar o navegador
        if (config.data < hojeDataLocal) {
            localStorage.removeItem("PROGRAMACAO_GERENTE");
        }
    }
}

// Inicia a verificação
window.addEventListener('load', verificarStatusAgendado);