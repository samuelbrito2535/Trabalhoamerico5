// script.js

// 1. Seleciona os elementos que JÁ ESTÃO no seu HTML
const inputTarefa = document.getElementById('input-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas'); // Apenas seleciona, não cria nem move!

// URL da sua API
const API_URL = 'http://localhost:3000/api/tarefas';

// --- FUNÇÃO 1: Carregar Tarefas ---
async function carregarTarefas() {
    try {
        const response = await fetch(API_URL);
        const tarefas = await response.json();
        
        listaTarefas.innerHTML = ''; // Limpa a lista visual antes de recarregar
        
        if (Array.isArray(tarefas)) {
            tarefas.forEach(tarefa => adicionarNaTela(tarefa));
        }
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
    }
}

// --- FUNÇÃO 2: Adicionar Tarefa ---
async function adicionarTarefa() {
    const titulo = inputTarefa.value;
    if (!titulo) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });

        if (response.ok) {
            const novaTarefa = await response.json();
            adicionarNaTela(novaTarefa);
            inputTarefa.value = ''; // Limpa o input
        }
    } catch (error) {
        alert("Erro ao salvar.");
    }
}

// --- FUNÇÃO 3: Excluir Tarefa ---
async function excluirTarefa(id, itemElemento) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
        if (response.ok) {
            itemElemento.remove();
        }
    } catch (error) {
        console.error("Erro ao excluir", error);
    }
}

// --- Auxiliar: Cria o visual de cada item ---
function adicionarNaTela(tarefa) {
    const li = document.createElement('li');
    
    // Cria o texto
    const span = document.createElement('span');
    span.innerText = tarefa.titulo;

    // Cria o botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.innerText = '🗑️'; // Ícone de lixeira (pode mudar se quiser)
    
    // Evento de excluir
    btnExcluir.onclick = () => excluirTarefa(tarefa.id, li);

    li.appendChild(span);
    li.appendChild(btnExcluir);
    
    // Adiciona na lista que JÁ ESTÁ no lugar certo
    listaTarefas.appendChild(li);
}

// Event Listeners
btnAdicionar.addEventListener('click', adicionarTarefa);
window.addEventListener('DOMContentLoaded', carregarTarefas);