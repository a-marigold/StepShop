import { getDocumentScrollbarWidth } from './scrollLock';

describe('Document width calculating test', () => {
    Object.defineProperty(window, 'innerWidth', {
        writable: false,
        value: 1016,
    });
    Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: false,
        value: 1001,
    });

    it('Should return real scrollbar width of document', () => {
        expect(getDocumentScrollbarWidth()).toBe(15);
    });
});
