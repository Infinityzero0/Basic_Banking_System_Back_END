require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const User = require(path.resolve(__dirname + "/models/userDB"));
const {
  listAllUsers,
  listAllTransactions,
  transfer,
  getUser,
} = require(path.resolve(__dirname + "/controllers/userController"));
const app = express();
mongoose
  .connect("mongodb+srv://2SMM:Suraj%402001@projectdatabase.mlb8s.mongodb.net/BankingSystemDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Banking-System-Frontend-master/build'));
}



app.use("/", (req, res, next) => {
  // TODO: Add user auth here
  next();
});

app.get("/listAllUsers", listAllUsers);

app.get("/listAllTransactions", listAllTransactions);

app.get("/user/:id", getUser);

app.post("/transfer/:id", transfer);

const createNewUser = async () => {
  const newUser = new User({
    accId: "130",
    name: "Celestate Celestia",
    email: "Celestia@17gmail.com",
    currentBalance: "1330000",
  });
  await newUser.save();
};
createNewUser();

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT || 8000}`);
});
