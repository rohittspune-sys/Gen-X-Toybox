export const PRODUCTS = [
  {
    id: 'r1',
    name: 'Retro Brick Game',
    brand: 'FunTech',
    type: 'Retro Classics',
    price: 29.99,
    ageRange: '6+',
    educationalFocus: ['Coordination'],
    images: [
      'https://images.unsplash.com/photo-1600267175161-cfaa711b4baf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.6,
    reviews: [
      { id: 'rv1', user: 'Alex', rating: 5, text: 'A nostalgia blast! Perfect gift.', date: '2025-02-01' },
      { id: 'rv2', user: 'Maya', rating: 4, text: 'Kids love it on road trips.', date: '2025-02-10' }
    ],
    stock: 25,
    description: 'Handheld retro brick game console with classic puzzles and sounds.'
  },
  {
    id: 'r2',
    name: 'Classic Yo-Yo Pro',
    brand: 'YoMaster',
    type: 'Retro Classics',
    price: 12.99,
    ageRange: '8+',
    educationalFocus: ['Motor Skills'],
    images: [
      'https://images.unsplash.com/photo-1529618160094-9f51f3fb016a?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.3,
    reviews: [
      { id: 'rv3', user: 'Sam', rating: 4, text: 'Smooth spin, great balance.', date: '2025-01-28' }
    ],
    stock: 80,
    description: 'High-performance yo-yo with metal bearings for advanced tricks.'
  },
  {
    id: 'm1',
    name: 'STEM Robotics Kit V2',
    brand: 'EduBot',
    type: 'Modern Learning',
    price: 89.0,
    ageRange: '10+',
    educationalFocus: ['STEM', 'Engineering', 'Coding'],
    images: [
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviews: [
      { id: 'rv4', user: 'Priya', rating: 5, text: 'Fantastic for intro to robotics!', date: '2025-02-05' }
    ],
    stock: 12,
    description: 'Build, program, and innovate with modular robot parts and app lessons.'
  },
  {
    id: 'c1',
    name: 'Limited Edition 90s Action Figure',
    brand: 'RetroForge',
    type: 'For Collectors',
    price: 149.99,
    ageRange: '14+',
    educationalFocus: ['History'],
    images: [
      'https://images.unsplash.com/photo-1586125674857-c4201f7aa26a?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviews: [
      { id: 'rv5', user: 'Jordan', rating: 5, text: 'Mint-condition packaging!', date: '2025-02-03' }
    ],
    stock: 6,
    description: 'Collector-grade figure with premium articulation and retro cardback.'
  },
  {
    id: 'm2',
    name: 'Magnetic Building Tiles 100pc',
    brand: 'BrightBlocks',
    type: 'Modern Learning',
    price: 59.0,
    ageRange: '3+',
    educationalFocus: ['Creativity', 'STEM'],
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviews: [],
    stock: 40,
    description: 'Colorful magnetic tiles to inspire imaginative structures and thinking.'
  }
];

export const BRANDS = [...new Set(PRODUCTS.map(p => p.brand))];
export const COLLECTIONS = ['Retro Classics', 'Modern Learning', 'For Collectors'];
export const AGE_RANGES = ['3+', '6+', '8+', '10+', '12+', '14+'];
export const FOCUS = ['STEM', 'Creativity', 'Coding', 'Engineering', 'History', 'Motor Skills', 'Coordination'];

export const BLOG_POSTS = [
  {
    id: 'b1',
    title: 'Top 7 Retro Toys Making a Comeback',
    category: 'Nostalgia',
    excerpt: 'From yo-yos to brick games—why Gen X classics still wow kids today.',
    image: 'https://images.unsplash.com/photo-1512446816042-444d641267ee?q=80&w=1200&auto=format&fit=crop',
    date: '2025-01-22'
  },
  {
    id: 'b2',
    title: 'STEM Toys That Actually Teach',
    category: 'Educational Tips',
    excerpt: 'How to pick learning toys that balance fun and fundamentals.',
    image: 'https://images.unsplash.com/photo-1558487661-9d4f01e2ad63?q=80&w=1200&auto=format&fit=crop',
    date: '2025-02-07'
  },
  {
    id: 'b3',
    title: 'Collector Spotlight: Curating With Care',
    category: 'For Collectors',
    excerpt: 'Preservation, grading, and display—best practices from pros.',
    image: 'https://images.unsplash.com/photo-1544551763-7ef42090b82a?q=80&w=1200&auto=format&fit=crop',
    date: '2025-02-10'
  }
];