const requireUser = require("../middlewares/requireUser");
const UserController = require("../controllers/userController");
const router = require("express").Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
// router.get('/getFeedData', requireUser, UserController.getPostsOfFollowing);
router.get("/getPostsOfAll", requireUser, UserController.getPostsOfAll);
router.get(
  "/getPostsproductsOfAll",
  requireUser,
  UserController.getPostsproductsOfAll
);
router.get(
  "/getPostseventsOfAll",
  requireUser,
  UserController.getPostseventsOfAll
);
router.get(
  "/getPostsrecruitmentsOfAll",
  requireUser,
  UserController.getPostsrecruitmentsOfAll
);
router.get("/getMyPosts", requireUser, UserController.getMyPosts);
router.get("/getUserPosts", requireUser, UserController.getUserPosts);
router.delete("/", requireUser, UserController.deleteMyProfile);
router.get("/getMyInfo", requireUser, UserController.getMyInfo);
router.put("/", requireUser, UserController.updateUserProfile);
router.post("/getUserProfile", requireUser, UserController.getUserProfile);
router.post("/getUserProfile1", requireUser, UserController.getUserProfile1);
router.post("/getUserProfile2", requireUser, UserController.getUserProfile2);
router.post("/getUserProfile3", requireUser, UserController.getUserProfile3);
router.get("/getAllUser", requireUser, UserController.getAllUser);

module.exports = router;
