const formulario = document.getElementById('contato');
const toast = document.getElementById('toast');
let toastTimer;
const estiloPrincipal = document.documentElement;

// cores do tema claro
const coresClaras = {
    cor_fundo: "white",
    cor_texto: "black",
    preenchimento: "#E0E3E8",
    item_clicado: "#D4C5E5",
    roxo_2: "#603773",
    roxo_3: "#947CA2",
    fundo_contato: "white",
    sombra_contato: "0px 0px 13px rgba(0, 0, 0, 1)",
};

// cores do tema escuro
const coresEscuras = {
    cor_fundo: "black",
    cor_texto: "white",
    preenchimento: "#222629",
    item_clicado: "#35393C",
    roxo_2: "#9B7CB7",
    roxo_3: "#6A587E",
    fundo_contato: "#222629",
    sombra_contato: "0px 0px 13px rgba(255, 255, 255,1)",
};
let botaoTema = document.getElementById("botao");

// função que aplica o tema salvo no localStorage ao carregar a página
function aplicarModoSalvo() {
    let modo = localStorage.getItem('modoClaro') || "ativo";
    let modoClaro = modo === "ativo";

    if (modoClaro) {
        botaoTema.innerText = "☾";

        estiloPrincipal.style.setProperty("--cor-fundo", coresClaras.cor_fundo);
        estiloPrincipal.style.setProperty("--cor-texto", coresClaras.cor_texto);
        estiloPrincipal.style.setProperty("--preenchimento", coresClaras.preenchimento);
        estiloPrincipal.style.setProperty("--item-clicado", coresClaras.item_clicado);
        estiloPrincipal.style.setProperty("--roxo-2", coresClaras.roxo_2);
        estiloPrincipal.style.setProperty("--roxo-3", coresClaras.roxo_3);
        estiloPrincipal.style.setProperty("--fundo-contato", coresClaras.fundo_contato);
        estiloPrincipal.style.setProperty("--sombra-contato", coresClaras.sombra_contato);

    } else {
        botaoTema.innerText = "☼";

        estiloPrincipal.style.setProperty("--cor-fundo", coresEscuras.cor_fundo);
        estiloPrincipal.style.setProperty("--cor-texto", coresEscuras.cor_texto);
        estiloPrincipal.style.setProperty("--preenchimento", coresEscuras.preenchimento);
        estiloPrincipal.style.setProperty("--item-clicado", coresEscuras.item_clicado);
        estiloPrincipal.style.setProperty("--roxo-2", coresEscuras.roxo_2);
        estiloPrincipal.style.setProperty("--roxo-3", coresEscuras.roxo_3);
        estiloPrincipal.style.setProperty("--fundo-contato", coresEscuras.fundo_contato);
        estiloPrincipal.style.setProperty("--sombra-contato", coresEscuras.sombra_contato);
    }
}


aplicarModoSalvo();

// alterna entre tema claro e escuro ao clicar no botão
botaoTema.addEventListener("click", function () {
    let modo = localStorage.getItem('modoClaro') || "ativo";

    if (modo === "ativo") {
        localStorage.setItem('modoClaro', 'inativo');
    } else {
        localStorage.setItem('modoClaro', 'ativo');
    }

    aplicarModoSalvo();
});

// validação e simulação do envio do formulário
if (formulario) {
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const campos = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefone: document.getElementById('numero').value.trim(),
            mensagem: document.getElementById('mensagem').value.trim()
        };

        // verifica se todos os campos estão preenchidos
        if (!campos.nome || !campos.email || !campos.telefone || !campos.mensagem) {
            return;
        }

        // validação do formato do email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(campos.email)) {
            exibirToast("E-mail inválido. Use o formato: usuario@dominsio.com", "erro");
            return;
        }

        // validação do número de telefone
        const telefoneRegex = /^\d{11}$/;
        if (!telefoneRegex.test(campos.telefone)) {
            exibirToast("Digite um telefone válido com 11 dígitos (apenas números).", "erro");
            return;
        }

        // simulação de envio bem sucedido
        console.log(campos);
        exibirToast("Mensagem enviada com sucesso!", "Sucesso")
        formulario.reset();
    });
}

// exibe notificação temporária (toast)
function exibirToast(texto, tipo) {
    toast.classList = ["toast"]
    if (tipo == "erro") {
        toast.classList.add("erro")
    }

    toast.innerText = texto;
    toast.classList.add('ativo');
    toastTimer = setTimeout(() => {
        toast.classList.remove('ativo');
    }, 3000);
}