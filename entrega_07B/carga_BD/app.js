import productsModel from "./product.js"
import mongoose from "mongoose";
import express from "express";
const environment = async () => {
    await mongoose
    .connect("mongodb+srv://coderhouse:coderhouse@cluster0.zqar76h.mongodb.net/ecommerce" )

    let result = await productsModel.insertMany([
    {   name: "producto 1",
        description: " Este es el producto 1",
        price: 20,
        category: "Producto tipo A",
        availability: 15,
    },

    {   name: "producto 2",
        description: " Este es el producto 2",
        price: 25,
        category: "Producto tipo A",
        availability: 5,
    },

    {   name: "producto 3",
        description: " Este es el producto 3",
        price: 50,
        category: "Producto tipo B",
        availability: 2,
    },

    {   name: "producto 4",
        description: " Este es el producto 4",
        price: 120,
        category: "Producto tipo C",
        availability: 20,
    },

    {   name: "producto 5",
        description: " Este es el producto 5",
        price: 55,
        category: "Producto tipo B",
        availability: 2,
    },

    {   name: "producto 6",
        description: " Este es el producto 6",
        price: 15,
        category: "Producto tipo C",
        availability: 10,
    },

    {   name: "producto 7",
        description: " Este es el producto 7",
        price: 10,
        category: "Producto tipo C",
        availability: 4,
    },

    {   name: "producto 8",
        description: " Este es el producto 8",
        price: 140,
        category: "Producto tipo D",
        availability: 20,
    },

    {   name: "producto 9",
        description: " Este es el producto 9",
        price: 10,
        category: "Producto tipo B",
        availability: 5,
    },

    {   name: "producto 10",
        description: " Este es el producto 10",
        price: 210,
        category: "Producto tipo D",
        availability: 20,
    },

    {   name: "producto 11",
        description: " Este es el producto 11",
        price: 70,
        category: "Producto tipo C",
        availability: 20,
    },

    {   name: "producto 12",
        description: " Este es el producto 12",
        price: 45,
        category: "Producto tipo A",
        availability: 20,
    },
    {   name: "producto 13",
        description: " Este es el producto 13",
        price: 65,
        category: "Producto tipo A",
        availability: 20,
    },

    {   name: "producto 14",
        description: " Este es el producto 14",
        price: 110,
        category: "Producto tipo C",
        availability: 5,
    },

    {   name: "producto 16",
        description: " Este es el producto 16",
        price: 20,
        category: "Producto tipo D",
        availability: 10,
    },


    {   name: "producto 17",
        description: " Este es el producto 17",
        price: 50,
        category: "Producto tipo B",
        availability: 29,
    },

    {   name: "producto 18",
        description: " Este es el producto 18",
        price: 80,
        category: "Producto tipo E",
        availability: 50,
    },

    {   name: "producto 19",
        description: " Este es el producto 19",
        price: 20,
        category: "Producto tipo A",
        availability: 15,
    },

    {   name: "producto 20",
        description: " Este es el producto 20",
        price: 150,
        category: "Producto tipo A",
        availability: 5,
    },

    ])
    console.log(result)
}
environment()
