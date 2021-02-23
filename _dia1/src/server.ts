import express from 'express';

const app = express();

/**
 * Metodos Padrão HTTP
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
 */

 // http://localhost:3333/users
 app.get("/", (request, response) => {
     return response.json({message: "HelloWorld - NLW04"}) 
 })

 // Recebeu os dados para salvar
 app.post("/", (request, response) => {
     return response.json({message: "Os dados foram salvos com sucesso!"});
 })

app.listen(3333, () => console.log('Server is running'));