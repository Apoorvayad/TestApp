export default {
    UserData: [
    {
      id: 1,
      category: 'Blazer',
      image: require('../assets/blazer.jpeg'),
      stock: 200,
      subCategories: [
        {
          id: 1,
          subCategory: 'Textiles and Readymades',
        },
        {
          id: 2,
          subCategory: 'Gents Readymades',
        },
        {
          id: 3,
          subCategory: 'Ladies Boutique',
        },
        {
          id: 4,
          subCategory: 'Footwear',
        },
        {
          id: 5,
          subCategory: 'Fancy',
        },
      ],
    },

    {
      id: 2,
      category: 'Footwear',
      image: require('../assets/footwear.jpeg'),
      stock: 100,
      subCategories: [
        {
          id: 1,
          subCategory: 'Footwear',
        },
        {
          id: 2,
          subCategory: 'Fancy',
        },
      ],
    },

    {
      id: 3,
      category: 'Fancy',
      image: require('../assets/blazer.jpeg'),
      stock: 50,
      subCategories: [
        {
          id: 1,
          subCategory: 'Textiles and Readymades',
        },
        {
          id: 2,
          subCategory: 'Gents Readymades',
        },
        {
          id: 3,
          subCategory: 'Ladies Boutique',
        },
      ],
    },
  ],
};
