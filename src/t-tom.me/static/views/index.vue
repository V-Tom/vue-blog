<style scoped>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <section class="index-page  animation" transition="page-fade" transition-mode="out-in">
    <canvas></canvas>
  </section>
</template>

<script type="es6">
  export default{
    data(){
    },
    ready(){
      void function () {
        document.addEventListener('touchmove', function (e) {
          e.preventDefault()
        })
        var c = document.getElementsByTagName('canvas')[0],
          x = c.getContext('2d'),
          pr = 1,
          w = window.innerWidth,
          h = window.innerHeight,
          f = 50,
          q,
          m = Math,
          r = 0,
          u = m.PI * 2,
          v = m.cos,
          z = m.random,
          linkX,
          linkY,
          linkFontSize,
          linkText = "Reprinted from http://evanyou.me",
          linkWidth,
          goLink = false;
        c.width = w * pr
        c.height = h * pr - 60
        x.scale(pr, pr)
        x.globalAlpha = 0.6
        function i() {
          if (goLink) {
            goLink = false;
            window.open('http://evanyou.me');
          } else {
            x.clearRect(0, 0, w, h)
            q = [{x: 0, y: h * .7 + f}, {x: 0, y: h * .7 - f}]
            while (q[1].x < w + f) d(q[0], q[1])
            x.textAlign = "center";
            x.font = 2 + 'rem Microsoft JhengHei';
            x.fillText('Hello Full Stack DEV', c.width / 2, c.height / 2 - 50);
            linkFontSize = 12;
            linkX = c.width - 40;
            linkY = c.height - 10;
            x.font = linkFontSize + 'px sans-serif';
            x.textAlign = "right";
            x.fillText(linkText, linkX, linkY);
            x.fillStyle = "#000";
            x.fillText('Nomand', linkX, linkY - 20)
            linkWidth = x.measureText(linkText).width;
          }
        }

        function d(i, j) {
          x.beginPath()
          x.moveTo(i.x, i.y)
          x.lineTo(j.x, j.y)
          var k = j.x + (z() * 2 - 0.25) * f,
            n = y(j.y)
          x.lineTo(k, n)
          x.closePath()
          r -= u / -50
          x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
          x.fill()
          q[0] = q[1]
          q[1] = {x: k, y: n}
        }

        function y(p) {
          var t = p + (z() * 2 - 1.1) * f
          return (t > h || t < 0) ? y(p) : t
        }

        const isGoToLink = (ev) => {
          var x = ev.screenX, y = ev.screenY;
          if (ev.layerX || ev.layerX == 0) { //for firefox
            x = ev.layerX;
            y = ev.layerY;
          }
          if (x >= linkX - linkWidth && x <= (linkX + linkWidth) && y <= linkY && y >= linkY - linkFontSize) {
            return true
          }
          return false;
        }

        function move(ev) {
          if (isGoToLink(ev)) {
            document.body.style.cursor = "pointer";
            goLink = true;
          } else {
            document.body.style.cursor = "";
            goLink = false;
          }
        };

        document.addEventListener('click', function (ev) {
          if (ev.target.nodeName === 'CANVAS') {
            if (isGoToLink(ev)) {
              window.open('http://evanyou.me');
            } else {
              i();
            }
          }
        }, false);
        document.addEventListener('touchstart', function (ev) {
          if (ev.target.nodeName === 'CANVAS') {
            if (isGoToLink(ev)) {
              window.open('http://evanyou.me');
            } else {
              i();
            }
          }
        }, false);
        c.addEventListener("mousemove", move, false);
        i();
      }();
    }
  }
</script>
