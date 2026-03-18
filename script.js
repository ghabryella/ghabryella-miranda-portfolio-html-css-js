const formulario = document.getElementById('contato');
const toast = document.getElementById('toast');
let toastTimer;

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const campos = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('numero').value.trim(),
        mensagem: document.getElementById('mensagem').value.trim()
    };

    if (!campos.nome || !campos.email || !campos.telefone || !campos.mensagem) {

        return;
    }

    const telefoneRegex = /^\d{11}$/;

    if (!telefoneRegex.test(campos.telefone)) {
        exibirToast("O telefone deve conter exatamente 11 números (apenas números)", "erro");
        return;
    }

    console.log(campos);
    exibirToast("Mensagem enviada com sucesso!", "Sucesso")

});

function exibirToast(texto, tipo) {
    toast.classList = ["toast"]
    if (tipo == "erro") {
        toast.classList.remove("sucesso")
        toast.classList.add("erro")
    }

    toast.innerText = texto;
    toast.classList.add('ativo');
    toastTimer = setTimeout(() => {
        toast.classList.remove('ativo');
    }, 3000);
}