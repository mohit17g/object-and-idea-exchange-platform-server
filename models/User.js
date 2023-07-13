const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    regno: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    cpassword: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    avatar: {
      publicId: String,
      url: String,
    },
    // followers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //   },
    // ],
    // followings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //   },
    // ],
    // expense: [
    //   {
    //     type: String,
    //   },
    //   {
    //     type: Number,
    //   },
    //   {
    //     type: String,
    //   },
    // ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    postsproducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postproduct",
      },
    ],
    postsevents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postevent",
      },
    ],
    postsrecruitments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postrecruitment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
