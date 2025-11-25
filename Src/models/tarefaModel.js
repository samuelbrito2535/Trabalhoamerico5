// tarefaModel.js
const db = require('../config/db');

const TarefaModel = {
    // Listar todas
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM tarefas');
        return rows;
    },

    // Criar nova tarefa
    create: async (titulo) => {
        const sql = 'INSERT INTO tarefas (titulo) VALUES (?)';
        const [result] = await db.query(sql, [titulo]);
        return { id: result.insertId, titulo };
    },

    // Deletar tarefa
    delete: async (id) => {
        const sql = 'DELETE FROM tarefas WHERE id = ?';
        await db.query(sql, [id]);
        return { message: 'Deletado com sucesso' };
    }
};

module.exports = TarefaModel;