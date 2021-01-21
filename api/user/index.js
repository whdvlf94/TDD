const { request } = require('express');
// routing 설정 logic
const express = require('express')
const router = express.Router();
const ctrl = require('./user.ctrl')


// index(application) 에서 app.user('/users',user) 로 경로를 미리 설정했기 때문에
// 루트 경로로 설정해둔다 
router.get('/', ctrl.index);
  
router.get('/:id', ctrl.show)

router.delete('/:id', ctrl.destroy)

router.post('/', ctrl.create)

router.put('/:id', ctrl.update)

//index(application)에서 사용해야하므로 router 객체를 export 해준다.
module.exports = router;