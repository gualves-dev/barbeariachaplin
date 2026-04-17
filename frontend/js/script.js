const URL_BASE =  "https://barbearia-chaplinofc-production.up.railway.app"; //"http://localhost:8080";  "https://barbearia-chaplinofc-production.up.railway.app"

// Login Modal Configs

const bntLoginOpen = document.querySelector(".BtnNav");
const loginModal = document.querySelector(".LoginModal");
const CloseLogin = document.querySelector("#closeBtnLogin");

bntLoginOpen.addEventListener('click', () => {
    console.log("Botao Login Clicou");
    loginModal.removeAttribute("id");
});

CloseLogin.addEventListener('click', () => {
    console.log("Fechar Modal Login");
    loginModal.id = 'hidden3';
});



// Tabela De Preços Configs


const bntPriceOpen = document.querySelector("#priceTableBox1");
const priceTableModal = document.querySelector("#priceModalTableMainBox");
const closePriceTable = document.querySelector("#closePriceTableModal");


bntPriceOpen.addEventListener('click', () => {

    console.log("Abrir Tabela de Preço");
    priceTableModal.classList.remove("Hidden");
    window 

});

closePriceTable.addEventListener('click', () => {

    console.log("Fechar Tabela de Preço");
    priceTableModal.classList.add("Hidden");

});




// Modal Entrar NA Fila Configs



const bntEntrarNaFila = document.querySelector("#entrarNaFila1");
const entrarNaFilaModal = document.querySelector(".ModalFilaMainBox");
const closeEntrarNAFila = document.querySelector("#fecharModalEntrarNaFila");
const bntEndFormsFilaModal = document.querySelector("#formAgendamento");
const secaoFila = document.querySelector(".FilaMainBox");



bntEntrarNaFila.addEventListener('click', async () => {


    // 1. Verificação de Duplicidade (LocalStorage)
    const idClienteExistente = localStorage.getItem("ID_CLIENTE_CHAPLIN");

    if (idClienteExistente) {
        alert("Você já está na fila! Aguarde o seu atendimento. Ou Saia da fila primeiro");
        return; // Para a execução aqui e não abre o modal
    }








    // 1. O ideal é checar no banco no momento do clique para ter certeza
    const response = await fetch(`${URL_BASE}/api/status`);
    const barbeariaAberta = await response.json();

    if (barbeariaAberta) {
        console.log("Abrindo Modal Entrar Na Fila");
        
        // Em vez de remover o ID, removemos a classe que esconde o modal
        entrarNaFilaModal.removeAttribute("id");
        
        // Se o seu modal usa o ID "hidden2" para sumir, faça:
        // document.getElementById("hidden2").style.display = "block";

        entrarNaFilaModal.scrollIntoView({ behavior: 'smooth' });

    } else {
        alert("A Barbearia está Fechada! A fila abre às 08:30h.");
    }
});





closeEntrarNAFila.addEventListener('click', () => {

    console.log("Fechar Entrar Na Fila Modal");
    entrarNaFilaModal.id = 'hidden2'
    window.scrollTo({
        top: 1000,
        behavior: 'smooth' // Faz o scroll suave
    });

});

bntEndFormsFilaModal.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Enviou");
    secaoFila.scrollIntoView({ behavior: 'smooth' });
    entrarNaFilaModal.id = 'hidden2';


});



// Seleciona todos os checkboxes de serviço e o span do total
const checkboxesServico = document.querySelectorAll('input[name="servico"]');
const totalSpan = document.querySelector("#totalDEServico");

// Função para calcular e atualizar o valor na tela
function atualizarTotal() {
    let total = 0;

    checkboxesServico.forEach(checkbox => {
        if (checkbox.checked) {
            // Number() converte o value "45" em número para somar
            total += Number(checkbox.getAttribute("totalDinehrio"));
        }
    });

    // Atualiza o texto do span formatando como dinheiro
    totalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

// Adiciona o evento de escuta em cada checkbox
checkboxesServico.forEach(checkbox => {
    checkbox.addEventListener('change', atualizarTotal);
});




//Login Forms Validation


document.querySelector(".LoginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // não recarrega a página

    const usuario = document.getElementById("loginUsuario").value;
    const senha = document.getElementById("loginSenha").value;

    if (usuario === "gabriel" && senha === "1234") {
        window.location.href = "gabriel.html";
    }
    else if (usuario === "pedro" && senha === "1234") {
        window.location.href = "pedro.html";
    }
    else if (usuario === "ramon" && senha === "1234") {
        window.location.href = "ramon.html";
    }
    else if (usuario === "guilherme" && senha === "1234") {
        window.location.href = "guilherme.html";
    }
    else {
        alert("USUARIO NÃO ENCONTRADO");
    }



});





document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        console.log("Página em segundo plano: Pausando processos...");
        // Aqui você poderia parar timers, se tivesse algum.
    } else {
        console.log("Página visível novamente: Atualizando dados...");
        // Quando o usuário volta para a aba, o site atualiza a fila sozinho uma única vez
        inicializarPainelCliente();
    }
});