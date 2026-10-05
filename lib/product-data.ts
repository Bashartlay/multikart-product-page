export type ProductVariant = {
  id: string
  color: string
  images: string[]
}

export const product = {
  name: 'Gym Coords Set',
  price: 15,
  sku: 'SP18 (COPY)',
  unit: '1 Item',
  weight: '150 Gms',
  stockStatus: 'In stock',
  quantityLeft: 40,
  cartWatchers: 30,
  variants: [
    {
      id: 'brown',
      color: 'Brown',
      images: [
        '/products/brown-1.jpg',
        '/products/brown-2.jpg',
        '/products/brown-3.jpg',
      ],
    },
    { id: 'blue', color: 'Blue', images: ['/products/blue-1.jpg'] },
    { id: 'green', color: 'Green', images: ['/products/green-1.jpg'] },
  ] satisfies ProductVariant[],
  description: [
    '"Gym Coords Set" offers a comprehensive solution for those seeking comfort and style in their workout attire. This coordinated set is meticulously designed to elevate your gym experience, blending functionality with fashion seamlessly. Crafted from high-quality, breathable fabrics, each piece in the set ensures optimal performance and comfort during your exercise routines.',
    "The set includes everything you need for a complete workout ensemble, featuring coordinating tops, bottoms, and accessories. Whether you're hitting the treadmill, pumping iron, or attending a yoga class, the Gym Coords Set has you covered in both style and functionality.",
    'With its modern design and versatile color palette, this set transitions effortlessly from the gym to casual outings, making it a practical addition to any active lifestyle. Embrace the confidence and motivation that comes with looking and feeling your best during every workout session with the Gym Coords Set.',
  ],
}

export type RelatedProduct = {
  id: string
  brand: string
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  badge: 'Trending' | 'Featured'
}

export const relatedProducts: RelatedProduct[] = [
  {
    id: 'grey-sport-set',
    brand: 'EnduraFit',
    name: 'Grey Sport Set',
    image: '/products/related-1.jpg',
    price: 12.6,
    originalPrice: 14,
    discount: 10,
    badge: 'Trending',
  },
  {
    id: 'fitted-coords-set-grey',
    brand: 'Thrive Athletica',
    name: 'Fitted Coords Set (Grey)',
    image: '/products/related-2.jpg',
    price: 13.5,
    originalPrice: 15,
    discount: 10,
    badge: 'Trending',
  },
  {
    id: 'athleisure-set',
    brand: 'Thrive Athletica',
    name: 'Athleisure Set',
    image: '/products/related-3.jpg',
    price: 17.1,
    originalPrice: 18,
    discount: 5,
    badge: 'Trending',
  },
  {
    id: 'sport-set-green',
    brand: 'EnduraFit',
    name: 'Sport Set (Green/S)',
    image: '/products/related-4.jpg',
    price: 9,
    originalPrice: 10,
    discount: 10,
    badge: 'Featured',
  },
  {
    id: 'grey-gym-suit',
    brand: 'EnduraFit',
    name: 'Grey Gym Suit (S)',
    image: '/products/related-5.jpg',
    price: 9.5,
    originalPrice: 10,
    discount: 5,
    badge: 'Trending',
  },
]

export const formatPrice = (value: number) => `$${value.toFixed(2)}`
