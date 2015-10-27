//spec
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:63342/upGrade/ui');

    expect(browser.getTitle()).toEqual('upGrade');
  });
});