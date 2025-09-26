import Header from './components/Header/Header';

import Navigation from './components/Navigation/Navigation';

import Filtration from './components/Filtration/Filtration';
import ProductList from './components/ProductList/ProductList';

import homeStyles from './Home.module.scss';

export default function Home() {
    return (
        <div className={homeStyles['home']}>
            <Header />

            <Navigation />

            <main className={homeStyles['main-content']}>
                <Filtration />
                <ProductList />
            </main>
        </div>
    );
}
