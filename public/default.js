function toggle(showPage, hidePage){
  hidePage.className = hidePage.className + ' hidden';
  showPage.className = showPage.className.replace(/hidden/g,' ');
}

var stockBox = document.getElementById('stock-box');

search.addEventListener('click', function(e){
  stockBox.className = '';
})
var start = document.getElementById('start');
start.addEventListener('click', function(e){
  toggle(container,intro);
})
