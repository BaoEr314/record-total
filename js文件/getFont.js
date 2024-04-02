function calcRem() {
    var html = document.querySelector('html');
    var w = document.documentElement.clientWidth ;
    html.style.fontSize = w /7.5+ "px";
}
calcRem();
window.onresize = function() {
    calcRem();
}
