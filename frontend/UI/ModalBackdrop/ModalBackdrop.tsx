'use client';

import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import type { ReactNode, ComponentProps } from 'react';

import modalStyles from './ModalBackdrop.module.scss';

interface ModalBackdropProps {
    setShowModal: (showModal: boolean) => void;

    props: ComponentProps<'div'>;

    children: ReactNode;
}

export default function ModalBackdrop({
    setShowModal,

    props,
    children,
}: ModalBackdropProps) {
    function handleCloseModal(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            setShowModal(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleCloseModal);

        return () => {
            window.removeEventListener('keydown', handleCloseModal);
        };
    });

    return createPortal(
        <div
            className={modalStyles['modal-backdrop']}
            onClick={() => setShowModal(false)}
            {...props}
        >
            {children}
        </div>,
        document.body
    );
}
