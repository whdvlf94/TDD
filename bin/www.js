const app = require('../index')
const syncDb = require('./sync-db')

// TEST code 실행 시, user.psec.js 에서 request(app)을 통해 서버를 구동
// 따라서, applicaiton에서 app.listen()과 같은 서버 구동을 하지 않는 것이 좋다.

//npm start 시 DB와의 동기화를 하기 위해 아래와 같이 설정한다.
// () 대신 _ 을 사용할 수 있다.
syncDb().then(_=> {
    console.log('Sync database!')
    // npm start 시에만 app.listen() 함수가 실행될 수 있도록 한다.
    app.listen(3000, ()=>{
        console.log('Server is running on 3000 port')
    })
})