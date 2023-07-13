const router = require("express").Router();
const postseventsController = require("../controllers/postseventsController");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, postseventsController.createPosteventController);
// router.post("/like", requireUser, postsproductsController.likeAndUnlikePost);
// router.put("/", requireUser, postsController.updatePostController);
// router.delete("/", requireUser, postsController.deletePost);

module.exports = router;
