'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import type { NoticeType } from '@/types/NoticeType';

import clsx from 'clsx';

import noticeStyles from './Notice.module.scss';

interface NoticeProps extends Omit<NoticeType, 'id'> {
    className?: string;
    portalRootId: string;

    deleteNotice: () => void;
}

export default function Notice({
    title,
    message,
    type,
    existenceTime = 6,

    className,
    portalRootId,
    deleteNotice,
}: NoticeProps) {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const deleteNoticeTimeout = setTimeout(() => {
            deleteNotice();
        }, existenceTime * 1000);

        return () => {
            clearTimeout(deleteNoticeTimeout);
        };
    }, []);

    const portalRootElement = document.getElementById(portalRootId);

    return portalRootElement
        ? createPortal(
              <AnimatePresence>
                  <motion.div
                      className={clsx(noticeStyles['notice'], className, type)}
                      initial={{ transform: 'translateY(10px)', opacity: 0 }}
                      animate={{ transform: 'translateY(0)', opacity: 1 }}
                      exit={{ transform: 'translateX(10px)', opacity: 0 }}
                      transition={{ duration: 0.2 }}
                  >
                      <div className={noticeStyles['title-block']}>
                          <div className={noticeStyles['title-group']}>
                              <svg
                                  height='21'
                                  viewBox='0 0 256 256'
                                  color={`var(--${type}-color)`}
                              >
                                  <use href={`#${type}-notice-icon`} />
                              </svg>
                              <p className={noticeStyles['title']}>{title}</p>
                          </div>

                          <div className={noticeStyles['buttons-group']}>
                              {message && (
                                  <button
                                      onClick={() =>
                                          setShowMessage((prev) => !prev)
                                      }
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
                              )}

                              <button onClick={deleteNotice}>
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
                                      onClick={deleteNotice}
                                  >
                                      Принять
                                  </button>
                              </motion.div>
                          )}
                      </AnimatePresence>

                      <div
                          className={clsx(
                              noticeStyles['time-line'],
                              noticeStyles[type]
                          )}
                          style={{ animationDuration: `${existenceTime}s` }}
                      />
                  </motion.div>
              </AnimatePresence>,
              portalRootElement
          )
        : null;
}
