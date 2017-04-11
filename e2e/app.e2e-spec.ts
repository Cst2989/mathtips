import { MathtipsPage } from './app.po';

describe('mathtips App', () => {
  let page: MathtipsPage;

  beforeEach(() => {
    page = new MathtipsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
