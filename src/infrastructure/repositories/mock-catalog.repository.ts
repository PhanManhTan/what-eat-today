import type {
  Dish,
  DishFilter,
} from '@/domain/entities/dish';
import type {
  ICatalogRepository,
  RegionMetadata,
  CategoryMetadata,
} from '@/domain/repositories/catalog-repository.interface';
import { matchesDiacriticInsensitive } from '@/domain/utils/string-utils';

export const MOCK_REGIONS: RegionMetadata[] = [
  {
    id: 'south',
    names: {
      'vi-VN': 'Miền Nam',
      'en-US': 'Southern Vietnam',
    },
    description: {
      'vi-VN': 'Hương vị ngọt thanh, dồi dào rau thơm, nước cốt dừa và văn hóa quán xá sôi động Sài Gòn.',
      'en-US': 'Sweet and savory notes, fresh herbs, rich coconut milk, and vibrant Saigon street food.',
    },
  },
  {
    id: 'central',
    names: {
      'vi-VN': 'Miền Trung',
      'en-US': 'Central Vietnam',
    },
    description: {
      'vi-VN': 'Đậm đà, cay nồng ớt sa tế, mắm ruốc đặc trưng từ ẩm thực Cung đình Huế và duyên hải miền Trung.',
      'en-US': 'Bold, spicy, aromatic with fermented shrimp paste, rooted in Hue imperial cuisine.',
    },
  },
  {
    id: 'north',
    names: {
      'vi-VN': 'Miền Bắc',
      'en-US': 'Northern Vietnam',
    },
    description: {
      'vi-VN': 'Thanh tao, hài hòa gia vị, tôn vinh vị ngọt nguyên bản từ nước dùng ninh xương và giấm bỗng.',
      'en-US': 'Delicate, balanced flavors emphasizing natural broth sweetness and mild acidity.',
    },
  },
];

export const MOCK_CATEGORIES: CategoryMetadata[] = [
  {
    id: 'noodles',
    names: {
      'vi-VN': 'Bún & Phở',
      'en-US': 'Noodles & Pho',
    },
  },
  {
    id: 'rice',
    names: {
      'vi-VN': 'Cơm',
      'en-US': 'Rice Dishes',
    },
  },
  {
    id: 'baguette',
    names: {
      'vi-VN': 'Bánh Mì',
      'en-US': 'Baguettes',
    },
  },
  {
    id: 'pancake-roll',
    names: {
      'vi-VN': 'Bánh & Cuốn',
      'en-US': 'Rolls & Pancakes',
    },
  },
  {
    id: 'drinks',
    names: {
      'vi-VN': 'Đồ Uống & Tráng Miệng',
      'en-US': 'Beverages & Desserts',
    },
  },
];

