function Dialog(){
    this.createDialog();
    this.bindEvent();
}

Dialog.prototype = {
    defaultOpts: {
        title: '',
        message: '',
        isShowCloseBtn: true,
        isShowConfirmBtn: false,
        onClose: function(){},
        onConfirm: function(){}
    },

    open: function(opts){
        this.setOpts(opts);
        console.log(this.opts);
        this.setDialog();
        this.showDialog();
    },

    close: function(){
        this.hideDialog();
    },

    setOpts: function(opts){
        if(typeof opts === 'string'){
            this.opts = $.extend({}, this.defaultOpts, {message: opts});
        }else if (typeof opts === 'object'){
            this.opts = $.extend({}, this.defaultOpts, opts);
        }
    },

    bindEvent: function(){
        var _this = this;
        _this.$dialog.find('.btn-close').on('click', function(e){
            e.preventDefault();
            _this.opts.onClose();
            _this.hideDialog();
        });
        _this.$dialog.find('.btn-confirm').on('click', function(e){
            e.preventDefault();
            _this.opts.onConfirm();
            _this.hideDialog();
        });

        _this.$dialog.on('mousedown', function(e){
            //e.pageX: 事件在页面上的绝对位置
            // $dialog.offset(): dialog的左上角到页面左上边缘的绝对位置
            var $dialog = $(this),
                evtX = e.pageX - $dialog.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
                evtY = e.pageY - $dialog.offset().top;
            $dialog.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
            console.log($dialog.data('evtPos'));
        }).on('mouseup', function(){
            $(this).removeClass('draggable').removeData('pos');
        });
        $('body').on('mousemove', function(e){
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
                left: e.pageX-$('.draggable').data('evtPos').x
            });
        });


    },


    //创建Dialog
    createDialog: function(){
        var tpl = '<div class="dialog" style="display:none">'
            + '<div class="dialog-box">'
            +   '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>'
            +   '<div class="dialog-content">'
            + '</div>'
            + '<div class="dialog-footer">'
            + '  <a href="#" class="btn btn-close">取消</a>'
            + '  <a href="#" class="btn btn-confirm">确定</a>'
            + '</div>'
            + '</div>'
            +'</div>';
        this.$dialog = $(tpl);
        $('body').append(this.$dialog);
    },

    //根据参数设置 Dialog 样式和内容
    setDialog: function(){
        var $dialog = this.$dialog;
        if(!this.opts.title){
            $dialog.find('.dialog-header').hide();
        }else{
            $dialog.find('.dialog-header').show();
        }
        if(!this.opts.isShowCloseBtn){
            $dialog.find('.dialog-footer .btn-close').hide();
        }else{
            $dialog.find('.dialog-footer .btn-close').show();
        }
        if(!this.opts.isShowConfirmBtn){
            $dialog.find('.btn-confirm').hide();
        }else{
            $dialog.find('.btn-confirm').show();
        }
        $dialog.find('.dialog-header h3').text(this.opts.title);
        $dialog.find('.dialog-content').html(this.opts.message);
    },

    showDialog: function(){
        this.$dialog.show();
    },

    hideDialog: function(){
        this.$dialog.hide();
    },

    distoryDialog: function(){
        this.$dialog.remove();
    }

};
