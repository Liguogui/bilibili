
define(['jquery'],function ($) {  //对选择器进行瀑布流布局，不清空数组
    var $el;
    var $ul;
    function init($select,$ct) {
        $el = $select;
        $ul = $ct;
        $el.colSumHeight = [];
        $el._isAdd = false;
        _rend();
    }
    function _rend () {
        var nodeWidth= _add().nodeWidth;
        $el.each(function () {
            var idx = _idx().idx;
            var min = _idx().min;
            var $cur = $(this);
            $cur.css({
                left:nodeWidth*idx,
                top: min
            });
            $el.colSumHeight[idx] = $el.colSumHeight[idx]+$cur.outerHeight(true);
        });
        $el.maxH = Math.max.apply(null,$el.colSumHeight);
        // console.log($el.maxH);
    }
    function _add() {
        var nodeWidth = $el.outerWidth(true);
        var ctWidth = $ul.width();
        var colNum = parseInt(ctWidth/nodeWidth);
        if(!$el._isAdd){    //确定列数这件事只做一次
            for(var i=0;i<colNum;i++){
                $el.colSumHeight.push(0);
            }
            $el._isAdd = true;
        }
        return{
            nodeWidth:nodeWidth
        }
    }
    function _idx() {
        var idx = 0;
        var min = $el.colSumHeight[0];
        for(var i=0;i<$el.colSumHeight.length;i++){
            if($el.colSumHeight[i]<min){
                min = $el.colSumHeight[i];
                idx = i;
            }
        }
        return{
            idx : idx,
            min : min
        }
    }
    function _maxH() {
        return $el.maxH;
    }
    return {
        init :init,
        maxH : _maxH  //maxH的作用是进行瀑布流布局之后，返回数组的最大值。
                      // 所以使用maxH时一定要先启动init
    }
});

