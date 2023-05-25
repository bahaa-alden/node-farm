"use strict";
const s = `[
  {
    "id": 1,
    "productName": "Goat and Sheep Cheese",
    "image": "🧀",
    "from": "Portugal",
    "nutrients": "Vitamin A, Calcium",
    "quantity": "250g",
    "price": "5.00",
    "organic": false,
    "description": "Creamy and distinct in flavor, goat cheese is a dairy product enjoyed around the world. Goat cheese comes in a wide variety of flavors and textures, from soft and spreadable fresh cheese to salty, crumbly aged cheese. Although it’s made using the same coagulation and separation process as cheese made from cow’s milk, goat cheese differs in nutrient content."
  },
  {
    "id": 2,
    "productName": "Apollo Broccoli",
    "image": "🥦",
    "from": "Portugal",
    "nutrients": "Vitamin C, Vitamin K",
    "quantity": "3 🥦",
    "price": "5.50",
    "organic": true,
    "description": "Broccoli is known to be a hearty and tasty vegetable which is rich in dozens of nutrients. It is said to pack the most nutritional punch of any vegetable. When we think about green vegetables to include in our diet, broccoli is one of the foremost veggies to come to our mind. Broccoli is a cruciferous vegetable and part of the cabbage family, which includes vegetables such as Brussel sprouts and kale. Although the tastes are different, broccoli and these other vegetables are from the same family."
  },
  {
    "id": 3,
    "productName": "Baby Carrots",
    "image": "🥕",
    "from": "France",
    "nutrients": "Vitamin A, Vitamin K",
    "quantity": "20 🥕",
    "price": "3.00",
    "organic": true,
    "description": "The carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty and highly nutritious. Carrots are a particularly good source of beta-carotene, fiber, vitamin K, potassium and antioxidants. Carrots have a number of health benefits. They are a weight loss friendly food and have been linked to lower cholesterol levels and improved eye health."
  },
  {
    "id": 4,
    "productName": "Sweet Corncobs",
    "image": "🌽",
    "from": "Germany",
    "nutrients": "Vitamin C, Magnesium",
    "quantity": "2 🌽",
    "price": "2.00",
    "organic": false,
    "description": "Also known as maize, corn is one of the most popular cereal grains in the world. Popcorn and sweet corn are commonly eaten varieties, but refined corn products are also widely consumed, frequently as ingredients in foods. These include tortillas, tortilla chips, polenta, cornmeal, corn flour, corn syrup, and corn oil. Whole-grain corn is as healthy as any cereal grain, rich in fiber and many vitamins, minerals, and antioxidants."
  }
]
`;
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemp = require("./modules/replaceTemp");
const data = JSON.parse(s);
const templateOver = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
//TODO
const templatePro = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
const slugs = data.map((el) => slugify(el.productName));
console.log(slugs);
const templateCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const cards = data.map((el) => replaceTemp(templateCard, el)).join("");
const out = templateOver.replace("{%pro_cards%}", cards);
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  //everey time the path changed the call sever work like state ****
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(out);
  } else if (pathname === "/product") {
    const output = replaceTemp(templatePro, data[query.id]);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);
  } else {
    res.writeHead(404, "sssa", {
      "Content-type": "text/html",
      "my-own-header": "hello-page",
    });

    res.end(`<div><h1>Page not found</h1>
    <p>yes</p></div>`);
  }
});

server.listen("5500", "127.0.0.1", () => {
  console.log("listening");
});
