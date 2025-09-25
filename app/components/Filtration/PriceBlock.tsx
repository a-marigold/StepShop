import PriceInput from '@UI/PriceInput';

import filterStyles from './Filtration.module.scss';

export default function PriceBlock() {
    return (
        <div
            className={`${filterStyles['filter-block']} ${filterStyles['price-block']}`}
        >
            <h3 className={filterStyles['filter-block-title']}>
                Цена от и до:
            </h3>

            <div className={filterStyles['price-inputs-group']}>
                <PriceInput currencySymbol='₸' defaultValue={0} />
                <PriceInput currencySymbol='₸' defaultValue={3200} />
            </div>
        </div>
    );
}
