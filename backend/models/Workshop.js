import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Workshop Name"],
    trim: true,
    maxLength: [20, "Too Long Workshop Name"],
    minLength: [5, "Too Short Workshop Name"],
  },
  type: {
    type: String,
    required: [true, "Enter Workshop Type"],
  },
  date: {
    type: String,
    required: [true, "Enter Workshop Date"],
  },
  venue: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  coverimage: {
    public_id: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Workshop = mongoose.model("workshop",schema);

