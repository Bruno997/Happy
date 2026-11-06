//importar dependencia
const express = require('express');
const path = require('path');
const pages = require('./pages')

//iniciando o express
const server = express()
server
    // utilizar o body da requisicao (formulario)
    .use(express.urlencoded({ extended: true }))

    // utilizando os arquivos estaticos
    .use(express.static('public'))

    //configurar template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    //rotas da aplicacao
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .post('/save-orphanage', pages.saveOrphanage)


//ligar servidor
server.listen(5500)