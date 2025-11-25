// routes.js
const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

// Definição das rotas
router.get('/tarefas', TarefaController.listar);
router.post('/tarefas', TarefaController.adicionar);
router.delete('/tarefas/:id', TarefaController.excluir);

module.exports = router;