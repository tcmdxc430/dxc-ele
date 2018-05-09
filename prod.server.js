var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next) {
    req.url = '/index.html';
    next();
})

app.use(router);

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods
const ratings = appData.ratings

const apiRoutes = express.Router();
apiRoutes.get('/seller',function(req,res){
  res.json({
     errno : 0,
     data : seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
     errno : 0,
     data : goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
     errno : 0,
     data : ratings
  });
});

app.use('/api',apiRoutes);

app.use(express.static('./dist'));

// module.exports = app.listen(port, function (err) {
// 	if (err) {
// 		console.log(err);
// 		return
// 	}
// 	console.log('Listening at http://localhost:' + port + '\n')
// });

var server
var portfinder = require('portfinder')
portfinder.basePort = port

portfinder.getPort((err, port) => {
    if (err) {
        console.log(err);
        		return
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port//通过localhost:8080访问页面
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it

    server = app.listen(port)
  })