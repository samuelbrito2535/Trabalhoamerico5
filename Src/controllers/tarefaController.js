// tarefaController.js

// ⚠️ ATENÇÃO AO CAMINHO:
// Se o tarefaModel.js estiver na mesma pasta, use './tarefaModel'
// Se estiver em outra pasta (ex: models), use '../models/tarefaModel'
const TarefaModel = require('../models/tarefaModel'); 

const TarefaController = {
    
    // --- LISTAR TAREFAS ---
    listar: async (req, res) => {
        try {
            const tarefas = await TarefaModel.getAll();
            res.json(tarefas);
        } catch (error) {
            // Isso vai mostrar o erro exato no seu Terminal (VS Code)
            console.log("🔴 ERRO AO LISTAR:", error); 
            res.status(500).json({ error: 'Erro ao buscar tarefas' });
        }
    },

    // --- ADICIONAR TAREFA ---
    adicionar: async (req, res) => {
        const { titulo } = req.body;
        if (!titulo) return res.status(400).json({ error: 'Título é obrigatório' });
        
        try {
            const novaTarefa = await TarefaModel.create(titulo);
            res.status(201).json(novaTarefa);
        } catch (error) {
            console.log("🔴 ERRO AO ADICIONAR:", error);
            res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
    },

    // --- EXCLUIR TAREFA ---
    excluir: async (req, res) => {
        const { id } = req.params;
        try {
            await TarefaModel.delete(id);
            res.json({ message: 'Tarefa removida' });
        } catch (error) {
            console.log("🔴 ERRO AO EXCLUIR:", error);
            res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
    }
};

module.exports = TarefaController;