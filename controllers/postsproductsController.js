const Postproduct = require("../models/Postproduct");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;
const { mapPostOutput } = require("../utils/Utils");

const createPostproductController = async (req, res) => {
  try {
    const { caption, postproductImg, phoneno, price } = req.body;

    if (!caption || !postproductImg || !phoneno || !price) {
      return res.send(error(400, "All fields are required"));
    }

    if (phoneno > 9999999999 || phoneno < 1000000000) {
      return res.send(error(409, "Phone number should be of 10 digit"));
    }

    const cloudImg = await cloudinary.uploader.upload(postproductImg, {
      folder: "postproductImg",
    });

    const owner = req._id;

    const user = await User.findById(req._id);

    const postproduct = await Postproduct.create({
      owner,
      caption,
      phoneno,
      price,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    user.postsproducts.push(postproduct._id);
    await user.save();

    // console.log("user", user);
    // console.log("post", post);

    return res.json(success(200, { postproduct }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Postproduct.findById(postId).populate("owner");
    const curUser = await User.findById(curUserId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    // if (post.owner.toString() !== curUserId) {
    //     return res.send(error(403, "Only owners can delete their posts"));
    // }

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.remove();

    return res.send(success(200, "post deleted successfully"));

    // if (post.likes.includes(curUserId)) {
    //     const index = post.likes.indexOf(curUserId);
    //     post.likes.splice(index, 1);
    // } else {
    //     post.likes.push(curUserId);
    // }
    // await post.save();
    // return res.send(success(200, {post: mapPostOutput(post, req._id)}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// const updatePostController = async (req, res) => {
//     try {
//         const { postId, caption } = req.body;
//         const curUserId = req._id;

//         const post = await Post.findById(postId);
//         if (!post) {
//             return res.send(error(404, "Post not found"));
//         }

//         if (post.owner.toString() !== curUserId) {
//             return res.send(error(403, "Only owners can update their posts"));
//         }

//         if (caption) {
//             post.caption = caption;
//         }

//         await post.save();
//         return res.send(success(200, { post }));
//     } catch (e) {
//         return res.send(error(500, e.message));
//     }
// };

// const deletePost = async (req, res) => {
//     try {
//         const { postId } = req.body;
//         const curUserId = req._id;

//         const post = await Post.findById(postId).populate('owner');
//         const curUser = await User.findById(curUserId);
//         if (!post) {
//             return res.send(error(404, "Post not found"));
//         }

//         if (post.owner.toString() !== curUserId) {
//             return res.send(error(403, "Only owners can delete their posts"));
//         }

//         const index = curUser.posts.indexOf(postId);
//         curUser.posts.splice(index, 1);
//         await curUser.save();
//         await post.remove();

//         return res.send(success(200, "post deleted successfully"));
//     } catch (e) {
//         return res.send(error(500, e.message));
//     }
// };

module.exports = {
  createPostproductController,
  likeAndUnlikePost,
  // updatePostController,
  // deletePost
};
