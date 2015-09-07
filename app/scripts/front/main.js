(function ($) {
    // document 載入以前
    function Queue() {
        this.stack = [];
        this.index = 0;
        this.isRun = false;
    }

    Queue.prototype.add = function (callback, time) {
        if (this.isRun) {
            return;
        }

        this.stack.push({
            time: (time >= 0) ? time : 0,
            callback: (typeof callback === 'function') ? callback : function () {
            }
        });
    };

    Queue.prototype.clear = function () {
        this.stack = [];
        this.index = 0;
        this.isRun = false;
    };

    Queue.prototype.run = function () {
        var _this = this;
        if (this.index < this.stack.length) {
            this.isRun = true;
            var item = this.stack[this.index];

            item.callback();

            setTimeout(function () {
                _this.index++;
                _this.run();
            }, item.time);
        } else {
            this.clear();
        }
    };

    var queue = new Queue();
    var stack = [],
        answerIndex = 0;


    $.config = {
        level: 3
    };


    $(function () {
        var $press = $('.press-btn');

        $press.on('click', function () {
            if (stack[answerIndex] !== $(this).index()) {
                alert('你按錯了！！！！遊戲結束 :D');
                if (confirm('再來一次？')) {
                    start();
                }
            } else {
                answerIndex++;

                if (answerIndex == stack.length) {
                    alert('全部答對！！！！遊戲結束 :D');
                    if (confirm('再來一次？')) {
                        start();
                    }
                }
            }
        });

        start();
    });

    function getColor() {
        return ['btn-red', 'btn-blue', 'btn-yellow', 'btn-pink', 'btn-green', 'btn-aliceblue', 'btn-cyan', 'btn-gray', 'btn-aquamarine'];
    }

    function reset() {
        var $press = $('.press-btn'),
            bgColors = getColor();
        stack = [];
        answerIndex = 0;

        $press.each(function () {
            var index = Math.floor(Math.random() * bgColors.length),
                color = bgColors.splice(index, 1)[0];

            $(this).addClass(color);
        });
    }

    function start() {
        reset();
        alert('準備好了嗎？');
        for (var i = 0; i < $.config.level; i++) {
            stack.push(Math.floor(Math.random() * 9));
        }
        autoRun();
    }

    function autoRun() {
        var i, $press = $('.press-btn');

        $.each(stack, function (i, val) {
            queue.add(function () {
                $press.eq(val).addClass('active');
                setTimeout(function () {
                    $press.eq(val).removeClass('active');
                }, 500);
            }, 800);
        });

        queue.run();
    }

})(jQuery);