const router = require("express").Router();
const postsproductsController = require("../controllers/postsproductsController");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, postsproductsController.createPostproductController);
router.post("/like", requireUser, postsproductsController.likeAndUnlikePost);
// router.put("/", requireUser, postsController.updatePostController);
// router.delete("/", requireUser, postsController.deletePost);

module.exports = router;
