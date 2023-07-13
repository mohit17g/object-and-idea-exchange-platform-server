const Post = require("../models/Post");
const Postproduct = require("../models/Postproduct");
const Postevent = require("../models/Postevent");
const Postrecruitment = require("../models/Postrecruitment");
// const Post1 = require("../models/Postproduct");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;
const { mapPostOutput } = require("../utils/Utils");

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;

    if (!caption || !postImg) {
      return res.send(error(400, "Caption and postImg are required"));
    }
    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg",
    });

    const owner = req._id;

    const user = await User.findById(req._id);

    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    user.posts.push(post._id);
    await user.save();

    // console.log("user", user);
    // console.log("post", post);

    return res.json(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId).populate("owner");
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.likes.includes(curUserId)) {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
    } else {
      post.likes.push(curUserId);
    }
    await post.save();
    return res.send(success(200, { post: mapPostOutput(post, req._id) }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    let post = await Post.findById(postId);
    const post1 = await Postproduct.findById(postId);
    const post2 = await Postevent.findById(postId);
    const post3 = await Postrecruitment.findById(postId);
    if (post1) {
      post = post1;
    }
    if (post2) {
      post = post2;
    }
    if (post3) {
      post = post3;
    }
    const curUser = await User.findById(curUserId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    // if (curUserId === "649982ea04591d8e68ab54de") {
    //   post.owner = curUserId;
    // }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "Only owners can delete their posts"));
    } else if (post1) {
      const index = curUser.postsproducts.indexOf(postId);
      curUser.postsproducts.splice(index, 1);
      await curUser.save();
    } else if (post2) {
      const index = curUser.postsevents.indexOf(postId);
      curUser.postsevents.splice(index, 1);
      await curUser.save();
    } else if (post3) {
      const index = curUser.postsrecruitments.indexOf(postId);
      curUser.postsrecruitments.splice(index, 1);
      await curUser.save();
    } else {
      const index = curUser.posts.indexOf(postId);
      curUser.posts.splice(index, 1);
      await curUser.save();
    }
    await post.remove();
    return res.send(success(200, "post deleted successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId).populate("owner");
    const curUser = await User.findById(curUserId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "Only owners can delete their posts"));
    }

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.remove();

    return res.send(success(200, "post deleted successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createPostController,
  likeAndUnlikePost,
  updatePostController,
  deletePost,
};

// const likeAndUnlikePost = async (req, res) => {
//     try {
//         const { postId } = req.body;
//         const curUserId = req._id;

//         const post = await Post.findById(postId).populate('owner');
//         const curUser = await User.findById(curUserId);
//         if (!post) {
//             return res.send(error(404, "Post not found"));
//         }

//         // if (post.owner.toString() !== curUserId) {
//         //     return res.send(error(403, "Only owners can delete their posts"));
//         // }

//         const index = curUser.posts.indexOf(postId);
//         curUser.posts.splice(index, 1);
//         await curUser.save();
//         await post.remove();

//         return res.send(success(200, "post deleted successfully"));

//         // if (post.likes.includes(curUserId)) {
//         //     const index = post.likes.indexOf(curUserId);
//         //     post.likes.splice(index, 1);
//         // } else {
//         //     post.likes.push(curUserId);
//         // }
//         // await post.save();
//         // return res.send(success(200, {post: mapPostOutput(post, req._id)}));

//     } catch (e) {
//         return res.send(error(500, e.message));
//     }
// };
