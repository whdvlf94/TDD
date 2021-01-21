const models = require('../models')


module.exports = () => {
    //force: true -> 기존에 DB가 존재하더라도 초기화 하여 생성한다는 의미
    //TEST code 인 경우에만 DB 초기화
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : true
    }
    return models.sequelize.sync({options});
}