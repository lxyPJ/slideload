/**
 * 滚动加载
 */
var getData = true;//ajax请求状态(根据实际的请求结果来改变值)
var slideload = new Slideload(document.querySelector(".scroll-window"),{
    scrollCont:document.querySelector("#scroll-body"),
    refreshDOM:{
        "pull2refresh":'<p class="refresh-tip">↓ 下拉刷新</p>',
        "release2refresh":'<p class="refresh-tip">↑ 释放刷新</p>',
        "loading":'<div id="infinite-loading" class="infinite-loading">' + document.getElementById("spinner-tpl").innerHTML + '</div>',
        "refreshSuccess":'<p class="refresh-tip">√ 刷新成功</p>'
    },
    loadMoreDOM:{
        "pull2load":'<p class="refresh-tip">↑ 上拉加载更多</p>',
        "loading":'<div id="infinite-loading" class="infinite-loading">' + document.getElementById("spinner-tpl").innerHTML + '</div>',
        "loadSuccess":'<p class="refresh-tip">√ 加载成功</p>'
    }
});
slideload.on('load',function(next,stop){
    setTimeout(function(){
        var sectionEle = document.createElement('section');
        sectionEle.setAttribute('class','specialAd-wrapper');
        sectionEle.innerHTML = document.getElementById("specialAd-tpl").innerHTML;
        document.getElementById("specialAd-container").appendChild(sectionEle);//通过ajax获取数据，渲染DOM
        if(getData){
            next();
        }else{
            stop();
        }
    },1000);
});
slideload.on('refresh',function(next,stop){
    setTimeout(function(){
        var html = '<section class="specialAd-wrapper">' + document.getElementById("specialAd-tpl").innerHTML + '</section>';
        document.getElementById("specialAd-container").innerHTML = html;//通过ajax获取数据，渲染DOM
        if(getData){
            next();
        }else{
            stop();
        }
    },1000);
});
