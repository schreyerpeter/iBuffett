function toggle(showPage, hidePage){
  hidePage.className = hidePage.className + ' hidden';
  showPage.className = showPage.className.replace(/hidden/g,' ');
}
var stockBox = document.getElementById('stock-box');

search.addEventListener('click', function(e){
  stockBox.className = '';
})

start.addEventListener('click', function(e){
  toggle(container,intro);
})

var portfolioButton = document.getElementById('portfolio-button');
var portfolioBody = document.getElementById('portfolio-body');
portfolioButton.addEventListener('click', function(e){
  toggle(portfolioBody, container);
})
var mainButton = document.getElementById('main-button');
mainButton.addEventListener('click', function(e){
  toggle(container, portfolioBody);
})
