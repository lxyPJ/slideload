/**
 * 根据页面可视宽度动态改变根节点(html)的font-size
 * iOS下,iOS下，对于 window.devicePixelRatio=2 的屏幕，用2倍的方案（页面缩放0.5）；对于 window.devicePixelRatio=3 的屏幕，用3倍的方案（页面缩放0.3333）；
 * 其余的用1倍方案
 */
+function (doc, win) {

    var isIPhone = win.navigator.appVersion.match(/iphone/gi);

    // 分辨率Resolution适配
    var docEle = doc.documentElement;
    var resizeEvt = 'deviceorientation' in window ? 'deviceorientation' : 'resize';
    var recalc = function () {
        var clientWidth = docEle.clientWidth;
        if (!clientWidth) return;
        if(isIPhone){
            docEle.style.fontSize = (clientWidth / 10) + 'px';
        }else{
            var htmlFontSize = Number(clientWidth) / 10;
            docEle.style.fontSize = htmlFontSize + 'px';
        }
    };

    // 如果浏览器不支持addEventListener中止
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    setDpr();

    function setDpr(){

        var dpr,scale;

        var devicePixelRatio = win.devicePixelRatio;

        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
        docEle.setAttribute('data-dpr', dpr);

        //var metaEl = document.querySelector('meta[name="viewport"]');
        //metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    }

}(document, window);
