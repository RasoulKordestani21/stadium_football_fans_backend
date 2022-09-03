const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  scanId: String,
  image: Array
});
const ImageModel = mongoose.model("image", imageSchema);

module.exports = ImageModel;
