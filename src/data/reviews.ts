// Real guest reviews only — never invent these. Quotes are verbatim (light punctuation tidy only).
// Sources: restroasia.com testimonials; Zomato dining reviews (zomato.com/surat/restro-asia-vesu/reviews, Oct 2026).
// To add more, copy them word-for-word from Google or Zomato.
export type Review = { quote: string; name: string; source: 'Website' | 'Zomato' | 'Google' }

export const GOOGLE_RATING = { score: 4.6, count: 396 } // Google Maps listing, Oct 2026

export const reviews: Review[] = [
  { quote: 'Best Chinese cuisine… superb taste… very hygienic… and service all time great… must visit.', name: 'Mihir Shah', source: 'Website' },
  { quote: 'Food taste is excellent. Soup 4/5, hunan paneer 5/5, kimchi noodles 4/5. Overall a very good place for Chinese / Asian cuisine lovers.', name: 'Ananya', source: 'Zomato' },
  { quote: 'Authentic Chinese food! Kimchi is to die for. Ask for extra hot sauce. Very friendly host and staff — just ask if you want to try authentic Asian food.', name: 'Vaibhav Chokhawala', source: 'Website' },
  { quote: 'Great food and nice service.', name: 'Pratik Pancholi', source: 'Zomato' },
  { quote: 'Best food I have tasted, specially Chinese food.', name: 'Prince Jariwala', source: 'Website' },
]

// What guests mention most in Google reviews (topic chips + counts on the listing, Oct 2026)
export const mentions: [string, number][] = [
  ['Ramen bowl', 13], ['Authentic taste', 10], ['Pad thai noodles', 8], ['Kimchi noodles', 5], ['Value for money', 5],
  ['Authentic ramen', 3], ['Spicy miso ramen bowl', 2], ['Burnt garlic rice', 2], ['Manchurian', 2], ['Lotus stem', 2],
]
