const express = require('express');

const server = express();

server.use(express.json());


const projeto = [];

server.use((req, res, next) => {

    console.count("requisições feitas!")

    return next();

})

function checagem(req, res, next) {

    if (!projeto.id === req.params) {
        return res.status(400).json({ error: "Não existe!" })
    }
    return next();
}

server.get('/projeto', (req, res) => {
    return res.json(projeto);
})

server.post("/projeto", (req, res) => {

    const { id } = req.body;

    const { title } = req.body;

    const project = {
        id,
        title,
        task: []
    };

    projeto.push(project);

    return res.json(projeto);

})

server.put('/projeto/:id', checagem, (req, res) => {

    const { id } = req.params;
    const { title } = req.body;

    projeto.map(linha => {
        if (linha.id === id) {
            linha.title = title
        }

    })

    return res.json(projeto)
})



server.delete('/projeto/:id', checagem, (req, res) => {
    const { id } = req.params;

    projeto.map((linha) => {

        if (linha.id === id) {
            linha.id = projeto.splice(linha, 1)

        }
        return res.send()
    })
})

server.post('/projeto/:id/task', checagem, (req, res) => {

    const { id } = req.params;
    const { title } = req.body;
    const { task } = req.body;





    projeto.map((linha) => {
        if (linha.id === id) {
            linha.task.push(title);

        }
    })

    //console.log(projeto)
    return res.json(projeto)


})




server.listen(3000);