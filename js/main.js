async function endereco(cep) {
    var msgError = document.getElementById('erro');
    msgError.innerHTML = '';
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var conversao = await consultaCep.json();
        if (conversao.erro) {
            throw Error('Cep não existe')
        }
        var endereco = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');

        endereco.value = conversao.logradouro;
        bairro.value = conversao.bairro;
        cidade.value = conversao.localidade;
        estado.value = conversao.uf;

        console.log(conversao)
        return conversao
    } catch (error) {
        console.log(error)
        msgError.innerHTML = `<p>CEP ${cep} não existe! </p>`
    }
}

/* 
--------------- RESOLVENDO MULTIPLAS REQUISIÇÕES EM UMA API
let ceps = ['44032402', '44066584'];
let conjuntoCeps = ceps.map(valores => endereco(valores))
Promise.all(conjuntoCeps).then(resposta => console.log(resposta)); 
*/

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => endereco(cep.value));



