//spec
describe('The quick links page', function() {
  it('should have an informative title', function() {
    browser.get('http://localhost:63342/upGrade/ui/#/components/quick-links');

    expect(browser.getTitle()).toEqual('Quick Links | upGrade');
  });
});