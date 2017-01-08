import { GitExpertPage } from './app.po';

describe('git-expert App', function() {
  let page: GitExpertPage;

  beforeEach(() => {
    page = new GitExpertPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
