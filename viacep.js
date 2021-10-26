'use strict';

const pesquisarCep = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const cepValido = (cep) => /^[0-9]{8}$/.test(cep)

const limparCampos = () => {
    document.querySelector('#endereco').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#estado').value = '';
    document.querySelector('#cidade').value = '';
}

const preencherFormulario = async (evento) => {
    const cep = evento.target.value.raplece('-','');
    limparCampos();

    if(cep == '') return 0;

    if(cepValido(cep)){
    const infoCep = await pesquisarCep(cep);
    if(infoCep.erro){
        document.querySelector('#endereco').value = 'CEP não encontrado';
    }else{
        document.querySelector('#endereco').value = infoCep.logradouro;
        document.querySelector('#bairro').value = infoCep.bairro;
        document.querySelector('#estado').value = infoCep.uf;
        document.querySelector('#cidade').value = infoCep.localidade;
    }
    }else{
        document.querySelector('#endereco').value = 'CEP incorreto!';
    }
};

document.querySelector('#cep').addEventListener('focusout', preencherFormulario);