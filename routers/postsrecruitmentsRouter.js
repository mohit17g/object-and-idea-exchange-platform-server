const router = require("express").Router();
const postsrecruitmentsController = require("../controllers/postsrecruitmentsController");
const requireUser = require("../middlewares/requireUser");

router.post(
  "/",
  requireUser,
  postsrecruitmentsController.createPostrecruitmentController
);
// router.post("/like", requireUser, postsproductsController.likeAndUnlikePost);
// router.put("/", requireUser, postsController.updatePostController);
// router.delete("/", requireUser, postsController.deletePost);

module.exports = router;
