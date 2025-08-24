import mongoose from "mongoose";

//to connect to mongoDB server
try {
  await mongoose.connect("mongodb://127.0.0.1/mongoose_db");
  //   mongoose.set("debug", true);
} catch (error) {
  console.error(error);
  process.exit();
}

//create a schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 5 },
  createdAt: { type: Date, default: Date.now() },
});

//creating a model(collection)
const Users = mongoose.model("User", userSchema);

// await Users.create({ name: "yash", age: 22, email: "yash@example.com" }); //opening a connection

//crud operations
const usersData = [
  {
    name: "yash",
    age: 25,
    email: "@ss.com",
  },
  {
    name: "ahhs",
    age: 30,
    email: "ahhs@example.com",
  },
  {
    name: "djns",
    age: 28,
    email: "djns@example.com",
  },
];

//? insert
// await Users.insertMany(usersData);

//? read
// const users = await Users.find();
// const users = await Users.find({ age: { $gt: 25 } });
// console.log(users);

//? update
// await Users.updateMany({ email: "yash@example.com" }, { $set: { age: 19 } });

//? delete
await Users.deleteMany({ age: { $lt: 20 } });

await mongoose.connection.close(); //closing the connection
