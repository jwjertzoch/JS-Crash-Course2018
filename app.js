const express = require('express')
const bodyParser = require('body-parser')

const VisitorService = require('./services/visitor-service')
const ToiletService = require('./services/toilet-service')
const CommentService = require('./services/comment-service')

require('./mongo-connection')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index')
})

// VISITOR ENDPOINTs

app.get('/visitor/create', async (req, res) => {
  res.render('visitors/create')
})

app.get('/visitor/all-list', async (req, res) => {
    const visitor = await VisitorService.findAll()
    res.render('visitor', { visitor })
  })

app.get('/visitor/all', async (req, res) => {
    const visitors = await VisitorService.findAll()
    res.send(visitors)
})

app.get('/visitor/:id', async (req, res) => {
    const visitor = await VisitorService.find(req.params.id)
    res.render('visitors/show', { visitor })
})

app.get('/visitor/:id/json', async (req, res) => {
    const visitor = await VisitorService.find(req.params.id)
    if (!visitor) res.status(404)
    res.send(visitor)
  })

app.post('/visitor', async (req, res) => {
    const visitor = await VisitorService.add(req.body)
    res.redirect(`/visitor/${ visitor._id }`)
})

app.delete('/visitor/:id', async (req, res) => {
    const visitor = await VisitorService.del(req.params.id)
    res.send(visitor)
})

// TOILET ENDPOINTS

app.get('/toilet/create', async (req, res) => {
  res.render('toilets/create')
})

app.get('/toilet/all-list', async (req, res) => {
    const toilets = await ToiletService.findAll()
    res.render('data', { data: toilets })
  })

app.get('/toilet/all', async (req, res) => {
    const toilets = await ToiletService.findAll()
    res.send(toilets)
})

app.get('toilet/:id', async (req, res) => {
    const toilet = await ToiletService.find(req.params.id)
    res.render('toilets/show', { toilet })
})

app.get('/toilet/:id', async (req, res) => {
    const toilet = await ToiletService.find(req.params.id)
    res.render ('toilets/show', { data: toilet })
})

app.get('/toilet/:id/json', async (req, res) => {
    const toilet = await ToiletService.find(req.params.id)
    if (!toilet) res.status(404)
    res.send(toilet)
  })

app.post('/toilet', async (req, res) => {
    const toilet = await ToiletService.add(req.body)
    res.redirect(`/toilet/${ toilet._id }`)
})

app.get('toilet-visit/:visitorId', async (req, res) => {
    data = {}
    data.visitors = await VisitorService.findAll(visitors)
    data.toilets = await ToiletService.findAll(toilets)
    data.comments = await CommentService.findAll(comments)
    res.render('visitor/toilet-visit', { data })
})

app.delete('/toilet/:id', async (req, res) => {
    const toilet = await ToiletService.del(req.params.id)
    res.send(toilet)
})

// COMMENT ENDPOINTS

app.get('/comment/create', async (req, res) => {
  res.render('comments/create')
})

app.get('/comment/all-list', async (req, res) => {
    const comments = await CommentService.findAll()
    res.render('data', { data: comments })
  })

app.get('/comment/all', async (req, res) => {
    const comments = await CommentService.findAll()
    res.send(comments)
})

app.get('/comment/:id', async (req, res) => {
    const comment = await CommentService.find(req.params.id)
    res.send(comment)
})

app.get('/comment/:id/json', async (req, res) => {
    const comment = await CommentService.find(req.params.id)
    if (!comment) res.status(404)
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


module.exports = app
