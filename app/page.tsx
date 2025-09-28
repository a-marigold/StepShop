import Header from './components/Header/Header';

import Navigation from './components/Navigation/Navigation';

import type { SearchParamsProp } from '@/types/SearchParamsProp';

import FiltrationProvider from './components/Filtration/FiltrationProvider';
import ProductList from './components/ProductList/ProductList';

import homeStyles from './Home.module.scss';

export default function Home({ searchParams }: SearchParamsProp) {
    return (
        <div className={homeStyles['home']}>
            <Navigation />

            <main className={homeStyles['main-content']}>
                <FiltrationProvider />

                <ProductList searchParams={searchParams} />
            </main>
        </div>
    );
}
