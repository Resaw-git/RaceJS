var content = document.querySelector(".content");
var headerImg = new Image(0, 200);
headerImg.src = 'images/dota2.jpg';
headerImg.width = document.documentElement.clientWidth * 0.75;
content.innerHTML = headerImg.outerHTML;

function resizeWidthOnly(a,b) {  
    var c = [window.innerWidth];
    return onresize = function() {
      var d = window.innerWidth,
          e = c.length;
      c.push(d);
      if(c[e]!==c[e-1]){
        clearTimeout(b);
        b = setTimeout(a, 10);
      } 
    }, a;
  }

  resizeWidthOnly(function() {
    headerImg.width = document.documentElement.clientWidth * 0.75;
    content.innerHTML = headerImg.outerHTML;
  });

var headerBar = document.createElement('div');
headerBar.innerHTML = "Dota 2";
content.appendChild(headerBar);
