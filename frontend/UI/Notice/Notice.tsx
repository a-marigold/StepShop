'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import clsx from 'clsx';

import noticeStyles from './Notice.module.scss';

interface NoticeProps {
    title: string;

    message?: string;
    existenceTime: number;
    showNotice: boolean;
    setShowNotice: (showNotice: boolean) => void;
}

export default function Notice({
    title,
    message,
    existenceTime,
    showNotice,
    setShowNotice,
}: NoticeProps) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowNotice(false);
        }, existenceTime);
    }, []);

    return createPortal(
        <AnimatePresence>
            {showNotice && (
                <motion.div
                    className={noticeStyles['notice']}
                    initial={{ transform: 'translateX(300px)', opacity: 0 }}
                    animate={{ transform: 'translateX(0)', opacity: 1 }}
                    exit={{ transform: 'translateX(300px)', opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={noticeStyles['title-block']}>
                        <div className={noticeStyles['title-group']}>
                            <svg
                                height='21'
                                viewBox='0 0 256 256'
                                color='var(--positive-notice-color)'
                            >
                                <use href='#check-mark-icon' />
                            </svg>
                            <p className={noticeStyles['title']}>{title}</p>
                        </div>

                        <div className={noticeStyles['buttons-group']}>
                            <button
                                onClick={() => setShowMessage((prev) => !prev)}
                            >
                                <svg
                                    width={21}
                                    height={21}
                                    color='var(--secondary-font-color)'
                                    className={clsx(
                                        noticeStyles['accordion-icon'],
                                        showMessage &&
                                            noticeStyles[
                                                'accordion-icon-active'
                                            ]
                                    )}
                                >
                                    <use href='#accordion-arrow-icon' />
                                </svg>
                            </button>

                            <button onClick={() => setShowNotice(false)}>
                                <svg
                                    width={12}
                                    height={12}
                                    color='var(--secondary-font-color)'
                                >
                                    <use href='#small-cross-icon' />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {message && showMessage && (
                            <motion.div
                                className={noticeStyles['message-block']}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.12,
                                    opacity: {
                                        duration: 0,
                                    },
                                }}
                            >
                                <p className={noticeStyles['message']}>
                                    {message}
                                </p>
                                <button
                                    className={noticeStyles['accept-button']}
                                >
                                    Принять
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div
                        className={noticeStyles['time-line']}
                        style={{ animationDuration: `${existenceTime}s` }}
                    />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
