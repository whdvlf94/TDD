// API logic
const models = require('../../models')

const index = function (req, res) {
    // '' 의 경우 limit이라는 param값을 설정하지 않았기 때문에
    // undefined로 인식되어 res.status(400)을 리턴한다.
    // 따라서 이를 방지하기 위해 아래와 같이 설정한다.
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10)
    if (Number.isNaN(limit)) {
        return res.status(400).end()
    }

    //sequelize 함수를 사용하면 Promise 객체로 return.
    //따라서 
    models.User.findAll({
        limit: limit
    })
        //callback 함수를 통해 해당 객체를 users 객체로 받을 수 있다.
        .then(users => {
            res.json(users)
        });
    // slice : index 0 ~ limit 을 제외한 나머지 제거
    // res.json(users.slice(0, limit));
}

const show = (req, res) => {
    //id를 10진법 int 값으로 변환
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end() //end() return 후 종료(비동기 처리)

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        //filter 함수
        if (!user) return res.status(404).end()
        res.json(user);
    })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.destroy({
        where: {
            id: id
        }
    }).then(user => {
        return res.status(204).end();
    })
}

const create = (req, res) => {
    const name = req.body.name;

    // 파라미터 누락시 400 반환
    if (!name) return res.status(400).end();

    // if (isConflict) return res.status(409).end()
    models.User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if(err.name === 'SequelizeUniqueConstraintError') {
                res.status(409).end();
            }
            res.status(500).end();
        })

}

const update = (req, res) => {
    //id가 정수가 아닌 경우 400
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    
    const name = req.body.name
    //name이 없을 경우 400
    if (!name) return res.status(400).end()  

    models.User.findOne({
        where : {
            id: id
        }
    }).then(user => {
        //없는 유저일 경우 404 
        if (!user) return res.status(404).end();

        user.name = name;
        user.save() //변동사항 저장
            .then(_ => {
                // console.log(user)
                res.json(user);
            })
            .catch(err => {
                if(err.name === 'SequelizeUniqueConstraintError') {
                    //이름이 중복일 경우 409
                    return res.status(409).end();
                }
            })
    })

  


}

module.exports = {
    index,
    show,
    destroy,
    create,
    update
}