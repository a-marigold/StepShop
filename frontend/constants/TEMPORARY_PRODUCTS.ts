// TODO: database with products died, so website should use hard coded products

import type { ClientProductType } from '@/types/ClientProductType';

export const TEMPORARY_PRODUCTS = [
    {
        currencySymbol: '₸',
        category: 'sneakers',
        image: '/images/sneakers1.png',
        title: 'Nike Air Max 270',
        description: 'Лёгкие и удобные кроссовки',
        price: 89990,
        quantity: 15,
        id: 1,
    },
    {
        currencySymbol: '₽',
        category: 'sneakers',
        image: '/images/sneakers2.png',

        title: 'Adidas Ultraboost 22',
        description: 'Беговые кроссовки',
        price: 12990,
        quantity: 20,
        id: 2,
    },
    {
        currencySymbol: '$',
        category: 'sneakers',
        image: '/images/sneakers3.png',

        title: 'Puma RS-X',
        description: 'Кроссовки',
        price: 120,
        quantity: 10,
        id: 3,
    },
    {
        currencySymbol: '₸',
        category: 'sneakers',
        image: '/images/sneakers6.png',

        title: 'New Balance 574',
        description: 'Классическая модель для города',
        price: 75990,
        quantity: 12,
        id: 4,
    },
];
