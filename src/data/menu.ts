import { asset } from '../lib/asset'
export type Dish = {
  name: string
  desc?: string
  jain?: boolean
}
export type Category = { id: string; label: string; note?: string; img: string; dishes: Dish[] }

export const WHATSAPP = '919737020808'
export const MENU_PDF = asset('Restro-Asia-Menu-2026.pdf')

export const categories: Category[] = [
  {
    id: 'ramen', label: 'Ramen', img: asset('gen/menu-ramen.webp'),
    note: 'Authentic ramens are made from vegetable & mushroom broth — Jain not available.',
    dishes: [
      { name: 'Miso Ramen', desc: 'Savory miso broth with noodles, shiitake, corn, and a kick of chili oil.' },
      { name: 'Kimchi Ramen', jain: true, desc: 'Boiled noodles tossed with gochujang or Schezwan sauce, veggies and a bold, zesty broth.' },
      { name: 'Kurume Coconut Ramen', jain: true, desc: 'Boiled ramen, coconut, mushroom paneer and veggies.' },
      { name: 'Shio Ramen', jain: true, desc: 'Light ramen with fresh vegetables, paneer, in a savory broth.' },
      { name: 'Chilli Garlic Ramen', desc: 'Mushrooms, bok choy & bell peppers tossed in a spicy garlic-chilli sauce.' },
      { name: 'Oshionam Ramen', desc: 'Noodles, fresh vegetables, and paneer in a light, savory vegetable broth.' },
      { name: 'Misonaki Ramen', desc: 'A hearty bowl of ramen featuring miso-seasoned vegetable broth, shiitake mushrooms, and sweet corn.' },
      { name: 'Authentic Veg Ramen', desc: 'A soul-soothing bowl of authentic veg ramen, brimming with rich miso broth, fresh vegetables, and bold umami flavors.' },
      { name: 'Kimchionara Ramen', desc: 'Ramen noodles with fresh kimchi, gochujang veggies, and a bold, zesty vegetable broth.' },
      { name: 'Kurumenara Ramen', desc: 'Ramen noodles with button mushrooms, paneer, and a creamy coconut vegetable broth.' },
      { name: 'Veg Laksa Ramen', desc: 'Topped with paneer, momo nori sheet and veggies in a tangy, spicy broth, chef’s special sauce.' },
    ],
  },
  {
    id: 'sushi', label: 'Sushi', img: asset('gen/menu-sushi.webp'),
    note: 'Kindly check with staff about Jain for sushi.',
    dishes: [
      { name: 'Avocado Yuki Role', desc: 'Seasoned rice, carrot, cucumber, avocado and paneer in nori, finished with cheese sauce, chili seasoning, soy and wasabi.' },
      { name: 'Zen Veg Maki', desc: 'Seasoned rice, crisp carrot and cucumber wrapped in nori; soy sauce, pickled ginger and wasabi.' },
      { name: 'Chef’s Special Uramaki Roll', desc: 'Carrot, cucumber, asparagus, sushi rice and creamy cheese sauce.' },
    ],
  },
  {
    id: 'bowls', label: 'Bowls', img: asset('gen/menu-bowls.webp'),
    dishes: [
      { name: 'Korean Bibimbap', desc: 'Sautéed vegetables, gochujang sauce and sesame, with a side of kimchi.' },
      { name: 'Pad Thai Bowl', jain: true, desc: 'Flat noodles tossed on wok with broccoli salad and sesame cottage cheese.' },
      { name: 'Paneer Hao Wei Bowl', jain: true, desc: 'Butter pepper rice and marinated cottage cheese with yogurt, wok-tossed in chef’s special sauce.' },
      { name: 'Thai Curry Rice Bowl', jain: true, desc: 'Exotic veggies, Thai paste and coconut flavour with rice — choose green, red or yellow.' },
      { name: 'Famous Ramen Bowl', jain: true, desc: 'Chopped cilantro, jalapeño, carrots, baby bokchoy, pan-fried paneer and ramen noodles, sesame garnish.' },
      { name: 'Pot Rice', jain: true, desc: 'Flavorful rice with stir-fried veggies and Asian sauces, served hot in a clay pot.' },
      { name: 'Mexican Burrito Bowl', jain: true, desc: 'Rice, beans, veggies and salsa, layered with bold Mexican spices.' },
      { name: 'Fries K Saath Nacho', desc: 'Crunchy nachos, cheese and tangy sauces — perfect for sharing.' },
    ],
  },
  {
    id: 'noodles', label: 'Noodles & Rice', img: asset('gen/menu-noodles.webp'),
    dishes: [
      { name: 'Pad Thai Noodles', desc: 'Flat steamed noodles tossed on wok in peanut and chilli sauce.' },
      { name: 'Thai Paneer Noodles', jain: true, desc: 'Boiled noodles, exotic veggies and cottage cheese in spicy Thai sauce.' },
      { name: 'Kimchi Noodles', jain: true, desc: 'Triangle-cut exotic veggies and cottage cheese tossed in special kimchi sauce.' },
      { name: 'Hakka Noodles', jain: true, desc: 'Steamed noodles and julienne veggies tossed on wok with soya & chilli sauces.' },
      { name: 'Bo Cai Rice', jain: true, desc: 'Chunk-fried cottage cheese tossed on wok in pesto sauce.' },
      { name: 'Korean Kimchi Rice', jain: true, desc: 'Stir-fried rice with spicy, tangy kimchi and mixed vegetables.' },
      { name: 'Veg Fried Rice', jain: true, desc: 'Cooked rice & chunked veggies.' },
      { name: 'Chinese Bhel', jain: true, desc: 'Manchurian, noodles, rice and savory sauce combined.' },
      { name: 'Ning Jing Red Sauce', jain: true, desc: 'Cube paneer & exotic veggies in red chilli sauce.' },
      { name: 'Manchurian Gravy', jain: true, desc: 'Chopped garlic & onion, ginger, chilli and soya sauce.' },
    ],
  },
  {
    id: 'starters', label: 'Starters', img: asset('gen/menu-starters.webp'),
    dishes: [
      { name: 'Yasai Renkon Delight', desc: 'Crunchy lotus stem and water chestnut tossed with French beans, onions, spring onions and capsicums in chef’s oriental sauce.' },
      { name: 'Tori No Su Paneer', jain: true, desc: 'Stir-fried Asian noodles rolled with tender paneer cubes in special Asian sauces.' },
      { name: 'Douchi Paneer', desc: 'Cube-cut paneer prepared Malaysian style, tossed on wok in douchi sauce.' },
      { name: 'Zesty Pickled Shrooms', desc: 'Button mushroom and bamboo, stir-fried in dark sweet soya sauce.' },
      { name: 'Dragon Pockets', jain: true, desc: 'Delicate dumplings filled with seasoned vegetables, steamed or fried, with tangy dipping sauce.' },
      { name: 'Chiang Mai Mushroom & Paneer', desc: 'Crispy fried cottage cheese and button mushroom, stir-fried in Chiang Mai sauce.' },
      { name: 'Su Cui Potato', desc: 'Potato tossed on wok in peri peri sauce.' },
      { name: 'Paneer Chili Dry', jain: true, desc: 'Diamond-cut paneer, dice chilli, tringle bell pepper tossed on wok in soya sauce.' },
      { name: 'Manchurian Dry', jain: true, desc: 'The all-time favourite Manchurian.' },
    ],
  },
  {
    id: 'soups', label: 'Soups & Salad', img: asset('gen/menu-soups.webp'),
    dishes: [
      { name: 'Curry Dumpling Noodle Soup', desc: 'Coconut milk curry mixed with dumpling and love.' },
      { name: 'Veg Burmese Khao Suey Soup', desc: 'Chunked exotic veggies served with some condiments.' },
      { name: 'Mexibean Delight Soup', jain: true, desc: 'Hearty, spiced soup with rajma, corn, capsicum and tomato.' },
      { name: 'Veg Manchow Soup', jain: true, desc: 'Chopped mix of vegetables with crispy noodles.' },
      { name: 'Veg Tom Yum Soup', desc: 'Thai-based soup with steamed noodles and stir veggies.' },
      { name: 'Veg Thupka Soup', jain: true, desc: 'Spicy Himalayan noodle soup with veggies and broth.' },
      { name: 'Zen Vegan Shucai Bowl', desc: 'Salad — crunchy mix of vegetables in a tangy sesame-soy dressing with ginger and chilli.' },
    ],
  },
  {
    id: 'drinks', label: 'Mocktails & Meals', img: asset('gen/menu-mocktails.webp'),
    note: 'Chinese Meals available till 7 pm, weekdays only. Cold drinks: Thums Up, Coke/Diet Coke, Sprite, Fanta.',
    dishes: [
      { name: 'Classic Sour Rita' }, { name: 'Cranberry Sour Rita' }, { name: 'Prism Fizz' },
      { name: 'Classic Mint Splash' }, { name: 'Berry Mint Mojito' }, { name: 'Sapphire Mojito' }, { name: 'Midnight Splash' },
      { name: 'Small Oriental Meal', jain: true, desc: 'Manchurian gravy, fried rice, crispy veg & kimchi salad.' },
      { name: 'Large Oriental Meal', jain: true, desc: 'Manchurian gravy, noodles, fried rice, crispy veg & kimchi salad.' },
    ],
  },
]

export const ramens = [
  { id: 'miso', name: 'Miso Ramen', mood: 'Savory miso broth, shiitake, sweet corn and a kick of chili oil.', img: asset('gen/ramen-miso.webp'), from: '#3E0C0F', to: '#B3262B', glow: '#E7A04A' },
  { id: 'kimchi', name: 'Kimchi Ramen', mood: 'Gochujang heat, tangy kimchi, a bold and zesty broth.', img: asset('gen/ramen-kimchi.webp'), from: '#06190F', to: '#2F6B4E', glow: '#7FB08A' },
  { id: 'kurume', name: 'Kurume Coconut Ramen', mood: 'Silky coconut broth, mushroom paneer and gentle spice.', img: asset('gen/ramen-kurume.webp'), from: '#3A2606', to: '#C8902C', glow: '#FFE7A8' },
  { id: 'laksa', name: 'Veg Laksa Ramen', mood: 'Our most indulgent bowl — tangy, spicy, finished with momo nori.', img: asset('gen/ramen-laksa.webp'), from: '#070505', to: '#3B2C29', glow: '#8C5A3C' },
]
