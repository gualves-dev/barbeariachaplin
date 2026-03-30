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

// --- 3. Lógica de Status da Barbearia ---

btnFecharBarbearia.addEventListener('click', () => {
    btnFecharBarbearia.classList.add('Hidden');
    btnAbrirBarbearia.classList.remove('Hidden');
});

btnAbrirBarbearia.addEventListener('click', () => {
    btnAbrirBarbearia.classList.add('Hidden');
    btnFecharBarbearia.classList.remove('Hidden');
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