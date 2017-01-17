import { TipsService } from './tips.service';

describe('TipsService', () => {

    let service = new TipsService();
    beforeEach(() => {
        service = new TipsService();
    });

    describe('getTopics', () => {
        it('should work', () => {
            expect(service.getTopics()).toEqual(['changes', 'branches', 'commits', 'remotes']);
        });
    });

    describe('getActions', () => {
        it('should work', () => {
            expect(service.getActions()).toEqual(['revert', 'add', 'delete', 'list', 'merge', 'update']);
        });
    });

    describe('match', () => {
        it('should work', () => {
            expect(service.match('branches', 'list').map(item => item.title)).toEqual(['Listar branches']);
        });
    });

});
