const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); // ✅ Capital R

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: "https://a0.muscache.com/im/pictures/miso/Hosting-973612202639577969/original/b537c57b-300e-4c31-b610-b193b06ea7b1.jpeg?im_w=960",
    set: (v) => {
      if (typeof v === "object" && v.url) {
        return v.url;
      }
      return typeof v === "string" ? v : "https://a0.muscache.com/im/pictures/miso/Hosting-973612202639577969/original/b537c57b-300e-4c31-b610-b193b06ea7b1.jpeg?im_w=960";
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

// ✅ Cascade delete reviews
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
