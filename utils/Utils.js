var ta = require("time-ago");

const mapPostOutput = (post, userId) => {
  return {
    _id: post._id,
    caption: post.caption,
    phoneno: post.phoneno,
    price: post.price,
    caption: post.caption,
    caption1: post.caption1,
    date: post.date,
    time: post.time,
    image: post.image,
    owner: {
      _id: post.owner._id,
      name: post.owner.name,
      avatar: post.owner.avatar,
    },
    likesCount: post.likes.length,
    isLiked: post.likes.includes(userId),
    timeAgo: ta.ago(post.createdAt),
  };
};

module.exports = {
  mapPostOutput,
};
