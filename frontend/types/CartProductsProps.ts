import { ClientProductType } from './ClientProductType';

export interface CartProductProps
    extends Omit<ClientProductType, 'description'> {
    options: string;
}
