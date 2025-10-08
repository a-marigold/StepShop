import type { SearchProps } from './SearchProps';

import clsx from 'clsx';
import headerStyles from '../../Header.module.scss';

export default function SearchButton({ setShowModal }: SearchProps) {
    return (
        <>
            <button
                className={headerStyles['search-button']}
                onClick={() => setShowModal(true)}
            >
                <img src='/images/search-icon.svg' alt='' />
            </button>
        </>
    );
}
