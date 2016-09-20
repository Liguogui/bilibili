define(['jquery','waterfall'],function ($,waterfall) { //发送jsonp请求，生成li元素，调用瀑布流布局
    function init() {
        _ajax();
    }
    function _ajax() {
        var curPage = 1,
            perPageCount = 9;
        //两种ajax的写法，哪个都可以
        $.ajax({
            url: 'http://platform.sina.com.cn/slide/album_tech',
            type: 'get',
            dataType: 'jsonp',
            jsonp:"jsoncallback",
            data: {
                app_key: '1271687855',
                num: perPageCount,
                page: curPage
            },
            success: function(ret){
                console.log(ret);
                if(ret && ret.status && ret.status.code === "0") {
                    _composition(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
                }
            },
            error: function(){
                console.log('get error data');
            }
        });
//            $.ajax({
//                url: 'http://platform.sina.com.cn/slide/album_tech',
//                dataType: 'jsonp',
//                jsonp:"jsoncallback",
//                data: {
//                    app_key: '1271687855',
//                    num: perPageCount,
//                    page: curPage
//                }
//            }).done(function(ret){
//                if(ret && ret.status && ret.status.code === "0"){
//                    _composition(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
//                }else{
//                    console.log('get error data');
//                }
//            });
    }
    function _composition(nodeList) {
//            console.log(nodeList);
        var tpl = '',
            $nodes;
        for(var i=0;i<nodeList.length;i++){ //遍历整个data数组
            tpl += '<li class="item">';
            tpl += '<a href="'+nodeList[i].url+'" class="link"><img src="'+nodeList[i].img_url+'" alt=""></a>';
            tpl += '<h4 class="header">'+nodeList[i].short_name+'</h4>';
            tpl += '<p class="desp">'+nodeList[i].short_intro+'</p>';
            tpl += '</li>';
        }
        $nodes = $(tpl);
        $('#pic-ct').append($nodes);
        _bind($nodes);
    }
    function _bind($nodes) {
        //$nodes是li元素
        //发现这样写也是可以的，不知道和老师的写法比起来有什么缺点？？？
        $nodes.each(function () {
            var $cur=$(this);
            $cur.find("img").on("load",function () {
                waterfall.init($cur,$("#pic-ct"));
            })
        });
//            var defereds = []; //创建存储 defered 对象的数组
//            $nodes.find("img").each(function () {
//                var defer = $.Deferred();
//                $(this).on("load",function () {
//                    defer.resolve();
//                });//当每个图片加载完成后，执行 resolve
//                defereds.push(defer);
//            });
//            $.when.apply(null,defereds).done(function() { //当所有的图片都执行 resolve 后，即全部图片加载后，执行下面的内容
////                console.log('new images all loaded ...');
//                //当节点里的图片全部加载后再使用瀑布流计算，否则会因为图片未加载 item 高度计算错误导致瀑布流高度计算出问题
//                waterfall.init($nodes);
//            });
    }
    return{
        init : init
    }
});
