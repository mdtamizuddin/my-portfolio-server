const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const dateNow = require("./dateNow");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vnzso.mongodb.net/My-Portfolio?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log("Database Is Connected"))
  .catch((err) => console.log(err));

//All Routers

app.use("/portfolio", require("./Routes/PortfolioRouter"));
app.use("/review", require("./Routes/reviewsRouter"));
app.use("/users", require("./Routes/userRouter"));
app.use("/sendMail", require("./Routes/sendMail"));
app.use("/messages", require("./Routes/messageRouter"));
app.use("/blog", require("./Routes/blogRouter"));

app.get("/", (req, res) => {
  res.send({ message: "Server Is Running" });
});

app.listen(PORT, () => {
  console.log(`Server Is Running http://localhost:${PORT}`);
});