export const MOCK_DISHES: Dish[] = [
  {
    id: 'com-tam-suon-bi-cha',
    slug: 'com-tam-suon-bi-cha',
    names: {
      'vi-VN': 'Cơm Tấm Sườn Bì Chả',
      'en-US': 'Saigon Broken Rice with Grilled Pork Chop',
    },
    descriptions: {
      'vi-VN':
        'Hạt gạo tấm dẻo thơm ăn kèm sườn heo nướng mật ong xém cạnh, bì thính heo thơm bùi, chả trứng hấp béo ngậy, rưới mỡ hành bóng bẩy và nước mắm chua ngọt đặc trưng Sài Gòn.',
      'en-US':
        'Fragrant broken rice topped with charcoal-grilled marinated pork chop, shredded pork skin, steamed egg meatloaf, scallion oil, and sweet garlic-chili fish sauce.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'rice',
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    primaryImage: {
      id: 'img-com-tam',
      storageKey: 'dishes/com-tam-suon-bi-cha.jpg',
      url: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Đĩa cơm tấm sườn nướng nóng hổi ăn kèm chả trứng và mỡ hành',
        'en-US': 'Saigon broken rice plate with grilled pork chop and scallion oil',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Gạo tấm',
      'Sườn cốt lết heo',
      'Bì heo thính gạo',
      'Chả trứng thịt nấm mèo',
      'Mỡ hành lá',
      'Nước mắm tỏi ớt chua ngọt',
      'Đồ chua củ cải & cà rốt',
    ],
    priceRange: {
      min: 40000,
      max: 65000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Đặc sản Sài Gòn', 'No lâu', 'Món cơm quốc dân', 'Thịt nướng than'],
    isSignature: true,
  },
  {
    id: 'pho-bo-tai-lan',
    slug: 'pho-bo-tai-lan',
    names: {
      'vi-VN': 'Phở Bò Tái Lăn',
      'en-US': 'Wok-Seared Rare Beef Pho',
    },
    descriptions: {
      'vi-VN':
        'Thịt bò tươi thái mỏng được xào lăn trên chảo gang rực lửa cùng gừng và tỏi thơm nức, đặt trên lớp bánh phở mềm mướt và chan nước dùng hầm xương quế hồi ngọt thanh đậm đà.',
      'en-US':
        'Fresh thin beef slices flash-seared in a smoking wok with crushed garlic and ginger, served over silky rice noodles in 12-hour spiced bone broth.',
    },
    originRegion: 'north',
    cuisineId: 'hanoi',
    categoryId: 'noodles',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'late-night'],
    primaryImage: {
      id: 'img-pho-bo',
      storageKey: 'dishes/pho-bo-tai-lan.jpg',
      url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Tô phở bò tái lăn khói nghi ngút đầy hành hoa',
        'en-US': 'Steaming bowl of wok-seared beef pho with green onions',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Bánh phở tươi',
      'Thịt thăn bò tươi',
      'Nước hầm xương bò 12 tiếng',
      'Gừng đập dập & tỏi phi',
      'Hành hoa & mùi tàu',
      'Hoa hồi, quế, thảo quả',
    ],
    priceRange: {
      min: 55000,
      max: 85000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Nước dùng thanh ngọt', 'Bò xào lửa lớn', 'Ăn sáng tuyệt hảo'],
    isSignature: true,
  },
  {
    id: 'bun-bo-hue',
    slug: 'bun-bo-hue',
    names: {
      'vi-VN': 'Bún Bò Huế Đặc Biệt',
      'en-US': 'Hue Imperial Spicy Beef Noodle Soup',
    },
    descriptions: {
      'vi-VN':
        'Sợi bún to tròn trong nước dùng hầm xương đậm vị sả tươi và mắm ruốc cố đô, ăn cùng bắp bò hoa giòn sần sật, giò heo mềm ngậy, chả cua Huế và sa tế cay nồng nàn.',
      'en-US':
        'Thick rice vermicelli in aromatic broth infused with lemongrass and fermented shrimp paste, served with tender beef shank, pork knuckle, and fiery chili oil.',
    },
    originRegion: 'central',
    cuisineId: 'hue',
    categoryId: 'noodles',
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    primaryImage: {
      id: 'img-bun-bo-hue',
      storageKey: 'dishes/bun-bo-hue.jpg',
      url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Tô bún bò Huế đầy ắp bắp bò sa tế và rau thơm',
        'en-US': 'Spicy Hue beef noodle soup with chili oil and herbs',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Bún sợi to',
      'Bắp bò hoa',
      'Giò heo hầm mềm',
      'Chả cua Huế',
      'Mắm ruốc Huế',
      'Sả cây đập dập',
      'Sa tế ớt cay nồng',
      'Bắp chuối bào & rau muống chẻ',
    ],
    priceRange: {
      min: 50000,
      max: 75000,
      currency: 'VND',
    },
    spicyLevel: 3,
    tags: ['Vị sả ruốc đậm đà', 'Cay nồng sa tế', 'Ẩm thực Cung đình'],
    isSignature: true,
  },
  {
    id: 'banh-mi-thit-nuong',
    slug: 'banh-mi-thit-nuong',
    names: {
      'vi-VN': 'Bánh Mì Thịt Nướng Sài Gòn',
      'en-US': 'Saigon Crispy Baguette with Charcoal Grilled Pork',
    },
    descriptions: {
      'vi-VN':
        'Vỏ bánh mì nướng giòn rụm bên ngoài ruột mềm bên trong, kẹp đầy thịt heo ướp sả ớt nướng than hoa thơm lừng, pa-tê gan béo ngậy, dưa leo giòn mát, đồ chua và ngò rí.',
      'en-US':
        'Crispy warm Vietnamese baguette loaded with aromatic lemongrass-grilled pork, rich liver pâté, crunchy pickled daikon, cucumber, cilantro, and chili slices.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'baguette',
    mealTypes: ['breakfast', 'lunch', 'snack'],
    primaryImage: {
      id: 'img-banh-mi',
      storageKey: 'dishes/banh-mi-thit-nuong.jpg',
      url: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Ổ bánh mì thịt nướng sả ớt giòn rụm thơm ngon',
        'en-US': 'Crispy Vietnamese baguette filled with savory grilled meat and pickled veggies',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Bánh mì giòn',
      'Thịt nạc vai heo nướng sả',
      'Pate gan heo béo bùi',
      'Sốt bơ trứng gà',
      'Đồ chua củ cải cà rốt',
      'Dưa leo & ngò rí',
      'Ớt hiểm đỏ',
    ],
    priceRange: {
      min: 25000,
      max: 40000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Đường phố tiện lợi', 'Giòn rụm vỏ bánh', 'Top thế giới'],
    isSignature: true,
  },
  {
    id: 'hu-tieu-nam-vang',
    slug: 'hu-tieu-nam-vang',
    names: {
      'vi-VN': 'Hủ Tiếu Nam Vang (Nước / Khô)',
      'en-US': 'Nam Vang Noodle Soup (Soup / Dry Mix)',
    },
    descriptions: {
      'vi-VN':
        'Sợi hủ tiếu dai mướt kết hợp tôm tươi giòn ngọt, thịt bằm xào tỏi, tim cật luộc mềm mọng, trứng cút trong nước dùng mực nướng củ cải trong veo ngọt thanh tự nhiên.',
      'en-US':
        'Clear chewy rice noodles with fresh sweet shrimp, minced pork, tender quail egg, and fried garlic, available in comforting rich broth or dry tossed in sweet dark soy sauce.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'noodles',
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    primaryImage: {
      id: 'img-hu-tieu',
      storageKey: 'dishes/hu-tieu-nam-vang.jpg',
      url: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Tô hủ tiếu Nam Vang đầy ắp tôm tươi thịt bằm và tóp mỡ',
        'en-US': 'Nam Vang noodle bowl with shrimp, minced pork, and crispy garlic',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Sợi hủ tiếu Sa Đéc dai',
      'Tôm sú tươi ngọt',
      'Thịt nạc bằm xào tỏi thơm',
      'Tim heo & gan luộc',
      'Trứng cút bùi',
      'Tỏi phi giòn & cần tàu tươi',
    ],
    priceRange: {
      min: 45000,
      max: 70000,
      currency: 'VND',
    },
    spicyLevel: 0,
    tags: ['Sợi dai Sa Đéc', 'Nước dùng mực nướng', 'Tôm tươi ngọt'],
  },
  {
    id: 'banh-xeo-mien-tay',
    slug: 'banh-xeo-mien-tay',
    names: {
      'vi-VN': 'Bánh Xèo Miền Tây Khổng Lồ',
      'en-US': 'Crispy Mekong Delta Sizzling Crepe',
    },
    descriptions: {
      'vi-VN':
        'Vỏ bánh mỏng giòn rụm màu vàng nghệ ươm đượm cốt dừa béo bùi, nhân tôm sông, thịt ba chỉ và giá đỗ tươi giòn; cuốn trọn trong lá cải cay, rau rừng chấm đẫm nước mắm tỏi ớt.',
      'en-US':
        'Enormous crisp turmeric-coconut crepe loaded with fresh river shrimp, tender pork belly, and bean sprouts, wrapped inside mustard greens and wild herbs dipped in garlic fish sauce.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'pancake-roll',
    mealTypes: ['lunch', 'dinner'],
    primaryImage: {
      id: 'img-banh-xeo',
      storageKey: 'dishes/banh-xeo-mien-tay.jpg',
      url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Chiếc bánh xèo vàng ươm giòn tan bên rổ rau rừng xanh mướt',
        'en-US': 'Crispy golden Vietnamese crepe served with abundant fresh herbs',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Bột gạo ngâm nghệ tươi & nước cốt dừa',
      'Tôm tươi',
      'Thịt ba chỉ heo xắt mỏng',
      'Giá đỗ tươi ngọt',
      'Rổ rau cải bẹ xanh, lá cóc, sao nhái',
      'Nước mắm pha tỏi ớt tỏi lý sơn',
    ],
    priceRange: {
      min: 50000,
      max: 90000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Giòn rụm béo cốt dừa', 'Cuốn rau rừng', 'Ăn cùng bạn bè'],
  },
  {
    id: 'goi-cuon-tom-thit',
    slug: 'goi-cuon-tom-thit',
    names: {
      'vi-VN': 'Gỏi Cuốn Tôm Thịt Thanh Mát',
      'en-US': 'Fresh Vietnamese Summer Spring Rolls',
    },
    descriptions: {
      'vi-VN':
        'Bánh tráng mỏng dẻo cuốn chặt tôm sú luộc đỏ au, thịt ba rọi luộc mềm ngọt, bún tươi và húng quế hẹ xanh; chấm cùng sốt tương đậu phộng nấu sánh mịn béo ngậy.',
      'en-US':
        'Translucent rice paper rolled tightly around plump poached shrimp, tender pork slices, vermicelli, and crisp aromatic mint, served with decadent warm peanut hoisin dipping sauce.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'pancake-roll',
    mealTypes: ['lunch', 'dinner', 'snack'],
    primaryImage: {
      id: 'img-goi-cuon',
      storageKey: 'dishes/goi-cuon-tom-thit.jpg',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Đĩa gỏi cuốn tôm thịt thanh mát kèm chén tương chấm béo',
        'en-US': 'Fresh Vietnamese spring rolls with peanut dipping sauce',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Bánh tráng gạo dẻo',
      'Tôm sú tươi luộc đỏ',
      'Thịt ba chỉ luộc',
      'Bún tươi',
      'Rau thơm, húng quế, xà lách, lá hẹ',
      'Tương đen hầm đậu phộng rang giã nhuyễn',
    ],
    priceRange: {
      min: 10000,
      max: 20000,
      currency: 'VND',
    },
    spicyLevel: 0,
    tags: ['Thanh nhẹ giải ngấy', 'Ít tinh bột', 'Sốt tương đậu phộng'],
  },
  {
    id: 'bun-cha-ha-noi',
    slug: 'bun-cha-ha-noi',
    names: {
      'vi-VN': 'Bún Chả Hà Nội Nướng Than Hoa',
      'en-US': 'Hanoi Charcoal Grilled Pork with Vermicelli',
    },
    descriptions: {
      'vi-VN':
        'Chả viên và chả miếng ba chỉ tẩm ướp đậm vị nướng than hoa xém cạnh thơm nức mũi, thả trong bát nước chấm ấm nóng chua ngọt thanh kèm đu đủ giòn, ăn với bún và rổ rau sống.',
      'en-US':
        'Smoky grilled pork patties and caramelized pork belly slices immersed in warm, sweet-tangy dipping broth with pickled green papaya, accompanied by fresh vermicelli and herbs.',
    },
    originRegion: 'north',
    cuisineId: 'hanoi',
    categoryId: 'noodles',
    mealTypes: ['lunch', 'dinner'],
    primaryImage: {
      id: 'img-bun-cha',
      storageKey: 'dishes/bun-cha-ha-noi.jpg',
      url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Mẹt bún chả Hà Nội nướng than hoa thơm nức',
        'en-US': 'Traditional Hanoi bun cha set with grilled pork and herbs',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Thịt nạc vai băm viên nướng',
      'Thịt ba chỉ nướng than hoa',
      'Nước mắm pha giấm bỗng chua ngọt',
      'Đu đủ xanh & cà rốt muối chua giòn',
      'Bún lá hoặc bún rối',
      'Rau kinh giới, tía tô, xà lách',
    ],
    priceRange: {
      min: 45000,
      max: 75000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Nướng than hoa', 'Món ăn từng tiếp Tổng thống Obama', 'Đậm vị Bắc'],
  },
  {
    id: 'bun-rieu-cua',
    slug: 'bun-rieu-cua',
    names: {
      'vi-VN': 'Bún Riêu Cua Đồng & Chả Ốc',
      'en-US': 'Freshwater Crab Paste & Snail Noodle Soup',
    },
    descriptions: {
      'vi-VN':
        'Tảng riêu cua đồng xốp mềm béo ngậy nổi bật trên nền nước dùng nấu cà chua và giấm bỗng chua thanh dịu mát, ăn cùng đậu hũ chiên phồng ngấm vị, ốc nhồi giòn sần sật và huyết heo.',
      'en-US':
        'Tender cloud of freshwater crab paste floating in sweet-and-sour tomato broth scented with rice vinegar, served with crispy fried tofu, chewy snails, and shredded water spinach.',
    },
    originRegion: 'north',
    cuisineId: 'hanoi',
    categoryId: 'noodles',
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    primaryImage: {
      id: 'img-bun-rieu',
      storageKey: 'dishes/bun-rieu-cua.jpg',
      url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Tô bún riêu cua đỏ au màu cà chua béo ngậy riêu',
        'en-US': 'Bowl of flavorful Vietnamese crab noodle soup with tomatoes',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Food Collection',
    },
    gallery: [],
    ingredients: [
      'Cua đồng giã tay nấu riêu',
      'Cà chua chín mọng',
      'Đậu hũ chiên giòn',
      'Ốc nhồi luộc giòn ngọt',
      'Giấm bỗng nếp chua thanh',
      'Rau muống chẻ & hoa chuối bào',
    ],
    priceRange: {
      min: 40000,
      max: 65000,
      currency: 'VND',
    },
    spicyLevel: 1,
    tags: ['Chua thanh giấm bỗng', 'Riêu cua đồng tươi', 'Thanh mát ngày hè'],
  },
  {
    id: 'ca-phe-sua-da',
    slug: 'ca-phe-sua-da',
    names: {
      'vi-VN': 'Cà Phê Sữa Đá Sài Gòn',
      'en-US': 'Saigon Iced Milk Coffee',
    },
    descriptions: {
      'vi-VN':
        'Cà phê Robusta Đắk Lắk đậm đà pha phin truyền thống nhỏ từng giọt hòa quyện cùng sữa đặc béo ngọt và đá bi mát lạnh, thức uống khởi đầu một ngày tràn đầy năng lượng của người Sài Gòn.',
      'en-US':
        'Slow-dripped dark roast Vietnamese Robusta blended with silky sweetened condensed milk over crushed ice — the quintessential soul of Saigon street life.',
    },
    originRegion: 'south',
    cuisineId: 'saigon-street',
    categoryId: 'drinks',
    mealTypes: ['breakfast', 'snack'],
    primaryImage: {
      id: 'img-ca-phe',
      storageKey: 'dishes/ca-phe-sua-da.jpg',
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      altText: {
        'vi-VN': 'Ly cà phê sữa đá đậm đà ngập đá bi',
        'en-US': 'Glass of Vietnamese iced coffee with condensed milk',
      },
      license: 'Public Domain',
      attribution: 'Unsplash Beverage Collection',
    },
    gallery: [],
    ingredients: [
      'Cà phê Robusta pha phin',
      'Sữa đặc có đường',
      'Đá bi mát lạnh',
    ],
    priceRange: {
      min: 18000,
      max: 35000,
      currency: 'VND',
    },
    spicyLevel: 0,
    tags: ['Linh hồn Sài Gòn', 'Pha phin đậm đặc', 'Tỉnh táo sảng khoái'],
  },
];

export class MockCatalogRepository implements ICatalogRepository {
  private dishes: Dish[] = [...MOCK_DISHES];

  async getDishes(filter?: DishFilter): Promise<Dish[]> {
    let result = [...this.dishes];

    if (!filter) return result;

    if (filter.regionId) {
      result = result.filter((d) => d.originRegion === filter.regionId);
    }

    if (filter.categoryId) {
      result = result.filter((d) => d.categoryId === filter.categoryId);
    }

    if (filter.mealType) {
      result = result.filter((d) => d.mealTypes.includes(filter.mealType!));
    }

    if (filter.maxBudget) {
      result = result.filter(
        (d) => !d.priceRange || d.priceRange.min <= filter.maxBudget!
      );
    }

    if (filter.searchQuery && filter.searchQuery.trim()) {
      const q = filter.searchQuery.trim();
      result = result.filter((d) => {
        return (
          matchesDiacriticInsensitive(d.names['vi-VN'], q) ||
          matchesDiacriticInsensitive(d.names['en-US'], q) ||
          matchesDiacriticInsensitive(d.descriptions['vi-VN'], q) ||
          matchesDiacriticInsensitive(d.descriptions['en-US'], q) ||
          d.tags.some((t) => matchesDiacriticInsensitive(t, q)) ||
          d.ingredients.some((i) => matchesDiacriticInsensitive(i, q))
        );
      });
    }

    return result;
  }

  async getDishById(id: string): Promise<Dish | null> {
    const dish = this.dishes.find((d) => d.id === id);
    return dish ?? null;
  }

  async getDishBySlug(slug: string): Promise<Dish | null> {
    const dish = this.dishes.find((d) => d.slug === slug);
    return dish ?? null;
  }

  async getFeaturedDishes(): Promise<Dish[]> {
    return this.dishes.filter((d) => d.isSignature);
  }

  async getCategories(): Promise<CategoryMetadata[]> {
    return [...MOCK_CATEGORIES];
  }

  async getRegions(): Promise<RegionMetadata[]> {
    return [...MOCK_REGIONS];
  }
}
