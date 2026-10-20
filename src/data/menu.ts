export type Dish = {
  name: string
  price: number
  desc?: string
  jain?: boolean
  weekday169?: boolean // "₹169 till 7 pm only on weekdays"
}
export type Category = { id: string; label: string; note?: string; img: string; dishes: Dish[] }

export const WHATSAPP = '919737020808'
export const MENU_PDF = '/Restro-Asia-Menu-2026.pdf'

export const categories: Category[] = [
  {
    id: 'ramen', label: 'Ramen', img: '/gen/menu-ramen.webp',
    note: 'Authentic ramens are made from vegetable & mushroom broth — Jain not available.',
    dishes: [
      { name: 'Miso Ramen', price: 460, desc: 'Savory miso broth with noodles, shiitake, corn, and a kick of chili oil.' },
      { name: 'Kimchi Ramen', price: 460, jain: true, desc: 'Boiled noodles tossed with gochujang or Schezwan sauce, veggies and a bold, zesty broth.' },
      { name: 'Kurume Coconut Ramen', price: 460, jain: true, desc: 'Boiled ramen, coconut, mushroom paneer and veggies.' },
      { name: 'Shio Ramen', price: 460, jain: true, desc: 'Light ramen with fresh vegetables, paneer, in a savory broth.' },
      { name: 'Chilli Garlic Ramen', price: 430, desc: 'Mushrooms, bok choy & bell peppers tossed in a spicy garlic-chilli sauce.' },
      { name: 'Oshionam Ramen', price: 549, desc: 'Noodles, fresh vegetables, and paneer in a light, savory vegetable broth.' },
      { name: 'Misonaki Ramen', price: 599, desc: 'A hearty bowl of ramen featuring miso-seasoned vegetable broth, shiitake mushrooms, and sweet corn.' },
      { name: 'Authentic Veg Ramen', price: 599, desc: 'A soul-soothing bowl of authentic veg ramen, brimming with rich miso broth, fresh vegetables, and bold umami flavors.' },
      { name: 'Kimchionara Ramen', price: 599, desc: 'Ramen noodles with fresh kimchi, gochujang veggies, and a bold, zesty vegetable broth.' },
      { name: 'Kurumenara Ramen', price: 549, desc: 'Ramen noodles with button mushrooms, paneer, and a creamy coconut vegetable broth.' },
      { name: 'Veg Laksa Ramen', price: 649, desc: 'Topped with paneer, momo nori sheet and veggies in a tangy, spicy broth, chef’s special sauce.' },
    ],
  },
  {
    id: 'sushi', label: 'Sushi', img: '/gen/menu-sushi.webp',
    note: 'Kindly check with staff about Jain for sushi.',
    dishes: [
      { name: 'Avocado Yuki Role', price: 599, desc: 'Seasoned rice, carrot, cucumber, avocado and paneer in nori, finished with cheese sauce, chili seasoning, soy and wasabi.' },
      { name: 'Zen Veg Maki', price: 499, desc: 'Seasoned rice, crisp carrot and cucumber wrapped in nori; soy sauce, pickled ginger and wasabi.' },
      { name: 'Chef’s Special Uramaki Roll', price: 599, desc: 'Carrot, cucumber, asparagus, sushi rice and creamy cheese sauce.' },
    ],
  },
  {
    id: 'bowls', label: 'Bowls', img: '/gen/menu-bowls.webp',
    dishes: [
      { name: 'Korean Bibimbap', price: 460, desc: 'Sautéed vegetables, gochujang sauce and sesame, with a side of kimchi.' },
      { name: 'Pad Thai Bowl', price: 460, jain: true, desc: 'Flat noodles tossed on wok with broccoli salad and sesame cottage cheese.' },
      { name: 'Paneer Hao Wei Bowl', price: 460, jain: true, desc: 'Butter pepper rice and marinated cottage cheese with yogurt, wok-tossed in chef’s special sauce.' },
      { name: 'Thai Curry Rice Bowl', price: 460, jain: true, desc: 'Exotic veggies, Thai paste and coconut flavour with rice — choose green, red or yellow.' },
      { name: 'Famous Ramen Bowl', price: 460, jain: true, desc: 'Chopped cilantro, jalapeño, carrots, baby bokchoy, pan-fried paneer and ramen noodles, sesame garnish.' },
      { name: 'Pot Rice', price: 450, jain: true, desc: 'Flavorful rice with stir-fried veggies and Asian sauces, served hot in a clay pot.' },
      { name: 'Mexican Burrito Bowl', price: 399, jain: true, desc: 'Rice, beans, veggies and salsa, layered with bold Mexican spices.' },
      { name: 'Fries K Saath Nacho', price: 340, desc: 'Crunchy nachos, cheese and tangy sauces — perfect for sharing.' },
    ],
  },
  {
    id: 'noodles', label: 'Noodles & Rice', img: '/gen/menu-noodles.webp',
    dishes: [
      { name: 'Pad Thai Noodles', price: 399, desc: 'Flat steamed noodles tossed on wok in peanut and chilli sauce.' },
      { name: 'Thai Paneer Noodles', price: 345, jain: true, desc: 'Boiled noodles, exotic veggies and cottage cheese in spicy Thai sauce.' },
      { name: 'Kimchi Noodles', price: 345, jain: true, desc: 'Triangle-cut exotic veggies and cottage cheese tossed in special kimchi sauce.' },
      { name: 'Hakka Noodles', price: 285, jain: true, weekday169: true, desc: 'Steamed noodles and julienne veggies tossed on wok with soya & chilli sauces.' },
      { name: 'Bo Cai Rice', price: 399, jain: true, desc: 'Chunk-fried cottage cheese tossed on wok in pesto sauce.' },
      { name: 'Korean Kimchi Rice', price: 399, jain: true, desc: 'Stir-fried rice with spicy, tangy kimchi and mixed vegetables.' },
      { name: 'Veg Fried Rice', price: 285, jain: true, weekday169: true, desc: 'Cooked rice & chunked veggies.' },
      { name: 'Chinese Bhel', price: 285, jain: true, weekday169: true, desc: 'Manchurian, noodles, rice and savory sauce combined.' },
      { name: 'Ning Jing Red Sauce', price: 355, jain: true, desc: 'Cube paneer & exotic veggies in red chilli sauce.' },
      { name: 'Manchurian Gravy', price: 299, jain: true, weekday169: true, desc: 'Chopped garlic & onion, ginger, chilli and soya sauce.' },
    ],
  },
  {
    id: 'starters', label: 'Starters', img: '/gen/menu-starters.webp',
    dishes: [
      { name: 'Yasai Renkon Delight', price: 499, desc: 'Crunchy lotus stem and water chestnut tossed with French beans, onions, spring onions and capsicums in chef’s oriental sauce.' },
      { name: 'Tori No Su Paneer', price: 400, jain: true, desc: 'Stir-fried Asian noodles rolled with tender paneer cubes in special Asian sauces.' },
      { name: 'Douchi Paneer', price: 360, desc: 'Cube-cut paneer prepared Malaysian style, tossed on wok in douchi sauce.' },
      { name: 'Zesty Pickled Shrooms', price: 360, desc: 'Button mushroom and bamboo, stir-fried in dark sweet soya sauce.' },
      { name: 'Dragon Pockets', price: 350, jain: true, desc: 'Delicate dumplings filled with seasoned vegetables, steamed or fried, with tangy dipping sauce.' },
      { name: 'Chiang Mai Mushroom & Paneer', price: 350, desc: 'Crispy fried cottage cheese and button mushroom, stir-fried in Chiang Mai sauce.' },
      { name: 'Su Cui Potato', price: 320, desc: 'Potato tossed on wok in peri peri sauce.' },
      { name: 'Paneer Chili Dry', price: 320, jain: true, desc: 'Diamond-cut paneer, dice chilli, tringle bell pepper tossed on wok in soya sauce.' },
      { name: 'Manchurian Dry', price: 290, jain: true, weekday169: true, desc: 'The all-time favourite Manchurian.' },
    ],
  },
  {
    id: 'soups', label: 'Soups & Salad', img: '/gen/menu-soups.webp',
    dishes: [
      { name: 'Curry Dumpling Noodle Soup', price: 285, desc: 'Coconut milk curry mixed with dumpling and love.' },
      { name: 'Veg Burmese Khao Suey Soup', price: 350, desc: 'Chunked exotic veggies served with some condiments.' },
      { name: 'Mexibean Delight Soup', price: 275, jain: true, desc: 'Hearty, spiced soup with rajma, corn, capsicum and tomato.' },
      { name: 'Veg Manchow Soup', price: 230, jain: true, desc: 'Chopped mix of vegetables with crispy noodles.' },
      { name: 'Veg Tom Yum Soup', price: 220, desc: 'Thai-based soup with steamed noodles and stir veggies.' },
      { name: 'Veg Thupka Soup', price: 220, jain: true, desc: 'Spicy Himalayan noodle soup with veggies and broth.' },
      { name: 'Zen Vegan Shucai Bowl', price: 285, desc: 'Salad — crunchy mix of vegetables in a tangy sesame-soy dressing with ginger and chilli.' },
    ],
  },
  {
    id: 'drinks', label: 'Mocktails & Meals', img: '/gen/menu-mocktails.webp',
    note: 'Chinese Meals available till 7 pm, weekdays only. Cold drinks ₹100 (Thums Up, Coke/Diet Coke, Sprite, Fanta).',
    dishes: [
      { name: 'Classic Sour Rita', price: 299 }, { name: 'Cranberry Sour Rita', price: 329 }, { name: 'Prism Fizz', price: 359 },
      { name: 'Classic Mint Splash', price: 249 }, { name: 'Berry Mint Mojito', price: 269 }, { name: 'Sapphire Mojito', price: 269 }, { name: 'Midnight Splash', price: 359 },
      { name: 'Small Oriental Meal', price: 199, jain: true, desc: 'Manchurian gravy, fried rice, crispy veg & kimchi salad.' },
      { name: 'Large Oriental Meal', price: 299, jain: true, desc: 'Manchurian gravy, noodles, fried rice, crispy veg & kimchi salad.' },
    ],
  },
]

export const ramens = [
  { id: 'miso', name: 'Miso Ramen', price: 460, mood: 'Savory miso broth, shiitake, sweet corn and a kick of chili oil.', img: '/gen/ramen-miso.webp', from: '#5C1519', to: '#C9282D', glow: '#D9A441' },
  { id: 'kimchi', name: 'Kimchi Ramen', price: 460, mood: 'Gochujang heat, tangy kimchi, a bold and zesty broth.', img: '/gen/ramen-kimchi.webp', from: '#3A0B0E', to: '#E0452B', glow: '#FDEBAD' },
  { id: 'kurume', name: 'Kurume Coconut Ramen', price: 460, mood: 'Silky coconut broth, mushroom paneer and gentle spice.', img: '/gen/ramen-kurume.webp', from: '#3B2A12', to: '#D9A441', glow: '#FFF8E1' },
  { id: 'laksa', name: 'Veg Laksa Ramen', price: 649, mood: 'Our most indulgent bowl — tangy, spicy, finished with momo nori.', img: '/gen/ramen-laksa.webp', from: '#1B0F0D', to: '#8A2B15', glow: '#C9282D' },
]
