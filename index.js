const mongodb = require("mongodb");
const express = require("express");
const cors = require("cors");
require("./db/config");
const users = require("./db/User");
const Product = require("./db/Product");
const Element = require("./db/Element");
const Question = require("./db/Question");
const Author = require("./db/Author");
const Getelements = require("./db/Getelements");

const { db } = require("./db/User");
const { ObjectId } = require("mongodb");

// const ObjectId = mongodb.ObjectId;

const app = express();
app.use(express.json());
app.use(cors());

// Login and Register

app.post("/register", async (req, res) => {
  try {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  let user = await users.findOne(req.body).select("-password");
  console.log(req.body);
  if (req.body.password && req.body.email) {
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No users found" });
    }
  }
});

app.get("/authors", async (req, res) => {
  let userData = await Author.find();

  console.log(userData);
  res.send(userData);
});

app.post("/add-element", async (req, res) => {
  const element = new Element();
  const cats = req.body.cats;
  const category = [];
  for (var i = 0; i < category.length; i++) {
    category.push(cats[i]);
  }
  element.userId = req.body.user_id;
  element.question = req.body.question;
  element.options[0] = req.body.options[0];
  element.options[1] = req.body.options[1];
  element.options[2] = req.body.options[2];
  element.checked[0] = req.body.checked[0];
  element.category[0] = req.body.category[0];
  element.category = req.body.category;

  element.selected = req.body.selected;
  await element.save((err, element) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(element);
      res.send(element);
    }
  });
});

app.get("/elements", async (req, res) => {
  try {
    let elements = await Element.find();
    // res.send(products);
    if (elements.length > 0) {
      res.send(elements);
    } else {
      res.send({ result: "No elements found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/element/:id", async (req, res) => {
  const result = await Element.deleteOne({ _id: req.params.id });

  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Element.find({
    $or: [
      { question: { $regex: req.params.key } },
      { options: { $regex: req.params.key } },
      // { category: { $regex: req.params.key } },
      // { tag: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.post("/el", async (req, res) => {
  const el = new Getelements();

  const cats = req.body.cats;
  const category = [];
  for (var i = 0; i < category.length; i++) {
    category.push(cats[i]);
  }

  el.userId = req.body.user_id;
  el.title = req.body.title;
  el.category = req.body.category;
  await el.save((err, el) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(el);
      res.send(el);
    }
  });
});

app.get("/get-elements", async (req, res) => {
  try {
    let els = await Getelements.find();

    if (els.length > 0) {
      res.send(els);
    } else {
      res.send({ result: "No elements found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// app.get("/get-el", (req, res) => {
// var qns = Element.find();
// console.log(qns);
// res.send(qns);


  // Element.find({ _id: { $in: req.body.category } })
  //   .exec()
  //   .then((docs) => {
  //     const response = {
  //       list: docs.map((doc) => {
  //         return {
  //           id: doc._id,
  //           title: doc.title,
  //           question: doc.question,
  //           options: doc.options,
  //         };
  //       }),
  //     };
  //     res.status(200).json(response);
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
// });

// Products page

app.post("/add-product", async (req, res) => {
  const productt = new Product();
  productt.user_id = req.body.user_id;
  productt.name = req.body.name;
  productt.price = req.body.price;
  productt.category = req.body.category;
  productt.tag[0] = req.body.tag[0];
  productt.tag[1] = req.body.tag[1];
  await productt.save((err, productt) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(productt);
      res.send(productt);
    }
  });
});

app.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    // res.send(products);
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No products found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  try {
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No result found" });
    }
  } catch (err) {
    console.warn(err);
  }
});

app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { tag: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// Questions

app.get("/cr", async (req, res) => {
  const author = await db.collection("authors").find().toArray();
  console.log(author);
  res.send(author);
});

app.post("/add-question", async (req, res) => {
  const producttt = new Question();
  producttt.user_id = req.body.user_id;
  producttt.question = req.body.question;
  producttt.options[0] = req.body.options[0];
  producttt.options[1] = req.body.options[1];
  producttt.options[2] = req.body.options[2];
  producttt.options[3] = req.body.options[3];
  producttt.correct_answer = req.body.correct_answer;

  await producttt.save((err, producttt) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(producttt);
      res.send(producttt);
    }
  });
});

app.get("/questions", async (req, res) => {
  try {
    let questions = await Question.find();

    if (questions.length > 0) {
      console.log(questions);
      res.send(questions);
    } else {
      res.send({ result: "No questions found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/question/:id", async (req, res) => {
  const result = await Question.deleteOne({ _id: req.params.id });

  res.send(result);
});

app.get("/question/:id", async (req, res) => {
  let result = await Question.findOne({ _id: req.params.id });
  try {
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No result found" });
    }
  } catch (err) {
    console.warn(err);
  }
});

app.put("/question/:id", async (req, res) => {
  let result = await Question.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.listen(5000);
