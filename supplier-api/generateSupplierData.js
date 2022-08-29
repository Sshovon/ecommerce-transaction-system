const Product = require("./src/models/productModel");
const createHash = require("hash-generator");
const hashLength = 6;

const addProduct = async () => {
  const product = new Product({
    name: "IPhone 13",
    price: "60000",
    quantity: "10",
    description:
      "iPhone 13 Pro takes a huge leap forward, bringing incredible speed to everything you do and dramatic new photo and video capabilities — all in two great sizes.",
    category: "Electronics",
    rating: 5,
    sellerID: "33333",
  });
  product.productID = createHash(hashLength);

  await Promise.all([product.save()]);
};

//addProduct();
