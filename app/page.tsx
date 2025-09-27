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

                {/* POSITION STICKY TESTING */}
                {/* <div
                    style={{
                        position: 'sticky',
                        top: 0,
                        background: 'yellow',
                        padding: '10px',
                        width: 30,
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eum similique, excepturi sapiente incidunt facere culpa
                    voluptatum aliquam, ea vero quasi eveniet necessitatibus
                    atque molestiae itaque! Ratione corporis magni consectetur
                    consequuntur. Alias voluptas amet similique expedita illum
                    molestiae, veritatis facere quaerat deleniti non, aperiam
                    cum reiciendis fuga dolore tempore dolores dolorem eaque
                    magni eius dicta ex natus velit, esse eligendi. Fuga. Quasi
                    neque illum consequatur, nam id nemo quis ullam praesentium
                    consequuntur numquam est similique ex. Vel eius ex,
                    mollitia, animi aperiam recusandae nisi officia id nemo rem
                    placeat. Et, quod. Vitae illum exercitationem adipisci enim
                    quo, nobis, mollitia expedita, inventore velit qui aperiam.
                    Iure nihil nisi ut quos magnam blanditiis ad est suscipit,
                    porro ducimus vel dolorum, cumque eveniet eligendi? Dolor id
                    praesentium laudantium earum ipsam rem et perferendis
                    repellendus quo aliquam dolore tempore, molestias fugit
                    voluptatum maxime cum esse harum hic molestiae, animi
                    accusamus quod debitis. Eum, dolor hic.
                </div> */}
                {/*  */}

                <ProductList />
            </main>
        </div>
    );
}
