import React, { useMemo, useState } from "react";
import Table from "../table/Table";

export const products = [
  {
    id: 'p1q2w3e4r5t6y7u8i9o0',
    name: 'iPhone 12',
    description: 'A high-end smartphone with advanced features.',
    category: 'Electronics',
    price: 999,
    quantity: 50,
  },
  {
    id: 'p9a8s7d6f5g4h3j2k1l0',
    name: 'Nike Air Max 270',
    description: 'Stylish and comfortable athletic shoes.',
    category: 'Footwear',
    price: 129,
    quantity: 100,
  },
  {
    id: 'q2w3e4r5t6y7u8i9o0p1',
    name: 'Samsung QLED TV',
    description: 'A high-quality television with stunning picture quality.',
    category: 'Electronics',
    price: 1499,
    quantity: 20,
  },
  {
    id: 'a1s2d3f4g5h6j7k8l9p0',
    name: 'Canon EOS 5D Mark IV',
    description: 'A professional DSLR camera with exceptional image quality.',
    category: 'Electronics',
    price: 2499,
    quantity: 10,
  },
  {
    id: 'zxcvbnmasdfghjklqwerty1',
    name: 'Adidas Ultra Boost',
    description: 'Premium running shoes for ultimate comfort and performance.',
    category: 'Footwear',
    price: 179,
    quantity: 80,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmik1',
    name: 'Amazon Echo Dot',
    description: 'A smart speaker with Alexa voice assistant built-in.',
    category: 'Electronics',
    price: 49,
    quantity: 120,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuyt2',
    name: 'MacBook Pro',
    description: 'A powerful and portable laptop for professional use.',
    category: 'Electronics',
    price: 1999,
    quantity: 30,
  },
  {
    id: 'poiuytrewqasdfghjklmnbv3',
    name: 'Sony PlayStation 5',
    description: 'The next-generation gaming console with immersive gaming experiences.',
    category: 'Gaming',
    price: 499,
    quantity: 15,
  },
  {
    id: 'asdfghjklpoiuytrewqzxc4',
    name: 'GoPro HERO9 Black',
    description: 'A versatile action camera for capturing epic moments.',
    category: 'Electronics',
    price: 349,
    quantity: 25,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyui5',
    name: 'Bose QuietComfort Earbuds',
    description: 'True wireless noise-canceling earbuds with exceptional sound quality.',
    category: 'Electronics',
    price: 279,
    quantity: 40,
  },
  {
    id: 'qweasd123zxc456rfv789t6',
    name: 'Samsung Galaxy Tab S7+',
    description: 'A premium Android tablet with a stunning display.',
    category: 'Electronics',
    price: 849,
    quantity: 20,
  },
  {
    id: 'yuioplkjhgfdsamnbvcxzqwe7',
    name: 'Fitbit Versa 3',
    description: 'A smartwatch with advanced health and fitness tracking features.',
    category: 'Accessories',
    price: 229,
    quantity: 60,
  },
  {
    id: 'nbvcxzlkjhgfdsaqwertyuio8',
    name: 'LG OLED CX Series TV',
    description: 'A high-quality OLED TV with exceptional color accuracy.',
    category: 'Electronics',
    price: 1999,
    quantity: 15,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuyt99',
    name: 'Apple AirPods Pro',
    description: 'Wireless earbuds with active noise cancellation and superior sound quality.',
    category: 'Electronics',
    price: 249,
    quantity: 50,
  },
  {
    id: 'poiuytrewqasdfghjklmnbv0',
    name: 'Nintendo Switch',
    description: 'A versatile gaming console that can be used both handheld and on the TV.',
    category: 'Gaming',
    price: 299,
    quantity: 30,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyuio11',
    name: 'Microsoft Surface Pro 7',
    description: 'A powerful and versatile 2-in-1 laptop with a detachable keyboard.',
    category: 'Electronics',
    price: 899,
    quantity: 25,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikol12',
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Wireless noise-canceling headphones with excellent sound quality.',
    category: 'Electronics',
    price: 349,
    quantity: 60,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuytrewq13',
    name: 'Apple Watch Series 6',
    description: 'A feature-packed smartwatch with health tracking capabilities.',
    category: 'Accessories',
    price: 399,
    quantity: 35,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyuiop14',
    name: 'Bose QuietComfort 35 II',
    description: 'Wireless noise-canceling headphones for an immersive audio experience.',
    category: 'Electronics',
    price: 299,
    quantity: 70,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp15',
    name: 'Samsung Galaxy S21',
    description: 'A flagship smartphone with a stunning display.',
    category: 'Electronics',
    price: 1099,
    quantity: 40,
  },
  {
    id: 'poiuytrewqasdfghjklmnbvcxz16',
    name: 'Dell XPS 13',
    description: 'An ultraportable laptop with exceptional performance.',
    category: 'Electronics',
    price: 1299,
    quantity: 20,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp17',
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Wireless noise-canceling headphones with excellent sound quality.',
    category: 'Electronics',
    price: 349,
    quantity: 60,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuytrewq18',
    name: 'Apple Watch Series 6',
    description: 'A feature-packed smartwatch with health tracking capabilities.',
    category: 'Accessories',
    price: 399,
    quantity: 35,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyuiop19',
    name: 'Bose QuietComfort 35 II',
    description: 'Wireless noise-canceling headphones for an immersive audio experience.',
    category: 'Electronics',
    price: 299,
    quantity: 70,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp20',
    name: 'Samsung Galaxy S21',
    description: 'A flagship smartphone with a stunning display.',
    category: 'Electronics',
    price: 1099,
    quantity: 40,
  },
  {
    id: 'poiuytrewqasdfghjklmnbvcxz21',
    name: 'Dell XPS 13',
    description: 'An ultraportable laptop with exceptional performance.',
    category: 'Electronics',
    price: 1299,
    quantity: 20,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp22',
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Wireless noise-canceling headphones with excellent sound quality.',
    category: 'Electronics',
    price: 349,
    quantity: 60,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuytrewq23',
    name: 'Apple Watch Series 6',
    description: 'A feature-packed smartwatch with health tracking capabilities.',
    category: 'Accessories',
    price: 399,
    quantity: 35,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyuiop24',
    name: 'Bose QuietComfort 35 II',
    description: 'Wireless noise-canceling headphones for an immersive audio experience.',
    category: 'Electronics',
    price: 299,
    quantity: 70,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp25',
    name: 'Samsung Galaxy S21',
    description: 'A flagship smartphone with a stunning display.',
    category: 'Electronics',
    price: 1099,
    quantity: 40,
  },
  {
    id: 'poiuytrewqasdfghjklmnbvcxz26',
    name: 'Dell XPS 13',
    description: 'An ultraportable laptop with exceptional performance.',
    category: 'Electronics',
    price: 1299,
    quantity: 20,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp27',
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Wireless noise-canceling headphones with excellent sound quality.',
    category: 'Electronics',
    price: 349,
    quantity: 60,
  },
  {
    id: 'mnbvcxzlkjhgfdsapoiuytrewq28',
    name: 'Apple Watch Series 6',
    description: 'A feature-packed smartwatch with health tracking capabilities.',
    category: 'Accessories',
    price: 399,
    quantity: 35,
  },
  {
    id: 'zxcvbnmlkjhgfdsswertyuiop29',
    name: 'Bose QuietComfort 35 II',
    description: 'Wireless noise-canceling headphones for an immersive audio experience.',
    category: 'Electronics',
    price: 299,
    quantity: 70,
  },
  {
    id: 'qazwsxedcrfvtgbyhnujmikolp30',
    name: 'Samsung Galaxy S21',
    description: 'A flagship smartphone with a stunning display.',
    category: 'Electronics',
    price: 1099,
    quantity: 40,
  },
];

console.log(products);




const Products = () => {
  const [query, setQuery] = useState("");

const handleChange = (e) => {
  const { value, name } = e.target;
  setQuery(value);
};

const filteredList = () => {
  if (query) {
    return  products.filter((each) => {
      const { id, name, category, price, description, quantity } = each;
      return (
       /*  id.toLowerCase().includes(query.toLowerCase()) || */
        name.toLowerCase().includes(query.toLowerCase()) 
        /* category.toLowerCase().includes(query.toLowerCase()) ||
        price.toString().toLowerCase().includes(query.toLowerCase()) ||
        quantity.toString().toLowerCase().includes(query.toLowerCase()) */
      );
    });
  }
  
    

    return products
  
  
};




console.log(filteredList());
  return (
    <div className="">
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          className="w-full border-2 rounded-md justify-center items-center max-w-xl p-2 border-blue-500"
          placeholder="Search the products by the fields..."
          onChange={handleChange}
        />
      </div>
      <h2 className="text-center p-3 font-bold text-2xl underline text-blue-700">
        Inventory
      </h2>
      <Table array={filteredList()} />
    </div>
  );
};

export default Products;
