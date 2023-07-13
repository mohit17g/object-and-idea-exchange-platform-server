const mongoose = require("mongoose");

module.exports = async () => {
  const mongoUri =
    "mongodb+srv://mohit:ost5oEha6k7x1lM6@cluster0.rnpdoal.mongodb.net/?retryWrites=true&w=majority";

  try {
    const connect = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
