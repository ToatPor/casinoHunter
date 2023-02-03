const express = require('express');
const controller = require('../controller/memberController');
const router = express.Router();

router.route('/').get(controller.getAllMember).post(controller.createMember);
router.route('/getBydate').get(controller.getBydate);
router
  .route('/:id')
  .delete(controller.deleteMember)
  .patch(controller.updateMember)
  .get(controller.getMember);

module.exports = router;
