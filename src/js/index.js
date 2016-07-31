function Carousel($node){
    this.ct = $node.find(".ct") ;
    this.$children = this.ct.children("li");
    this.prev = this.ct.siblings(".prev");
    this.next = this.ct.siblings(".next");
    this.bullet = this.ct.siblings(".bullet");
    this.length = this.$children.size();//克隆前图片的数量
    this.imgWidth = this.ct.children("li").width();
    this.cur = 0;
    this.isAnimate =true;//全局变量状态锁，允许执行自动播放的功能
    this.ct.append(this.$children.first().clone());
    this.ct.prepend(this.$children.last().clone());
    this.imgRealCount = this.ct.children().size();//克隆后图片的数量
    this.ct.css({left:0-this.imgWidth,width:this.imgRealCount*this.imgWidth});
    this.init();
}
Carousel.prototype = {
    init:function () {
        var me = this;
        me.bind();
        me.autoPlay();
    },
    bind : function () {
        var me = this;
        me.next.on("click",function (e) {
            e.preventDefault();
            me.stopAuto();
            me.playNext();
            me.autoPlay();
        });
        me.prev.on("click",function (e) {
            e.preventDefault();
            me.stopAuto();
            me.playPrev();
            me.autoPlay();
        });
        me.bullet.find("li").on("click",function () {
            var index = $(this).index();  //找出点击bullet的li元素的编号
            me.stopAuto();
            if (index>me.cur){
                me.playNext(index-me.cur);
            }
            else if(index<me.cur){
                me.playPrev(me.cur-index);
            }
            me.autoPlay();
        });
    },
    playNext: function (idx) {
        var me = this;
        var idx = idx || 1; //移动图片的数量
        if(me.isAnimate){
            me.isAnimate = false;
            me.ct.animate({     //让装载图片的火车，移动
                left : "-=" +(me.imgWidth*idx)
            },function () {
                me.cur = (me.cur + idx)%me.length;//改变编号 在四张图片的时候，例如：3+1=0
                if(me.cur===0){//如果是第一号 虽然展示的是克隆体，但应该展示第一号，所以
                    me.ct.css({left:0-me.imgWidth});//瞬间移动为第一个,因为前面有一个克隆的，所以要减去一个imgWidth
                }
                me.isAnimate = true;
                me.setBullet();
            })
        }
    },
    playPrev: function(idx) {
        var me = this;
        var idx = idx || 1; //移动图片数的数量
        if(me.isAnimate){
            me.isAnimate = false;
            me.ct.animate({     //让装载图片的火车，移动
                left : "+=" +(me.imgWidth*idx)
            },function () {
                me.cur = (me.length+me.cur-idx)%me.length;//改变编号 在四张图片的时候，例如：0-1=3
                if(me.cur===me.length-1){//如果是最后一号 虽然展示的是克隆体，但应该展示最后一号，所以
                    me.ct.css({left:0-me.imgWidth*me.length});//瞬间移动为最后一个,因为前面有一个克隆的，所以要减去imgWidth*length
                }
                me.isAnimate = true;
                me.setBullet();
            })
        }
    },
    setBullet:function () {//给相应bullet的li元素加上背景色
        var me =this;
        me.bullet.children().removeClass("active").eq(me.cur).addClass("active");
    },
    autoPlay:function  (){//自动播放
        var me = this;
        me.start = setInterval(function () {
            me.playNext();
        },2500)
    },
    stopAuto:function () {//停止自动播放功能
        var me =this;
        clearInterval(me.start);
    }
};
$('.carousel').each(function(){
    new Carousel($(this));
});
function Gotop(distance,time) {
    this.distance = distance || 300;
    this.time = time || 1000;
    this.createNode();
    this.bind();
}
Gotop.prototype = {
    createNode:function () {
        var me = this;
        me.$node = $('<div id="go-top"><i class="fa fa-angle-up"></i></div>');
        $('body').append(me.$node);
        me.$node.on('click',function () {
            $('html,body').animate({scrollTop:0},me.time);
        });
        me.hide();
    },
    bind:function () {
        var me = this;
        $(window).on('scroll',function () {
            if($(window).scrollTop()>=me.distance){
                me.show();
            }
            else{
                me.hide();
            }
        });
    },
    show:function () {
        var me =this;
        me.$node.show();
    },
    hide:function () {
        var me = this;
        me.$node.hide();
    }
};
new Gotop(300,500);