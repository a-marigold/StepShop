import { getDocumentScrollbarWidth } from './scrollLock';

describe('Document width calculating test', () => {
    it('Should return real scrollbar width of document', () => {
        expect(getDocumentScrollbarWidth()).toBe(15);
    });
});
