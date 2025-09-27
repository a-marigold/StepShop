import Header from './components/Header/Header';

import Navigation from './components/Navigation/Navigation';

import FiltrationProvider from './components/Filtration/FiltrationProvider';
import ProductList from './components/ProductList/ProductList';

import homeStyles from './Home.module.scss';

export default function Home() {
    return (
        <div className={homeStyles['home']}>
            <Header />

            <Navigation />

            <main className={homeStyles['main-content']}>
                <FiltrationProvider />

                <ProductList />
            </main>
        </div>
    );
}
