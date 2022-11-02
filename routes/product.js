const Product = require("../modules/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/get/:username", async (req, res) => {
  try {
    const product = await Product.find({ posterUsername: req.params.username });
    if (product.length === 0) {
      res.status(401).json({
        status: "fail",
        message: "This user has no products",
      });
    } else res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/gets/:username", async (req, res) => {
  try {
    const product = await Product.find({ bidderUsername: req.params.username });
    if (product.length === 0) {
      res.status(401).json({
        status: "fail",
        message: "This user has no products",
      });
    } else res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res, next) => {
  const qNew = req.query.new;
  const qSearch = req.query.search;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createAt: -1 }).limit(1);
    } else if (qSearch) {
      const search = (data) => {
         return data.filter(
          (item) =>
            item.title.toLowerCase().includes(qSearch) ||
            item.desc.toLowerCase().includes(qSearch) ||
            item.categories[0]?.toLowerCase().includes(qSearch) ||
            item.categories[1]?.toLowerCase().includes(qSearch) ||
            item.categories[2]?.toLowerCase().includes(qSearch) ||
            item.categories[3]?.toLowerCase().includes(qSearch)
        );
      };
      products = await Product.find({})
      products = search(products)
    } else {
      products = await Product.find();
    }

   return res.status(200).json(products);
  } catch (err) {
   return res.status(500).json(err);
  }
});

module.exports = router;
