import type { AppDispatch } from '@/redux/store';
import {
    deleteProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
    increaseTotalAmount,
    decreaseTotalAmount,
} from '@/redux/CartSlice';

import { ClientProductType } from '@/types/ClientProductType';

interface DecreaseQuantityProps
    extends Pick<ClientProductType, 'title' | 'price' | 'quantity'> {
    dispatch: AppDispatch;
}
/**
 * **Increases product.quantity, product.price and totalAmount state
 * @param {string} title - Title of a product
 * @param {number} price - Price of a product
 * @param {number} quantity - Quantity of a product
 * @param {AppDispatch} dispatch - RTK dispatch function (useDispatch<AppDispatch>())
 *
 * @example
 * ```javascript
 * {...product, title: 'Example Product', price: 12000, quantity: 2} // Before function
 * totalAmount = 12000;
 *
 * {...product, title: 'Example Product', price: 6000, quantity: 1} // After function
 * totalAmount = 6000;
 * ```
 */
export function handleDecreaseProductQuantity({
    title,
    price,
    quantity,
    dispatch,
}: DecreaseQuantityProps) {
    dispatch(decreaseTotalAmount(price));
    if (quantity > 1) {
        dispatch(
            decreaseProductQuantity({
                title: title,
            })
        );
    } else {
        dispatch(deleteProduct({ title: title }));
    }
}

interface IncreaseQuantityProps
    extends Pick<ClientProductType, 'title' | 'price'> {
    dispatch: AppDispatch;
}
/**
 * **Increases product.quantity, product.price and totalAmount state
 * @param {string} title - Title of a product
 * @param {number} price - Price of a product
 * @param {AppDispatch} dispatch - RTK dispatch function (useDispatch<AppDispatch>())
 *
 * @example
 * ```javascript
 * {...product, title: 'Example Product', price: 600, quantity: 1}; // Before function
 * totalAmount = 600;
 *
 * {...product, title: 'Example Product', price: 1200, quantity: 2} // After function
 * totalAmount = 1200;
 * ```
 */
export function handleIncreaseProductQuantity({
    title,
    price,
    dispatch,
}: IncreaseQuantityProps) {
    dispatch(increaseProductQuantity({ title: title }));
    dispatch(increaseTotalAmount(price));
}
