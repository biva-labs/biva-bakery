export interface BakeryProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
}

export interface BakeryCategory {
  id: string;
  title: string;
  products: BakeryProduct[];
}

export const bakeryData: BakeryCategory[] = [
  {
    id: "bread",
    title: "Bread",
    products: [
      {
        id: 1,
        name: "150gm Bread",
        description: "Fresh and soft everyday bread",
        image: "/room.jpg"
      },
      {
        id: 2,
        name: "200gm Bread",
        description: "Perfect size for small families",
        image: "/room.jpg"
      },
      {
        id: 3,
        name: "250gm Bread",
        description: "Regular family size bread",
        image: "/room.jpg"
      },
      {
        id: 4,
        name: "400gm Sandwich Bread",
        description: "Perfect for sandwiches and toast",
        image: "/room.jpg"
      },
      {
        id: 5,
        name: "400gm Milky Bread",
        description: "Soft and creamy milky bread",
        image: "/room.jpg"
      },
      {
        id: 6,
        name: "800gm Jumbo Bread",
        description: "Large family size bread",
        image: "/room.jpg"
      }
    ]
  },
  {
    id: "biscuit",
    title: "Biscuits",
    products: [
      {
        id: 7,
        name: "Swissbery",
        description: "Delicious berry flavored biscuits",
        image: "/room.jpg"
      },
      {
        id: 8,
        name: "Methi",
        description: "Traditional methi flavored biscuits",
        image: "/room.jpg"
      },
      {
        id: 9,
        name: "Osmania",
        description: "Classic Hyderabadi Osmania biscuits",
        image: "/room.jpg"
      },
      {
        id: 10,
        name: "Ajwain Cookies",
        description: "Healthy ajwain flavored cookies",
        image: "/room.jpg"
      },
      {
        id: 11,
        name: "Methi Butter Cookies",
        description: "Buttery methi cookies",
        image: "/room.jpg"
      },
      {
        id: 12,
        name: "Fruit Cookies",
        description: "Mixed fruit flavored cookies",
        image: "/room.jpg"
      },
      {
        id: 13,
        name: "Coconut Cookies",
        description: "Fresh coconut cookies",
        image: "/room.jpg"
      },
      {
        id: 14,
        name: "Badam Cookies",
        description: "Rich almond cookies",
        image: "/room.jpg"
      }
    ]
  },
  {
    id: "rusk",
    title: "Rusk",
    products: [
      {
        id: 15,
        name: "Butter Rusk",
        description: "Crispy butter flavored rusk",
        image: "/room.jpg"
      },
      {
        id: 16,
        name: "Coconut Rusk",
        description: "Coconut flavored crispy rusk",
        image: "/room.jpg"
      },
      {
        id: 17,
        name: "Elachi Rusk",
        description: "Aromatic cardamom rusk",
        image: "/room.jpg"
      }
    ]
  },
  {
    id: "puff-snacks",
    title: "Puff & Snacks",
    products: [
      {
        id: 18,
        name: "Veg Patties",
        description: "Fresh vegetable patties",
        image: "/room.jpg"
      },
      {
        id: 19,
        name: "Babycorn Patties",
        description: "Delicious babycorn patties",
        image: "/room.jpg"
      },
      {
        id: 20,
        name: "Paneer Patties",
        description: "Creamy paneer patties",
        image: "/room.jpg"
      },
      {
        id: 21,
        name: "Chicken Patties",
        description: "Juicy chicken patties",
        image: "/room.jpg"
      },
      {
        id: 22,
        name: "Veg Spring Roll",
        description: "Crispy vegetable spring rolls",
        image: "/room.jpg"
      },
      {
        id: 23,
        name: "Chicken Spring Roll",
        description: "Chicken filled spring rolls",
        image: "/room.jpg"
      },
      {
        id: 24,
        name: "Dinner Roll",
        description: "Soft dinner rolls",
        image: "/room.jpg"
      },
      {
        id: 25,
        name: "Pull-A-Part",
        description: "Shareable pull-apart bread",
        image: "/room.jpg"
      },
      {
        id: 26,
        name: "Italian Butter",
        description: "Italian style butter bread",
        image: "/room.jpg"
      }
    ]
  },
  {
    id: "sweets",
    title: "Sweets",
    products: [
      {
        id: 27,
        name: "Gulab Jamun",
        description: "Traditional sweet gulab jamun",
        image: "/room.jpg"
      },
      {
        id: 28,
        name: "Rasgulla",
        description: "Soft and spongy rasgulla",
        image: "/room.jpg"
      },
      {
        id: 29,
        name: "Kaju Katli",
        description: "Premium cashew sweets",
        image: "/room.jpg"
      },
      {
        id: 30,
        name: "Motichoor Laddu",
        description: "Traditional motichoor laddu",
        image: "/room.jpg"
      },
      {
        id: 31,
        name: "Badam Burfi",
        description: "Rich almond burfi",
        image: "/room.jpg"
      },
      {
        id: 32,
        name: "Jalebi",
        description: "Crispy and sweet jalebi",
        image: "/room.jpg"
      }
    ]
  }
];

// Helper function to get category by id
export const getCategoryById = (id: string): BakeryCategory | undefined => {
  return bakeryData.find(category => category.id === id);
};

// Helper function to get all categories
export const getAllCategories = (): BakeryCategory[] => {
  return bakeryData;
};
