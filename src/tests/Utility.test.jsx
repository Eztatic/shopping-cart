import { describe, it, expect } from 'vitest';

import { calculatePrice, calculateNumberOfItems, toTitleCase } from '../components/Utility';

describe('test utility functions', () => {
      const cartItems = [
            {
                  title: 'item 1',
                  price: 10.00,
                  quantity: 3
            },
            {
                  title: 'item 2',
                  price: 20.00,
                  quantity: 2
            },
            {
                  title: 'item 3',
                  price: 30.00,
                  quantity: 1
            }
      ]

      it('calculates the total price of items', () => {
            expect(calculatePrice(cartItems)).toBe('$100.00');
      })

      it('calculates the quantity of items in the cart', () => {
            expect(calculateNumberOfItems(cartItems)).toBe(6);
      })

      it('converts a string to title case format', () => {
            expect(toTitleCase("I love chocolate")).toBe("I Love Chocolate");
            expect(toTitleCase("redRibbon")).toBe("Red Ribbon");
            expect(toTitleCase("TheRedSun")).toBe("The Red Sun");
            expect(toTitleCase("snake_case_format")).toBe("Snake Case Format");
      })
})