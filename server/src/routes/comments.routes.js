const CommentController = require("../controllers/Comment.controller")

const router = require("express").Router()

router.put('/',CommentController.update)
router.post('/',CommentController.create)
router.delete('/:id',CommentController.delete)

module.exports = router