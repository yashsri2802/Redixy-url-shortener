import mongoose, { mongo } from "mongoose";

try {
  await mongoose.connect("mongodb://127.0.0.1/mongoose_middleware");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 5 },
    //   createdAt: { type: Date, default: Date.now() },
    //   updatedAt: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

//middleware to update date and time
// userSchema.pre(["updateOne", "updateMany", "create"], function (next) {
//   this.set({ updatedAt: Date.now() });
//   next();
// });

const Users = mongoose.model("User", userSchema);

// await Users.create({ name: "yash", age: 22, email: "yash@example.com" });

await Users.updateOne({ email: "yash@example.com" }, { $set: { age: 20 } });

await mongoose.connection.close();
