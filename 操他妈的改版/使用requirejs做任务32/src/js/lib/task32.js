
//别名配置
requirejs.config({
    baseUrl:"src/js/lib",
    paths: {
        jquery: "../com/jquery-2.2.3.min",
        lazyLoad: "../app/懒加载插件",
        waterfall: "../app/瀑布流插件",
        newElement:"../app/发送新浪云的JSONP插件并生成li元素"
    }
});
requirejs(['jquery', 'lazyLoad','newElement'], function ($, lazyLoad,newElement){
    var $load = $("#load");
    lazyLoad.one($load, function () {
        newElement.init();
    },true);
});

