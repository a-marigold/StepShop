import type { Metadata } from 'next';

import Navigation from './components/Navigation/Navigation';

import type { SearchParamsProp } from '@/types/SearchParamsProp';

import Filtration from './components/Filtration';
import ProductList from './components/ProductList';

import homeStyles from './Home.module.scss';

export const metadata: Metadata = {
    title: 'Каталог товаров | StepShop',
    description:
        'Красота и здоровье. Дом и сад. Мебель. Аксессуары. Строительство и ремонт. Автотовары. Продукты питания. Товары для животных. Детские товары. Спорт и отдых.',

    openGraph: {
        title: 'Каталог товаров интернет магазина StepShop',
    },
};

export default function Home({ searchParams }: SearchParamsProp) {
    return (
        <div className={homeStyles['home']}>
            <Navigation />

            <main className={homeStyles['main-content']}>
                <Filtration />

                <ProductList searchParams={searchParams} />
            </main>
        </div>
    );
}
