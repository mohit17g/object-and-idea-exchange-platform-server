var ta = require("time-ago");

const mapPostOutput1 = (postproduct) => {
  return {
    _id: postpoduct._id,
    caption: postproduct.caption,
    phoneno: postproduct.phoneno,
    price: postproduct.price,
    image: postproduct.image,
    owner: {
      _id: postproduct.owner._id,
      name: postproduct.owner.name,
      avatar: postproduct.owner.avatar,
    },
    // likesCount: post.likes.length,
    // isLiked: post.likes.includes(userId),
    timeAgo: ta.ago(post.createdAt),
  };
};

module.exports = {
  mapPostOutput1,
};
