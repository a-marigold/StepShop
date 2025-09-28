import type { Metadata } from 'next';

import Navigation from './components/Navigation/Navigation';

import type { SearchParamsProp } from '@/types/SearchParamsProp';

import FiltrationProvider from './components/Filtration/FiltrationProvider';
import ProductList from './components/ProductList/ProductList';

// TEST
import CartModal from './components/CartModal/CartModal';
//

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
                <FiltrationProvider />

                <ProductList searchParams={searchParams} />
            </main>

            {/* TEST */}
            <CartModal></CartModal>
            {/*  */}
        </div>
    );
}
