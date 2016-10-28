let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    routes = require('./server-assets/routes/index')
    handlers = require('./utils/handlers'),
    server = express(),

    port = process.envPORT || 1830;


server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use("/", express.static(`${__dirname}/public/`));
server.use('/api', cors(), routes.router)
//might have issue with handlers...
server.use('/', handlers.defaultErrorHandler)


server.listen(port, function(){
    console.log(`Creating playlists on port: ${port}`);
})