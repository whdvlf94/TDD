var express = require('express');
var app = express();
var morgan = require('morgan')
//POST의 경우 req.body를 사용하기 위해 body-parser 모듈이 필요하다
var bodyParser = require('body-parser')
var user = require('./api/user')

//package.json에서 NODE_ENV 환경변수를 추가(process.env 에 할당)
if(process.env.NODE_ENV !== 'test') {
  //test 서버가 아닌 경우 server log 출력
  app.use(morgan('dev'));
}
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// '/users' 라고 들어오는 모든 request는 api/user/ 에 속해있는 곳으로 보내진다.
app.use('/users',user)



module.exports = app;