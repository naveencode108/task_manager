import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    task: [
      {
        type: mongoose.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password,this.password);
};

export default mongoose.model("user", userSchema);
