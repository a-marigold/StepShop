'use client';

import buttonStyles from './CloseModalCross.module.scss';

interface CloseModalCrossProps {
    clickAction: () => void;
}

export default function CloseModalCross({ clickAction }: CloseModalCrossProps) {
    return (
        <button
            className={buttonStyles['close-modal-cross']}
            onClick={clickAction}
            aria-label='Закрыть модальное окно'
        >
            <img
                src='/images/bold-cross-icon.svg'
                width={30}
                height={30}
                alt=''
            />
        </button>
    );
}
