$('#open1').on('click',function(){
    var dialog1 = new Dialog();
    dialog1.open('hello, 这里是饥人谷');
});

$('#open2').on('click',function(){
    var dialog2 = new Dialog();
    dialog2.open('<a href="http://jirengu.com">饥人谷</a>');
});

$('#open3').on('click',function(){
    var dialog3 = new Dialog();
    dialog3.open({
        title: '欢迎来到饥人谷',
        message: 'hello',
        isShowCloseBtn: true,
        isShowConfirmBtn: true,
        onClose: function(){
            alert('close');
        },
        onConfirm: function(){
            alert('确定');
        }
    });
});

var tpl = '<ul><li>列表1</li><li>列表2</li><li>列表1</li><li>列表1</li></ul>';
$('#open4').on('click',function(){
    var dialog4 = new Dialog();
    dialog4.open({
        title: '欢迎来到饥人谷',
        message: tpl,
        isShowCloseBtn: true,
        isShowConfirmBtn: true,
        onClose: function(){
            alert('close');
        },
        onConfirm: function(){
            alert('确定');
        }
    });
});
$('#open5').on('click',function(){
    var dialog5 = new Dialog();
    dialog5.open({
        title: '欢迎来到饥人谷',
        message: 'hello',
        isShowCloseBtn: false,
        isShowConfirmBtn: false
    });
});
