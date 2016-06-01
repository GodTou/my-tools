var fid = location.href.split('/');
var pid = $('.chat-list>li').last().data('pid');
var xhr;


fid = fid[fid.length - 2];
setInterval(function() {
    xhr && xhr.abort();
    xhr = $.getJSON('http://t.10jqka.com.cn/newcircle/live/getChatList/', {
        master: 1,
        sort: 'down',
        fid: fid,
        pid: pid,
        _: +new Date()
    }, function(json) {
        if ( json.errorCode == 0 ) {
            var dom = $(json.result),
                msg = dom.find('.chat-txt').text();

            pid = dom.last().data('pid');
            notify(msg);
        }
    });
}, 3000);

function notify(msg) {
    Notification.requestPermission( function() {
        var nfc = new Notification(document.title.split('_').shift(), {body: msg}); // 显示通知
        setTimeout(function() {
            nfc.close();
        }, 6000);
    });
}
