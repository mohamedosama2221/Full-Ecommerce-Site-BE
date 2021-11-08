const mongoose = require("mongoose");

const Product = mongoose.Schema(
  {
    name: {
      required: [true, "Please provide a product name"],
      minlength: [5, "Product name can't be less than 5 characters"],
      maxlength: [50, "Product name can't be more than 50 characters"],
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide product description"],
      maxlength: [500, "Product description can't be more than 500 characters"],
    },
    category: {
      required: [true, "Please provide a category"],
      type: String,
      enum: {
        values: [
          "office",
          "kitchen",
          "bedroom",
          "electronics",
          "cosmetic",
          "toys",
          "books",
          "video games",
          "sports & fitness",
          "other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide a valid price"],
    },
    company: {
      required: [true, "Please provide a company"],
      type: String,
      enum: {
        values: [
          "Apple",
          "Ikea",
          "Microsoft",
          "Kartell",
          "Ashley HomeStore",
          "Sony",
          "LG",
          "EA",
          "Toys r Us",
          "Samsung",
          "Oppo",
          "liddy",
          "marcos",
          "Nintendo",
          "Rockstar Games",
          "Amazon",
          "L'Oréal",
          "Unilever",
          "Adidas",
          "Puma",
          "Nike",
          "Reebok",
          "Beiersdorf",
          "other",
        ],
        message: "{VALUE} is not a valid company",
      },
    },
    colors: {
      type: [String],
      default: ["red"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 25,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: [true, "Please provide rating"],
        },
        comment: {
          type: String,
          required: [true, "Please provide review text"],
        },
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    numbOfReviews: {
      type: Number,
      default: 0,
    },
    reviewAverage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
