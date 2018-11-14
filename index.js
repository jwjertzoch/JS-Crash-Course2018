const express = require('express')
const bodyParser = require('body-parser')

const VisitorService = require('./services/visitor-service')
const ToiletService = require('./services/toilet-service')
const CommentService = require('./services/comment-service')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    res.render('index')
})

// VISITOR ENDPOINTs
app.get('/visitor/all', async (req, res) => {
    const visitors = await VisitorService.findAll()
    res.send(visitors)
})

app.get('/visitor/:id', async (req, res) => {
    const visitor = await VisitorService.find(req.params.id)
    res.send(visitor)
})

app.post('/visitor', async (req, res) => {
    const visitor = await VisitorService.add(req.body)
    res.send(visitor)
})

app.delete('/visitor/:id', async (req, res) => {
    const visitor = await VisitorService.del(req.params.id)
    res.send(visitor)
})

// TOILET ENDPOINTS
app.get('/toilet/all', async (req, res) => {
    const toilets = await ToiletService.findAll()
    res.send(toilets)
})

app.get('/toilet/:id', async (req, res) => {
    const toilet = await ToiletService.find(req.params.id)
    res.send(toilet)
})

app.post('/toilet', async (req, res) => {
    const toilet = await ToiletService.add(req.body)
    res.send(toilet)
})

app.delete('/toilet/:id', async (req, res) => {
    const toilet = await ToiletService.del(req.params.id)
    res.send(toilet)
})

// COMMENT ENDPOINTS
app.get('/comment/all', async (req, res) => {
    const comments = await CommentService.findAll()
    res.send(comments)
})

app.get('/comment/:id', async (req, res) => {
    const comment = await CommentService.find(req.params.id)
    res.send(comment)
})

app.post('/comment', async (req, res) => {
    const comment = await CommentService.add(req.body)
    res.send(comment)
})

app.put('/comment/rating', async (req, res) => {
    const comment = await CommentService.rating(req.body)
    res.send(comment)
})

app.delete('/comment/:id', async (req, res) => {
    const comment = await CommentService.del(req.params.id)
    res.send(comment)
})

app.listen(3000, () => {
    console.log('Server listening')
})