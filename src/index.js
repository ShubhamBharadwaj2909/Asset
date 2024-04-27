// index.js

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

const collection = require("./mongodb");
app.use(express.json());

app.set("view engine", "ejs");

const templatePath = path.join(__dirname, "../templates");
app.set("views", templatePath);

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login", { errorMessage: undefined });
});

app.get("/signup", (req, res) => {
    res.render("signup", { errorMessage: undefined });
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);

    res.render("login", { errorMessage: undefined });
});


app.post("/login", async (req, res) => {

    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check) {    
            if (check.password === req.body.password) {
                res.redirect("https://assetifyy.vercel.app/");
            } else {
                res.render("login", { errorMessage: "Invalid username or  password" });
            }
        } else {
            res.render("login", { errorMessage: "Invalid username or password" });
        }
    } catch {
        res.render("login", { errorMessage: "An unexpected error occurred. Please try again later." });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port no ${port}`);
});
