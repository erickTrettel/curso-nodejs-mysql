const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const port = 3000
const router = express.Router()
const portfolioRouter = require('./router/portfolioRouter')
const server = express()

server.use(cors())
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())

router.get('/', (req, res) => res.json({
    mensagem: 'API online!'
}))

server.use('/', router)

server.use('/portfolio', portfolioRouter)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
