import { createContext } from 'react';
import defaultImg from '/src/assets/shopping-bag.jpg';

const defaultData = [
      {
            category: "category title",
            id: 1,
            image: defaultImg,
            imgURL: defaultImg,
            price: 10.00,
            title: "Item Name",
            description: "Item Description",
            quantity: 1,
      },
      {
            category: "category title",
            id: 2,
            image: defaultImg,
            imgURL: defaultImg,
            price: 20.00,
            title: "Item Name",
            description: "Item Description",
            quantity: 1,
      },
      {
            category: "category title",
            id: 3,
            image: defaultImg,
            imgURL: defaultImg,
            price: 30.00,
            title: "Item Name",
            description: "Item Description",
            quantity: 1,
      }
];

const CartContext = createContext(defaultData);

export default CartContext;