(function ($) {
    $.router = {};
    $.service = {};
    $.controller = {};
    $.helper = {};
})(jQuery);
(function ($) {
    $.service.member = {
        login: '/ajax_member/login',
        logout: '/ajax_member/logout',
        get: '/ajax_member/get_member',
        list: '/ajax_member/member_list',
        create: '/ajax_member/add_member',
        update: '/ajax_member/edit_member',
        delete: '/ajax_member/delete_member',
        resetPW: '/ajax_member/reset_pwd'
    };

    $.service.tag = {
        all: '/ajax_tag/tag_list?all=yes',
        list: '/ajax_tag/tag_list',
        create: '/ajax_tag/add_tag',
        update: '/ajax_tag/edit_tag',
        delete: '/ajax_tag/delete_tag',
        used: '/ajax_tag/have_article'
    };

    $.service.article = {
        get: '/ajax_article/get_article',
        list: '/ajax_article/articles_list',
        create: '/ajax_article/add_article',
        update: '/ajax_article/edit_article',
        changeStatus: '/ajax_article/change_article_status' // id, status(0:強制關閉, 1:啟用, 2:審核中, 3:退件)
    };

    $.service.upload = {
        create: '/ajax_staticfiles/create_files',
        get: '/ajax_staticfiles/get_files',
        watermark: {
            get: '/ajax_staticfiles/get_watermark',
            upload: '/ajax_staticfiles/upload_watermark',
            delete: '/ajax_staticfiles/delete_watermark'
        }
    };

    $.service.album = {
        all: '/ajax_album/album_list?all=yes',
        list: '/ajax_album/album_list',
        create: '/ajax_album/add_album',
        update: '/ajax_album/edit_album',
        delete: '/ajax_album/delete_album',
        getPhotos: '/ajax_album/get_photos',
        photo: {
            upload: '/ajax_album/upload_img',
            delete: '/ajax_album/delete_photos'
        }
    };

    $.service.indexlist = {
        get: '/ajax_indexlist/get_indexlist',
        list: '/ajax_indexlist/indexlist_list',
        create: '/ajax_indexlist/add_indexlist',
        update: '/ajax_indexlist/edit_indexlist',
        delete: '/ajax_indexlist/delete_indexlist'
    };

    $.service.admanage = '/static/ad.json';
    $.service.config = '/static/config.json';
})(jQuery);
(function ($) {
    $.router.default = 'dashboard';
    $.router.rootView = '#root-view';
    $.router.routers = {
        'dashboard': {
            name: '儀表板',
            template: '/assets/template/dashboard.html'
        },
        'member': {
            name: '會員管理',
            data: {
                path: $.service.member.list,
                params: function (params) {
                    return {
                        page: params[1]
                    };
                }
            },
            template: '/assets/template/list-member.html'
        },
        'tag': {
            name: '標籤管理',
            data: {
                path: $.service.tag.list,
                params: function (params) {
                    return {
                        page: params[1]
                    };
                }
            },
            template: '/assets/template/list-tag.html'
        },
        'admanage': {
            name: '廣告管理',
            data: {
                path: $.service.admanage
            },
            template: '/assets/template/admanage.html',
            subRouter: {
                'top': {
                    name: 'TOP',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue.html'
                },
                'leftCouplets': {
                    name: '左門聯',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue.html'
                },
                'rightCouplets': {
                    name: '右門聯',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue.html'
                },
                'full': {
                    name: '蓋版廣告',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue.html'
                },
                'nearLogo': {
                    name: 'LOGO 右側的廣告板位',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue.html'
                },
                'aside': {
                    name: '右邊側欄廣告',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue-pro.html'
                },
                'underArticle': {
                    name: '頭版文章下方廣告',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue-pro.html'
                },
                'underGrid': {
                    name: '陣列文章下方廣告',
                    data: {
                        path: $.service.admanage
                    },
                    template: '/assets/template/admanage-queue-pro.html'
                }
            }
        },
        'article': {
            name: '文章管理',
            data: {
                path: $.service.article.list,
                params: function (params) {
                    return {
                        page: params[1]
                    };
                }
            },
            template: '/assets/template/list-article.html',
            subRouter: {
                'create': {
                    name: '新增文章',
                    template: '/assets/template/create-article.html'
                },
                'update': {
                    name: '編輯文章',
                    template: '/assets/template/create-article.html',
                    data: {
                        path: function (params) {
                            return $.service.article.get;
                        },
                        params: function (params) {
                            return {
                                id: params[2]
                            };
                        }
                    }
                }
            }
        },
        'album' : {
            name: '相簿管理',
            data: {
                path: $.service.album.list,
                params: function (params) {
                    return {
                        page: params[1]
                    };
                }
            },
            template: '/assets/template/list-album.html',
            subRouter: {
                'info': {
                    name: '相簿內容',
                    data: {
                        path: $.service.album.getPhotos,
                        params: function (params) {
                            return {
                                id: params[2]
                            };
                        }
                    },
                    template: '/assets/template/list-photos.html'
                }
            }
        },
        'indexlist' : {
            name: '目錄管理',
            data: {
                path: $.service.indexlist.list,
                params: function (params) {
                    return {
                        page: params[1]
                    };
                }
            },
            template: '/assets/template/list-indexlist.html',
            subRouter: {
                'create': {
                    name: '新增目錄',
                    template: '/assets/template/create-indexlist.html'
                },
                'update': {
                    name: '編輯目錄',
                    data: {
                        path: $.service.indexlist.get,
                        params: function (params) {
                            return {
                                id: params[2]
                            };
                        }
                    },
                    template: '/assets/template/create-indexlist.html'
                }
            }
        },
        'static': {
            name: '靜態檔案管理',
            template: '/assets/template/static.html'
        },
        'resetpw': {
            name: '重設密碼',
            data: {
                path: $.service.member.resetPW,
                params: {}
            },
            template: '/assets/template/resetpw.html'
        },
        'logout': {
            name: '登出系統'
        },
        'config': {
            name: '其他設定',
            data: [{
                path: $.service.tag.all,
                params: {}
            },{
                path: $.service.config,
                params: {}
            }],
            template: '/assets/template/config.html'
        }
    };
})(jQuery);
(function ($) {
    $.helper.ad = {
        countCoda: function () {
            var adName = $.helper.ad.getRouterName(),
                root = $.adData.mergeAd[adName],
                count = 0;

            $.each(root.stack, function (index, ad) {
                count += parseInt(ad.coda);
            });

            return parseInt(root.coda) - count;
        },
        getRouterName: function () {
            var match = window.location.hash.match(/\/(.+)$/);
            if (match) {
                return match[1];
            }

            match = window.location.hash.match(/\!(.+)$/);
            if (match) {
                return match[1];
            }

            return null;
        },
        getHash: function (adName) {
            return adName + (new Date()).getTime() + Math.floor(Math.random() * 10000);
        }
    };


})(jQuery);

var FileUploader = function () {
    this.queue = [];
};

FileUploader.prototype.add = function (formData) {
    this.queue.push({
        formData: formData
    });
};

FileUploader.prototype.run = function (uploadUrl, callback) {
    var url = uploadUrl || $.service.album.photo.upload,
        file = this.queue.shift(),
        _arguments = arguments,
        _this = this;
    if (!file) {
        return false;
    } else {
        $.ajax({
            url: url,
            data: file.formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        }).done(function (data) {
            if (data.error) {
                $.helper.ajaxError(data);
            }

            if (typeof callback === 'function') {
                callback(data, {
                    queueLen: _this.queue.length
                });
            }

            _this.run.apply(_this, _arguments);
        });
    }
};

var _fileUploader = new FileUploader();

$.helper.album = {
    uploader: _fileUploader,
    appendPhoto: function (file, $tmpl, $container, albumId) {
        var reader = new FileReader(),
            formData = new FormData(),
            data = {
                p_img: '',
                p_id: 0,
                a_id: $container.closest('.info')
            },
            $photo;

        reader.onloadend = function () {
            data.p_img = this.result;
            $photo = $($tmpl.render(data));
            $container.append($photo);

            formData.append('id', albumId);
            formData.append('file', file);

            _fileUploader.add(formData);
            _fileUploader.run();
        };

        reader.readAsDataURL(file);
    }
};


(function ($) {
    $.helper.editor = {
        addText: function (textEl, str) {
            var textElLength;
            textElLength = textEl.value.length;
            textEl.focus();
            if ('undefined' !== typeof document.selection) {
                document.selection.createRange().text = str;
            } else {
                textEl.value = textEl.value.substr(0, textEl.selectionStart) + str + textEl.value.substring(textEl.selectionStart, textElLength);
            }
        },
        insertPhotos: function ($modal, $inserTarget) {
            var albumList;

            function renderAlbums() {
                var $body = $('#selectImageModalBody');
                if (!$.templates.albumTmpl || !albumList) {
                    $.when($.get('/assets/template/albumItemTemp.html'), $.getJSON($.service.album.all)).done(function (res, res2) {
                        var tmpl = res[0];
                        albumList = res2[0].list;

                        $.templates('albumTmpl', tmpl);

                        $body.html($.templates.albumTmpl.render(albumList));
                        $modal.find('.insert-btn, .return-btn').hide();
                    });
                } else {
                    $body.html($.templates.albumTmpl.render(albumList));
                    $modal.find('.insert-btn, .return-btn').hide();
                }

                $body.one('click', '.album-btn', function () {
                    $modal.find('.insert-btn, .return-btn').show();

                    $.when(
                        $.get('/assets/template/photoItemTemp.html'),
                        $.getJSON($.service.album.getPhotos, {
                            id: $(this).data('id')
                        })
                    ).done(function (res, res2) {
                            var tmpl = res[0],
                                photoList = res2[0].list;

                            $.templates('photoTmpl', tmpl);
                            $body.html($.templates.photoTmpl.render(photoList));
                        });
                });
            }

            // 開啟 MODAL 的時候
            $modal.on('hidden.bs.modal', function (event) {
                $modal.find('*').off('click');
            }).on('show.bs.modal', function (event) {
                var $body = $modal.find('.modal-body');

                renderAlbums($modal);

                $body.on('click', '.photo-btn', function () {
                    $(this).toggleClass('photo-selected');
                });

                $modal.find('.return-btn').on('click', function () {
                    renderAlbums($modal);
                });

                $modal.find('.insert-btn').on('click', function () {
                    var stack = [];

                    $body.find('.photo-selected').each(function () {
                        stack.push($(this).data('path'));
                    });

                    if (0 === stack.length) {
                        alert('請至少選擇一張圖片，才可插入，否則請按取消關閉視窗。');
                        return;
                    }

                    if ('TEXTAREA' === $inserTarget.prop('tagName')) {
                        $.each(stack, function (i, path) {
                            $.helper.editor.addText($inserTarget[0], '＃圖＝' + path + '\n');
                        });
                    } else {
                        $inserTarget.val(stack[0]);
                    }

                    $modal.modal('hide');
                });
            });
        },
        insertPhotosInAd: function ($container, $inserTarget, options) {
            var albumList;

            function renderAlbums() {
                if (!$.templates.albumTmpl || !albumList) {
                    $.when($.get('/assets/template/albumItemTemp.html'), $.getJSON($.service.album.all)).done(function (res, res2) {
                        var tmpl = res[0];
                        albumList = res2[0].list;

                        $.templates('albumTmpl', tmpl);

                        $container.html($.templates.albumTmpl.render(albumList));
                    });
                } else {
                    $container.html($.templates.albumTmpl.render(albumList));
                }

                $container.one('click', '.album-btn', function () {
                    $.when(
                        $.get('/assets/template/photoItemTemp.html'),
                        $.getJSON($.service.album.getPhotos, {
                            id: $(this).data('id')
                        })
                    ).done(function (res, res2) {
                            var tmpl = res[0],
                                photoList = res2[0].list;

                            $.templates('photoTmpl', tmpl);
                            $container.html($.templates.photoTmpl.render(photoList));
                        });
                });
            }

            renderAlbums();

            $container.on('click', '.photo-btn', function () {
                $inserTarget.val($(this).data('path'));
                $container.html('');

                if ('function' === typeof options.afterInsert) {
                    options.afterInsert();
                }
            });
        }
    };
})(jQuery);

(function ($) {
    $.helper.ajaxError = function (data) {
        data = data || {
            msg: 'login fail'
        };

        switch (data.msg) {
            case 'login fail':
                alert('你已被登出');
                window.location.href = '/bk';
                break;
            case 'member data is exist':
                alert('帳號已經重複');
                break;
            case 'plz upload watermark img':
                alert('請先上傳浮水印圖片');
                break;
            default :
                console.log(data.msg);
                loadingErrorDailog(function () {
                    $('#error-dialog').find('.message > span').text(data.msg);
                });
        }
    };

    function loadingErrorDailog(callback) {
        if ($('#error-dialog').length === 0) {
            $.get('/assets/template/error-cover.html').done(function (html) {
                $('#root-view').append(html);
                $('#error-dialog').show().find('.close').one('click.error', function () {
                    $('#error-dialog').hide();
                });

                if ('function' === typeof callback) {
                    callback();
                }
            });
        } else {
            $('#error-dialog').show().find('.close').one('click.error', function () {
                $('#error-dialog').hide();
            });
            if ('function' === typeof callback) {
                callback();
            }
        }

    }
})(jQuery);
(function ($) {
    $.helper.formSerialize = function($form, type) {
        type = (type) ? type : 'object';

        switch (type) {
            case 'object':
                var param = decodeURIComponent($form.serialize()).split('&'),
                    data = {};

                $form.find('[name]').each(function (index, item) {
                    data[$(item).attr('name')] = $(item).val();
                });

                return data;
            default :
                return decodeURIComponent($form.serialize());
        }
    };

    $.helper.formSetter = function($form, data) {
        for (var p in data) {
            var $el = $form.find('[name="' + p.replace('na_', '') + '"]');

            switch ($el.attr('type')) {
                case 'checkbox':
                    $el.prop('checked', data[p]);
                    break;
                default :
                    $el.val(data[p]);
            }

        }
    };
})(jQuery);

(function ($) {
    $.views.helpers('memberType', function(type) {
        switch (type) {
            case '1':
                return 'Root';
            case '2':
                return 'Admin';
            case '3':
                return 'User';
        }
    });

    $.views.helpers('memberStatus', function(status) {
        switch (status) {
            case '1':
                return '啟用中';
            case '2':
                return '停用中';
        }
    });

    $.views.helpers('intToTime', function(time) {
        time = parseInt(time, 10) * 1000;
        var date = new Date(time);
        return date.toLocaleString();
    });

    $.views.helpers('flagFormater', function(flag) {
        switch (flag) {
            case '0':
                return '<button class="btn btn-block">已關閉</button>';
            case '1':
                return '<button class="btn btn-success">啟用中</button>';
            case '2':
                return '<button class="btn btn-info">審核中</button>';
            case '3':
                return '<button class="btn btn-danger">已退件</button>';
        }
    });

    $.views.helpers('timeFormater', function(fromTime, toTime) {
        var now = (new Date()).getTime(),
            from = (new Date(fromTime)).getTime(),
            to = (new Date(toTime)).getTime();

        if (now < from) {
            return '<button class="btn btn-warning">預備中</button>';
        } else if (now > to) {
            return '<button class="btn btn-block">已過期</button>';
        } else {
            return '<button class="btn btn-success">展示中</button>';
        }
    });


    /*
    *  adblock-enabled 展示中
    *  adblock-expired 已過期
    *  adblock-standby 預備中
    *  adblock-disabled 關閉
    * */
    $.views.helpers('getAdStatus', function(disabled, fromTime, toTime) {
        if (disabled) {
            return 'adblock-disabled';
        } else {
            var now = (new Date()).getTime();

            if (now < fromTime) {
                return 'adblock-standby';
            } else if (now > toTime) {
                return 'adblock-expired';
            } else {
                return 'adblock-enabled';
            }
        }
    });

    $.views.helpers('formatTime', function(intTime) {
        if ('number' !== typeof intTime) {
            return 'fail date';
        }

        var date = new Date(intTime);
        return date.toLocaleString();
    });

    $.views.helpers('getRouterName', function() {
        return $.helper.ad.getRouterName();
    });

    $.views.helpers('countCoda', function() {
        return $.helper.ad.countCoda();
    });

    $.views.helpers('checkIsAdmin', function() {
        return (parseInt($.me.m_type) < 3);
    });
})(jQuery);
(function ($) {
    $.helper.paginationFormator = function (count, page) {
        var data = {
            pageNumberList: [],
            count: count,
            page: page,
            finalPage: 0,
            hasNext: false,
            hasPrevious: false
        },
        options = {
            limit: 20
        },
        i;

        // 計算最後一頁的數字
        data.finalPage = Math.floor(count / options.limit);
        if (count % options.limit > 0) {
            data.finalPage += 1;
        }

        if (page < 3) {
            if (data.finalPage < 6) {
                for (i = 1; i <= data.finalPage; i++) {
                    data.pageNumberList.push({
                        num: i,
                        active: (i == page) ? true : false
                    });
                }
            } else {
                for (i = 1; i < 6; i++) {
                    data.pageNumberList.push({
                        num: i,
                        active: (i == page) ? true : false
                    });
                }
                data.hasNext = true;
            }
        } else {
            // 判斷是否有上一頁
            if (page - 3 > 0 && data.finalPage > 5) {
                data.hasPrevious = true;
            }

            if (data.finalPage - page < 3) {
                i = ((data.finalPage - 4) > 1) ? data.finalPage - 4 : 1;
                for (; i <= data.finalPage; i++) {
                    data.pageNumberList.push({
                        num: i,
                        active: (i == page) ? true : false
                    });
                }
            } else {
                for (i = page - 2; i <= (page + 2); i++) {
                    data.pageNumberList.push({
                        num: i,
                        active: (i == page) ? true : false
                    });
                }
                if (data.finalPage > (page + 2)) {
                    data.hasNext = true;
                }
            }
        }

        return data;
    };
})(jQuery);
(function ($) {
    var rootSelector = '#toolbar';
    $.helper.toolbar = {
        openSubmit: function (callback) {
            callback = callback || function () {};
            $(rootSelector)
                .find('.submit-btn')
                .show()
                .on('click.toolbar', callback);
        },
        openCancel: function (callback) {
            callback = callback || function () {};
            $(rootSelector)
                .find('.cancel-btn')
                .show()
                .on('click.toolbar', callback);

        },
        resetAll: function () {
            $(rootSelector).find('*').off();
            $(rootSelector).find('.btn').off('click.toolbar').hide();
        }
    };
})(jQuery);
(function ($) {
    var routerList = ['aside', 'underArticle', 'underGrid'];
    $.each(routerList, function (index, val) {
        makeController(val);
    });

    function makeController(routerName) {
        $.controller['admanage/' + routerName] = {
            _computSizeFactory: function (routerName) {
                var w, h, margin = 15, activeAttr;
                if ('aside' === routerName) {
                    w = 300;
                    h = 160;
                    activeAttr = 'height';
                } else {
                    w = 320;
                    h = 250;
                    activeAttr = 'width';
                }

                return function (coda, $modal) {
                    var info = {
                            width: w,
                            height: h,
                            activeAttr: activeAttr,
                            margin: margin
                        },
                        width,
                        height;

                    info[info.activeAttr] = info[info.activeAttr] * coda + info.margin * (coda - 1);

                    $modal.find('.width-info > .text-primary').text(info.width);
                    $modal.find('.height-info > .text-primary').text(info.height);
                    $modal.find(':hidden[name=width]').val(info.width);
                    $modal.find(':hidden[name=height]').val(info.height);
                };
            },
            controller: function () {
                var adName = $('#ad-queue').data('adname'),
                    $stackModal = $('#adStackModal'),
                    computeSize = this._computSizeFactory(routerName);

                function updateAdJson($modal, callback) {
                    $.post($.service.upload.create, {
                        ext: 'json',
                        filename: 'ad',
                        text: JSON.stringify($.adData)
                    }).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            if ($modal) {
                                $modal.modal('hide');
                            }
                        }
                        callback();
                    });
                }

                //======================== 廣告版位 ======================
                $('.delete-stack-btn').on('click', function () {
                    var $target = $(this),
                        stackIndex = $target.closest('tr').data('index'),
                        $_submitBtn = $target;

                    if (!confirm('版位中的所有素材將一併被刪除，確定要刪除此廣告版位嗎？')) {
                        return false;
                    }

                    // 開始進行刪除動作
                    $.adData.mergeAd[adName].stack.splice(stackIndex, 1);
                    // 刪除完成

                    // 將資料更新至檔案
                    $_submitBtn.addClass('disabled');
                    updateAdJson(null, function () {
                        $.router.reload();
                    });
                });


                $stackModal.on('hidden.bs.modal', function (event) {
                    $.router.reload();
                }).on('show.bs.modal', function (event) {
                    var $modal = $(this),
                        $form = $modal.find('form'),
                        coda = parseInt($.helper.ad.countCoda()),
                        $target = $(event.relatedTarget),
                        $select = $modal.find('#stack-coda'),
                        isCreate = $target.hasClass('new-queue-btn'),
                        codaLimit = coda,
                        optionEls = '',
                        adItem,
                        i;

                    $('[role=switch]').bootstrapSwitch({
                        onText: '開啟',
                        offText: '關閉'
                    });

                    if (!isCreate) {
                        var itemIndex = $target.closest('tr').data('index');

                        adItem = $.adData.mergeAd[adName].stack[itemIndex];

                        codaLimit = coda + parseInt(adItem.coda);
                    }

                    for (i = 1; i <= codaLimit; i++) {
                        optionEls += '<option value="' + i + '">' + i + '</option>';
                    }

                    $select.append(optionEls).on('change', function () {
                        var coda = $(this).val();
                        computeSize(coda, $modal);
                    });

                    if (!isCreate) {
                        $.helper.formSetter($form, adItem);
                        $('#ad-enabled').bootstrapSwitch('state', !adItem.disabled);
                        $modal.find('#adModalLabel').text('編輯廣告');
                    }

                    computeSize($select.val(), $modal);

                    // 按下送出 MODAL 的時候
                    $modal.find('.submit-btn').on('click', function () {
                        var data = $.helper.formSerialize($form, 'object'),
                            $_submitBtn = $(this),
                            defaultData = {
                                "name": "",
                                "coda": "",
                                "disabled": false,
                                "stack": []
                            };

                        if ($_submitBtn.hasClass('disabled')) {
                            return;
                        }

                        if ('' === $('#stack-name').val()) {
                            alert('名稱不能為空');
                            $('#stack-name').focus();
                            return;
                        }

                        data.disabled = !$('#stack-enabled').prop('checked');


                        if (isCreate) {
                            data = $.extend(defaultData, data);
                            $.adData.mergeAd[adName].stack.push(data);
                        } else {
                            data = $.extend($.adData.mergeAd[adName].stack[itemIndex], data);
                            $.adData.mergeAd[adName].stack[itemIndex] = data;
                        }

                        $_submitBtn.addClass('disabled');
                        updateAdJson($modal, function () {
                            $_submitBtn.removeClass('disabled');
                        });
                    });
                });

                //======================== 廣告素材 ======================
                var $modal = $('#adModal');

                $('.adblock').tooltip();

                $.helper.toolbar.openCancel(function () {
                    $.router.go('admanage');
                });

                $modal.on('hidden.bs.modal', function (event) {
                    $.router.reload();
                }).on('show.bs.modal', function (event) {
                    var $modal = $(this),
                        $target = $(event.relatedTarget),
                        $form = $modal.find('form'),
                        stackIndex = $target.closest('tr').data('index'),
                        isCreate = $target.hasClass('adblock-add');

                    // 設定動態事件
                    $('#ad-type').on('change', function () {
                        var type = $(this).val();
                        $('[id^=ad-type-]').hide();
                        $('#ad-type-' + type).show();
                    });

                    $('#ad-fromTime, #ad-toTime').datetimepicker({
                        dateFormat: 'yy-mm-dd',
                        timeFormat: 'HH:mm:ss'
                    }).datetimepicker('setDate', new Date());

                    $('[role=switch]').bootstrapSwitch({
                        onText: '開啟',
                        offText: '關閉'
                    });

                    // 如果是編輯的話，讀取資料並且塞入欄位
                    if (!isCreate) {
                        var itemIndex = $target.data('index'),
                            adItem = $.adData.mergeAd[adName].stack[stackIndex].stack[itemIndex];

                        $.helper.formSetter($form, adItem);
                        $('#ad-enabled').bootstrapSwitch('state', !adItem.disabled);
                        $('#ad-fromTime').datetimepicker('setDate', new Date(parseInt(adItem.fromTime)));
                        $('#ad-toTime').datetimepicker('setDate', new Date(parseInt(adItem.toTime)));
                        $modal.find('#adModalLabel').text('編輯廣告');
                        $('#ad-' + adItem.type).val(adItem.content);
                        $('#ad-type').change();
                    }

                    // 按下送出 MODAL 的時候
                    $modal.find('.submit-btn').on('click', function () {
                        var data = $.helper.formSerialize($form, 'object'),
                            $_submitBtn = $(this),
                            defaultData = {
                                "name": "",
                                "type": "",
                                "link": "",
                                "content": "",
                                "pageView": 0,
                                "clickView": 0,
                                "fromTime": 0,
                                "toTime": 0,
                                "disabled": false
                            };

                        if ($_submitBtn.hasClass('disabled')) {
                            return;
                        }

                        if ('' === $('#ad-name').val()) {
                            alert('名稱不能為空');
                            $('#ad-name').focus();
                            return;
                        }

                        data.content = $('#ad-' + data.type).val();
                        data.disabled = !$('#ad-enabled').prop('checked');

                        data = $.extend(defaultData, data);
                        data.fromTime = (new Date(data.fromTime)).getTime();
                        data.toTime   = (new Date(data.toTime)).getTime();

                        if (isCreate) {
                            $.adData.mergeAd[adName].stack[stackIndex].stack.push(data);
                        } else {
                            $.adData.mergeAd[adName].stack[stackIndex].stack[itemIndex] = data;
                        }

                        $_submitBtn.addClass('disabled');
                        updateAdJson($modal, function () {
                            $_submitBtn.removeClass('disabled');
                        });
                    });

                    $modal.find('.delete-btn').on('click', function () {
                        var $target = $(event.relatedTarget),
                            stackIndex = $target.closest('tr').data('index'),
                            itemIndex = $target.data('index'),
                            $_submitBtn = $(this);

                        if (!confirm('確定要刪除此廣告嗎？')) {
                            return false;
                        }

                        // 開始進行刪除動作
                        $.adData.mergeAd[adName].stack[stackIndex].stack.splice(itemIndex, 1);
                        // 刪除完成

                        // 將資料更新至檔案
                        $_submitBtn.addClass('disabled');
                        updateAdJson($modal, function () {
                            $_submitBtn.removeClass('disabled');
                        });
                    });

                    $modal.find('.choosePhoto-btn').on('click', function () {
                        $.helper.editor.insertPhotosInAd($('#albums-box'), $('#ad-img'), {
                            afterInsert: function () {
                                $modal.find('.img-source').text($('#ad-img').val());
                            }
                        });
                    });
                });
            },
            renderer: function (templateHtml, data, $rootView) {
                $.adData = data;
                $rootView.html($.templates(templateHtml).render($.adData.mergeAd[routerName]));
            }
        };
    }
})(jQuery);
(function ($) {
    var routerList = ['top', 'full', 'leftCouplets', 'rightCouplets', 'nearLogo'];
    $.each(routerList, function (index, val) {
        makeController(val);
    });

    function makeController(routerName) {
        $.controller['admanage/' + routerName] = {
            controller: function () {
                var $modal = $('#adModal');

                $('.adblock').tooltip();

                $.helper.toolbar.openCancel(function () {
                    $.router.go('admanage');
                });

                function updateAdJson($modal, callback) {
                    $.post($.service.upload.create, {
                        ext: 'json',
                        filename: 'ad',
                        text: JSON.stringify($.adData)
                    }).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        callback();
                    });
                }

                $modal.on('hidden.bs.modal', function (event) {
                    $.router.reload();
                }).on('show.bs.modal', function (event) {
                    var $modal = $(this),
                        $target = $(event.relatedTarget),
                        $form = $modal.find('form'),
                        adName = $('#ad-queue').data('adname'),
                        isCreate = $target.hasClass('adblock-add');

                    // 設定動態事件
                    $('#ad-type').on('change', function () {
                        var type = $(this).val();
                        $('[id^=ad-type-]').hide();
                        $('#ad-type-' + type).show();
                    });

                    $('#ad-fromTime, #ad-toTime').datetimepicker({
                        dateFormat: 'yy-mm-dd',
                        timeFormat: 'HH:mm:ss'
                    }).datetimepicker('setDate', new Date());

                    $('[role=switch]').bootstrapSwitch({
                        onText: '開啟',
                        offText: '關閉',
                        onSwitchChange: function () {
                            //console.log($(this).prop('checked'));
                        }
                    });

                    // 如果是編輯的話，讀取資料並且塞入欄位
                    if (!isCreate) {
                        var itemIndex = $target.data('index'),
                            adItem = $.adData.singleAd[adName].stack[itemIndex];

                        $.helper.formSetter($form, adItem);

                        $('#ad-enabled').bootstrapSwitch('state', !adItem.disabled);
                        $('#ad-fromTime').datetimepicker('setDate', new Date(parseInt(adItem.fromTime)));
                        $('#ad-toTime').datetimepicker('setDate', new Date(parseInt(adItem.toTime)));
                        $modal.find('#adModalLabel').text('編輯廣告');
                        $('#ad-' + adItem.type).val(adItem.content);
                        $('#ad-type').change();
                    }

                    // 按下送出 MODAL 的時候
                    $modal.find('.submit-btn').on('click', function () {
                        var data = $.helper.formSerialize($form, 'object'),
                            $_submitBtn = $(this),
                            defaultData = {
                                "hash": $.helper.ad.getHash(adName),
                                "name": "",
                                "type": "",
                                "link": "",
                                "content": "",
                                "pageView": 0,
                                "clickView": 0,
                                "fromTime": 0,
                                "toTime": 0,
                                "disabled": false
                            };

                        if ($_submitBtn.hasClass('disabled')) {
                            return;
                        }

                        if ('' === $('#ad-name').val()) {
                            alert('名稱不能為空');
                            $('#ad-name').focus();
                            return;
                        }

                        data.content = $('#ad-' + data.type).val();
                        data.disabled = !$('#ad-enabled').prop('checked');

                        data = $.extend(defaultData, data);

                        data.fromTime = (new Date(data.fromTime)).getTime();
                        data.toTime = (new Date(data.toTime)).getTime();

                        if (isCreate) {
                            $.adData.singleAd[adName].stack.push(data);
                        } else {
                            $.adData.singleAd[adName].stack[itemIndex] = data;
                        }

                        $_submitBtn.addClass('disabled');
                        updateAdJson($modal, function () {
                            $_submitBtn.removeClass('disabled');
                        });
                    });

                    $modal.find('.delete-btn').on('click', function () {
                        var $target = $(event.relatedTarget),
                            itemIndex = $target.data('index'),
                            data = $.helper.formSerialize($form, 'object'),
                            $_submitBtn = $(this);

                        if (!confirm('確定要刪除此廣告嗎？')) {
                            return false;
                        }

                        // 開始進行刪除動作
                        $.adData.singleAd[adName].stack.splice(itemIndex, 1);
                        // 刪除完成

                        // 將資料更新至檔案
                        $_submitBtn.addClass('disabled');
                        updateAdJson($modal, function () {
                            $_submitBtn.removeClass('disabled');
                        });
                    });

                    $modal.find('.choosePhoto-btn').on('click', function () {
                        $.helper.editor.insertPhotosInAd($('#albums-box'), $('#ad-img'), {
                            afterInsert: function () {
                                $modal.find('.img-source').text($('#ad-img').val());
                            }
                        });
                    });

                });
            },
            renderer: function (templateHtml, data, $rootView) {
                $.adData = data;
                $rootView.html($.templates(templateHtml).render($.adData.singleAd[routerName]));
            }
        };
    }
})(jQuery);
(function ($) {
    $.controller.admanage = {
        controller: function () {
            $('[role=switch]').bootstrapSwitch({
                onText: '開啟',
                offText: '關閉',
                onSwitchChange: function () {
                    var adname = $(this).closest('tr').data('adname'),
                        adtype = $(this).closest('table').data('adtype');
                    $.adData[adtype][adname].status = ($(this).prop('checked'))? 1 : 0;

                    $.post($.service.upload.create, {
                        ext: 'json',
                        filename: 'ad',
                        text: JSON.stringify($.adData)
                    }).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        }
                    });
                }
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            $.adData = data;
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller['album/info'] = {
        controller: function () {
            var dropZone = $('#drop-block')[0],
                albumId = $('.info').data('id'),
                isLock = false;

            $('.album-btn .glyphicon').tooltip();

            $(document).one('dragenter', function (e) {
                $(dropZone).show();
            });

            dropZone.addEventListener('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).hasClass('shining')) {
                    return;
                }
                $(this).show().addClass('shining');
            });

            dropZone.addEventListener('dragleave', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).hasClass('shining')) {
                    $(this).removeClass('shining');
                    $(this).hide();
                    $(document).one('dragenter', function (e) {
                        if (isLock) {
                            return;
                        }
                        $(dropZone).show();
                    });
                }
            });

            dropZone.addEventListener('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var files = e.dataTransfer.files,
                    $dropBlock = $(this),
                    $uploadModal = $('#uploadModal'),
                    total = files.length;

                $('#total-count').text(total);

                $uploadModal.modal('show', {
                    keyboard: false,
                    backdrop: 'static'
                });

                $dropBlock.hide().removeClass('shining');

                $.each(files, function (i, file) {
                    if (file.type.match('image')) {
                        var formData = new FormData();

                        formData.append('id', albumId);
                        formData.append('file', file);
                        $.helper.album.uploader.add(formData);
                    }
                });

                $.helper.album.uploader.run(null, function (data, info) {
                    var complated = total - info.queueLen;

                    $('#complated-count').text(complated);
                    if (0 === info.queueLen) {
                        $uploadModal.modal('hide');
                        $.router.reload();
                    }
                });
            });

            // 刪除相片
            $('.delete-btn').on('click.photo', function () {
                var pid = $(this).data('id');
                $.post($.service.album.photo.delete, {
                    id: pid
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
            // 設為封面
            $('.cover-btn').on('click.photo', function () {
                var cover = $(this).data('cover');

                $.post($.service.album.update, {
                    id: albumId,
                    title: $('.info').data('title'),
                    cover: cover
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller.album = {
        controller: function () {
            $('.enter-btn .glyphicon').tooltip();

            // 開啟 MODAL 的時候
            $('#albumModal').on('hidden.bs.modal', function (event) {
                if (!$(event.relatedTarget).hasClass('.cancel-btn')) {
                    $.router.reload();
                }
            });

            $('#albumModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget), // Button that triggered the modal
                    item = button.data(),
                    title,
                    $modal = $(this);

                if ('edit' === item.type) {
                    title = '修改相簿資訊';
                    $('#album-cover').val(item.cover);
                    $('#album-title').val(item.title);
                    $('#album-id').val(item.id);
                    $modal.find('.delete-btn').show();

                } else {
                    title = '新增相簿';
                    $modal.find('.delete-btn').hide();
                }

                $modal.find('.modal-title').text(title);
                $modal.find('.modal-body').attr('type', item.type);
                $modal.find('.submit-btn').text(title);

                // 按下送出 MODAL 的時候
                $modal.find('.submit-btn').on('click', function () {
                    var $form = $modal.find('form'),
                        data = $.helper.formSerialize($form, 'object'),
                        $_submitBtn = $(this);

                    if ($_submitBtn.hasClass('disabled')) {
                        return;
                    }

                    if ('' === $('#album-title').val()) {
                        alert('名稱不能為空');
                        $('#album-title').focus();
                        return;
                    }

                    $_submitBtn.addClass('disabled');

                    var url = ('edit' === item.type) ? $.service.album.update : $.service.album.create;

                    $.post(url, data).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        $_submitBtn.removeClass('disabled');
                    });
                });

                $modal.find('.delete-btn').on('click', function () {
                    if (!confirm('相簿中的所有照片將一併被刪除，確定要刪除嗎？')) {
                        return;
                    }

                    $.post($.service.album.delete, {
                        id: item.id
                    }).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        $(this).removeClass('disabled');
                    });
                });
            });

            $('#watermarkModal').on('show.bs.modal', function (event) {
                var updateImg = function () {
                    $.getJSON($.service.upload.watermark.get).done(function (data) {
                        if (!data.data) {
                            return;
                        }
                        $('#watermark-img').attr('src', data.data + '?t=' + (new Date()).getTime());
                    });
                };

                updateImg();

                // 上傳浮水印
                $('#watermar-file').on('change', function () {
                    if (null === file) {
                        return false;
                    }
                    var file = (this.files.length > 0) ? this.files[0] : null,
                        formData = new FormData();

                    formData.append('file', file);
                    $.helper.album.uploader.add(formData);
                    $.helper.album.uploader.run($.service.upload.watermark.upload, function (data) {
                        updateImg();
                    });
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            data.pagination = $.helper.paginationFormator(data.total, data.page);
            data.list = data.list || [];
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller['article/create'] = {
        controller: function () {
            var tags;

            $('#article-owner').val($.me.m_name);

            $('.tips-btn[data-toggle=popover]').popover();

            $('#article-fromTime, #article-toTime').datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            }).datetimepicker('setDate', new Date());

            $.getJSON($.service.tag.all).done(function (data) {
                var html = '';

                tags = data.list;

                $.each(data.list, function (i, tag) {
                    html += '<option value="' + tag.t_id + '">' + tag.t_name + '</option>';
                });

                $('#article-tagids').html(html).select2({
                    language: 'zh-TW',
                    placeholder: '請輸入標籤關鍵字'
                });
            });

            $.helper.toolbar.openSubmit(function () {
                var data = $.helper.formSerialize($('#article-form'));

                if ('' === $('#article-title').val()) {
                    alert('文章標題不能為空');
                    $('#article-title').focus();
                    return;
                }

                if ('' === $('#article-content').val()) {
                    alert('文章內容不能為空');
                    $('#article-content').focus();
                    return;
                }

                if ('' === $('#article-owner').val()) {
                    alert('文章標題不能為空');
                    $('#article-owner').focus();
                    return;
                }

                if ('' === $('#article-fromTime').val()) {
                    alert('文章標題不能為空');
                    $('#article-fromTime').focus();
                    return;
                }

                if ('' === $('#article-toTime').val()) {
                    alert('文章標題不能為空');
                    $('#article-toTime').focus();
                    return;
                }

                // 這裡特別將 JSON 轉換為 STRING
                if (data.tagids !== null) {
                    data.tagids = JSON.stringify(data.tagids);
                }

                $.post($.service.article.create, data).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.go('article');
                    }
                });
            });

            $.helper.toolbar.openCancel(function () {
                $.router.go('article');
            });

            $.helper.editor.insertPhotos($('#selectImageModal'), $('#article-content'));
        }
    };
})(jQuery);
(function ($) {
    $.controller['article/update'] = {
        controller: function () {
            $('.tips-btn[data-toggle=popover]').popover();

            $('#article-fromTime, #article-toTime').datetimepicker({
                dateFormat: 'yy-mm-dd',
                timeFormat: 'HH:mm:ss'
            });

            $.getJSON($.service.tag.all).done(function (data) {
                var html = '',
                    tags = data.list,
                    $select = $('#article-tagids'),
                    ids = $select.data('ids').split(',');

                $.each(data.list, function (i, tag) {
                    var selected = '';

                    if (ids.indexOf(tag.t_id) != -1) {
                        selected = ' selected="selected"';
                    }

                    html += '<option value="' + tag.t_id + '"' + selected + '>' + tag.t_name + '</option>';
                });

                $select.html(html).select2({
                    language: 'zh-TW',
                    placeholder: '請輸入標籤關鍵字'
                });
            });


            $.helper.toolbar.openSubmit(function () {
                var data = $.helper.formSerialize($('#article-form'));

                if ('' === $('#article-title').val()) {
                    alert('文章標題不能為空');
                    $('#article-title').focus();
                    return;
                }

                if ('' === $('#article-content').val()) {
                    alert('文章內容不能為空');
                    $('#article-content').focus();
                    return;
                }

                if ('' === $('#article-owner').val()) {
                    alert('文章標題不能為空');
                    $('#article-owner').focus();
                    return;
                }

                if ('' === $('#article-fromTime').val()) {
                    alert('文章標題不能為空');
                    $('#article-fromTime').focus();
                    return;
                }

                if ('' === $('#article-toTime').val()) {
                    alert('文章標題不能為空');
                    $('#article-toTime').focus();
                    return;
                }

                // 這裡特別將 JSON 轉換為 STRING
                if (data.tagids !== null) {
                    data.tagids = JSON.stringify(data.tagids);
                }

                $.post($.service.article.update, data).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.go('article');
                    }
                });
            });
            $.helper.toolbar.openCancel(function () {
                $.router.go('article');
            });

            $.helper.editor.insertPhotos($('#selectImageModal'), $('#article-content'));
        },
        renderer: function (templateHtml, data, $rootView) {
            var tagids =  [];

            $.each(data.data.tags, function (i, tag) {
                tagids.push(tag.t_id);
            });

            data.data.tagids = tagids;
            $rootView.html($.templates(templateHtml).render(data.data));
            $.helper.formSetter($('.form-horizontal'), data.data);
        }
    };
})(jQuery);
(function ($) {
    $.controller.article = {
        controller: function () {
            $('.edit-btn').on('click.list', function () {
                $.router.go('article/update/' + $(this).closest('tr').data('id'));
            });

            $('.change-status-btn').on('click', function () {
                var data = {
                    id: $(this).closest('tr').data('id')
                };

                switch ($(this).data('type')) {
                    case 'on' :
                        data.status = 1;
                        break;
                    case 'off' :
                        data.status = 0;
                        break;
                    case 'pass' :
                        data.status = 1;
                        break;
                    case 'revert':
                        data.status = 3;
                        break;
                    case 'submit':
                        data.status = 2;
                        break;
                }

                $.post($.service.article.changeStatus, data).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            data.pagination = $.helper.paginationFormator(data.total, data.page);
            data.list = data.list || [];
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller.config = {
        _navBindSortable: function ($uls) {
            var controller = this;
            $uls.eq(0).sortable({
                items: '.btn'
            }).on('sortupdate', function () {
                var list = [];

                $(this).find('.btn').each(function (index, item) {
                    var data = $(item).data(),
                        obj = {};

                    if (data.id) {
                        obj.type = 'tag';
                        obj.id = data.id;
                        obj.name = data.name;
                    } else {
                        obj.type = 'link';
                        obj.name = data.name;
                        obj.link = data.link;
                        obj.isBlank = data.isBlank;
                    }

                    list.push(obj);
                });

                controller.myData[$uls.closest('.multi-tags').data('key')].warehouse = list;
                controller._updateSetting();
            });

            $uls.eq(1).find('.btn').draggable({
                connectToSortable: $uls.eq(0),
                helper: 'clone'
            });

            $uls.eq(2).find('.btn').draggable({
                connectToSortable: $uls.eq(0),
                helper: 'clone',
                cancel: '.add-link-btn'
            });
        },
        controller: function () {
            var controller = this,
                myData = this.myData,
                $mainNavUls = $('#config-mainNav ul'),
                $linkNavUls = $('#config-linkNav ul');

            $('.select2').select2({
                language: 'zh-TW',
                placeholder: '請輸入標籤關鍵字',
                maximumSelectionLength: 1
            }).each(function () {
                // 寫入值
                var key = $(this).data('key');

                if (myData[key].id) {
                    $(this).select2('val', myData[key].id);
                }

            }).on('change', function () {
                // 綁定事件
                var $select = $(this),
                    data = {
                        id: 0,
                        name: ''
                    };

                if ($select.val()) {
                    data = {
                        id: $select.val()[0],
                        name: $select.find('option[value=' + $select.val() + ']').text()
                    };
                }

                myData[$select.data('key')] = data;
                controller._updateSetting();
            });

            $('[role=switch]').bootstrapSwitch({
                onText: '是',
                offText: '否'
            });

            controller._navBindSortable($mainNavUls);
            controller._navBindSortable($linkNavUls);
            $($mainNavUls, $linkNavUls).disableSelection();


            $('#addLinkModal').on('hidden.bs.modal', function (event) {
                $.router.reload();
            }).on('show.bs.modal', function (event) {
                var $button = $(event.relatedTarget), // Button that triggered the modal
                    type = $button.data('type'),
                    key = $button.closest('.multi-tags').data('key'),
                    title,
                    $modal = $(this),
                    item = {};

                if ('edit' === type) {
                    title = '修改自定連結';
                    item = $(event.relatedTarget).closest('tr').data();
                    $('#tag-name').val(item.name);
                    $('#tag-id').val(item.id);

                } else {
                    title = '新增自定連結';
                }

                $modal.find('.modal-title').text(title);
                $modal.find('.modal-body').attr('type', type);
                $modal.find('.submit-btn').text(title);

                // 按下送出 MODAL 的時候
                $modal.find('.submit-btn').on('click', function () {
                    var $form = $modal.find('form'),
                        data = $.helper.formSerialize($form, 'object'),
                        $_submitBtn = $(this);

                    if ($_submitBtn.hasClass('disabled')) {
                        return;
                    }

                    if ('' === $('#cuslink-name').val()) {
                        alert('名稱不能為空');
                        $('#addlink-name').focus();
                        return;
                    }

                    data.isBlank = $('#cuslink-isBlank').prop('checked');

                    myData[key].custom.push(data);

                    $_submitBtn.addClass('disabled');

                    controller._updateSetting(function (data) {
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            if ($modal) {
                                $modal.modal('hide');
                            }
                        }
                    });
                });
            });

            // 刪除
            $('.multi-tags').on('click', '.remove-btn', function () {
                var $ul = $(this).closest('ul'),
                    key = $(this).closest('.multi-tags').data('key'),
                    $li = $(this).closest('li');

                if ($(this).closest('fieldset').hasClass('warehouse-box')) {
                    $(this).closest('li').remove();
                    $ul.trigger('sortupdate');
                } else {
                    var index = $(this).closest('li').data('index');
                    $(this).closest('li').remove();
                    myData[key].custom.splice(index, 1);
                    controller._updateSetting();
                }
            });

        },
        renderer: function (templateHtml, data, $rootView) {
            var myData = {};
            myData = data[1][0];
            myData.tags = data[0][0].list;
            this.myData = myData;
            $rootView.html($.templates(templateHtml).render(myData));
        },
        _updateSetting: function (callback) {
            $.post($.service.upload.create, {
                ext: 'json',
                filename: 'config',
                text: JSON.stringify(this.myData)
            }).done(function (responseText) {
                if ('function' === typeof callback) {
                    var data = JSON.parse(responseText);
                    callback(data);
                }
            });
        }
    };
})(jQuery);

(function ($) {
    $.controller.dashboard = {
        controller: function () {
            $.getJSON($.service.member.get_data).done(function (data) {
                if (data.error) {
                    $.helper.ajaxError();
                } else {
                    window.location.href = '/bk';
                }
            });
        }
    };
})(jQuery);
(function ($) {
    $.controller['indexlist/create'] = {
        controller: function () {
            var settings = {
                    colHeaders: ['頁碼', '專欄名稱', '單元名稱', '文章名稱', '作者', '優先'],
                    colWidths: [50, 80, 80, 300, 80, 50],
                    maxCols: 6,
                    startCols: 6,
                    minSpareRows: 1,
                    height: 400
                },
                $jsonList = $('#json-list'),
                tmpArr,
                jsonlist;

            $jsonList.handsontable(settings);


            $.helper.toolbar.openSubmit(function () {
                var data = $.helper.formSerialize($('#indexlist-form'));

                if ('' === $('#indexlist-title').val()) {
                    alert('名稱不能為空');
                    $('#indexlist-title').focus();
                    return;
                }

                if ($('#indexlist-title').val().match(/\D+/)) {
                    alert('名稱只能為數字');
                    $('#indexlist-title').focus();
                    return;
                }

                tmpArr = $jsonList.handsontable('getData') || [];
                jsonlist = [];
                $.each(tmpArr, function (index, item) {
                    if (index === (tmpArr.length - 1)) {
                        return false;
                    }
                    jsonlist.push(tmpArr[index]);
                });

                data.jsonlist = JSON.stringify(jsonlist);

                $.post($.service.indexlist.create, data).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.go('indexlist');
                    }
                });
            });
            $.helper.toolbar.openCancel(function () {
                $.router.go('indexlist');
            });
        }
    };
})(jQuery);
(function ($) {
    $.controller['indexlist/update'] = {
        controller: function () {
            var settings = {
                    colHeaders: ['頁碼', '專欄名稱', '單元名稱', '文章名稱', '作者', '優先'],
                    colWidths: [50, 80, 80, 300, 80, 50],
                    maxCols: 6,
                    startCols: 6,
                    minSpareRows: 1,
                    height: 400
                },
                $jsonList = $('#json-list'),
                contoller = this,
                tmpArr,
                jsonlist;

            $.extend(settings, { data: JSON.parse(contoller.data.jsonlist)});
            $jsonList.handsontable(settings);

            $.helper.toolbar.openSubmit(function () {
                var data = $.helper.formSerialize($('#indexlist-form'));

                if ('' === $('#indexlist-title').val()) {
                    alert('名稱不能為空');
                    $('#indexlist-title').focus();
                    return;
                }

                if ($('#indexlist-title').val().match(/\D+/)) {
                    alert('名稱只能為數字');
                    $('#indexlist-title').focus();
                    return;
                }

                tmpArr = $jsonList.handsontable('getData') || [];
                jsonlist = [];
                $.each(tmpArr, function (index, item) {
                    if (index === (tmpArr.length - 1)) {
                        return false;
                    }
                    jsonlist.push(tmpArr[index]);
                });

                data.jsonlist = JSON.stringify(jsonlist);

                $.post($.service.indexlist.update, data).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.go('indexlist');
                    }
                });
            });
            $.helper.toolbar.openCancel(function () {
                $.router.go('indexlist');
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            $rootView.html($.templates(templateHtml).render({}));
            this.data = data.data;
            $.helper.formSetter($('.form-horizontal'), data.data);
        },
        data: {}
    };
})(jQuery);
(function ($) {
    $.controller.indexlist = {
        controller: function () {
            $('.delete-btn').on('click', function() {
                var id = $(this).data('id');

                if (!confirm('確定要刪除？')) {
                    return;
                }

                $.post($.service.indexlist.delete, {
                    id: id
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            data.pagination = $.helper.paginationFormator(data.total, data.page);
            data.list = data.list || [];
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller['bk/login'] = {
        controller: function () {
            $('#submit-login').on('click', function () {
                $.router.go('bk/dashboard');
            });
        }
    };
})(jQuery);
(function ($) {
    $.controller.logout = {
        controller: function () {
            $.getJSON($.service.member.logout).done(function (data) {
                window.location.href = '/bk';
            });
        }
    };
})(jQuery);
(function ($) {
    $.controller.member = {
        controller: function () {
            // 開啟 MODAL 的時候
            $('#memberModal').on('hidden.bs.modal', function (event) {
                if (!$(event.relatedTarget).hasClass('.cancel-btn')) {
                    $.router.reload();
                }
            });

            $('#memberModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget), // Button that triggered the modal
                    type = button.data('type'),
                    title,
                    $modal = $(this),
                    id;

                if ('edit' === type) {
                    title = '修改會員資料';

                    id = $(event.relatedTarget).closest('tr').data('id');

                    $.getJSON($.service.member.list, {id: id}).done(function (data) {
                        if (data.error) {
                            $.helper.ajaxError(data);
                        }

                        if (data.total) {
                            var member = data.row;
                            $('#member-account').val(member.m_account);
                            $('#member-name').val(member.m_name);
                            $('#member-type').val(member.m_type);
                            $('#member-id').val(id);
                        }

                    });
                    $modal.find('.delete-btn').show();

                } else {
                    title = '新增會員資料';
                    $modal.find('.delete-btn').hide();
                }

                $modal.find('.modal-title').text(title);
                $modal.find('.modal-body').attr('type', type);
                $modal.find('.submit-btn').text(title);

                // 按下送出 MODAL 的時候
                $modal.find('.submit-btn').on('click', function () {
                    var $form = $modal.find('form'),
                        data = $.helper.formSerialize($form, 'object'),
                        $_submitBtn = $(this);

                    if ($_submitBtn.hasClass('disabled')) {
                        return;
                    }

                    if ('' === $('#member-account').val()) {
                        alert('帳號不能為空');
                        $('#member-account').focus();
                        return;
                    }

                    $_submitBtn.addClass('disabled');

                    var url = ('edit' === type) ? $.service.member.update : $.service.member.create;

                    $.post(url, data).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        $_submitBtn.removeClass('disabled');
                    });
                });

                $modal.find('.delete-btn').on('click', function () {
                    if (!confirm('確定要刪除嗎？')) {
                        return;
                    }

                    $.post($.service.member.delete, {
                        id: id
                    }).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        $(this).removeClass('disabled');
                    });
                });
            });

            $('.enabled-btn').on('click', function () {
                var id = $(this).closest('tr').data('id');
                $.post($.service.member.update, {
                    id: id,
                    status: 1
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });

            $('.disabled-btn').on('click', function () {
                var id = $(this).closest('tr').data('id');
                $.post($.service.member.update, {
                    id: id,
                    status: 2
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });

            $('.resetpw-btn').on('click', function () {
                var account = $(this).data('account');
                $.getJSON($.service.member.resetPW, {
                    account: account
                }).done(function (data) {
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            data.pagination = $.helper.paginationFormator(data.total, data.page);
            data.member = $.me;
            data.list = data.list || [];
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.controller.static = {
        controller: function () {
            var params = window.location.hash.split('/'),
                name = params[1],
                title;

            switch (name) {
                case 'about':
                    title = '關於 PCDIY!';
                    break;
                case 'adpost':
                    title = '廣告刊登';
                    break;
                case 'bulletin':
                    title = '雜誌公告';
                    break;
                case 'ordermagazine':
                    title = '訂閱雜誌';
                    break;
            }

            $('#static-title').text(title);

            $.get('/static/' + name + '.html').done(function (html) {
                $('#text-editor').val(html);
            });

            $.helper.toolbar.openSubmit(function () {
                $.post($.service.upload.create, {
                    ext: 'html',
                    filename: name,
                    text: $('#text-editor').val()
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $('#uploadModal').modal('show');
                    }
                });
            });


        }
    };
})(jQuery);
(function ($) {
    $.controller.tag = {
        controller: function () {
            // 開啟 MODAL 的時候
            $('#tagModal').on('hidden.bs.modal', function (event) {
                if (!$(event.relatedTarget).hasClass('.cancel-btn')) {
                    $.router.reload();
                }
            });

            $('#tagModal').on('show.bs.modal', function (event) {
                var button    = $(event.relatedTarget), // Button that triggered the modal
                    type = button.data('type'),
                    title,
                    $modal = $(this),
                    item = {};

                if ('edit' === type) {
                    title = '修改標籤';
                    item = $(event.relatedTarget).closest('tr').data();
                    $('#tag-name').val(item.name);
                    $('#tag-id').val(item.id);

                } else {
                    title = '新增標籤';
                }

                $modal.find('.modal-title').text(title);
                $modal.find('.modal-body').attr('type', type);
                $modal.find('.submit-btn').text(title);

                // 按下送出 MODAL 的時候
                $modal.find('.submit-btn').on('click', function () {
                    var $form = $modal.find('form'),
                        data = $.helper.formSerialize($form, 'object'),
                        $_submitBtn = $(this);

                    if ($_submitBtn.hasClass('disabled')) {
                        return;
                    }

                    if ('' === $('#tag-name').val()) {
                        alert('名稱不能為空');
                        $('#tag-name').focus();
                        return;
                    }

                    $_submitBtn.addClass('disabled');

                    var url = ('edit' === type) ? $.service.tag.update : $.service.tag.create;

                    $.post(url, data).done(function (responseText) {
                        var data = JSON.parse(responseText);
                        if (data.error) {
                            $.helper.ajaxError(data);
                        } else {
                            $modal.modal('hide');
                        }
                        $_submitBtn.removeClass('disabled');
                    });
                });
            });

            $('.delete-btn').on('click', function() {
                var id = $(this).data('id');

                if (!confirm('確定要刪除？')) {
                    return;
                }

                $.post($.service.tag.delete, {
                    id: id
                }).done(function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error) {
                        $.helper.ajaxError(data);
                    } else {
                        $.router.reload();
                    }
                });
            });
        },
        renderer: function (templateHtml, data, $rootView) {
            data.pagination = $.helper.paginationFormator(data.total, data.page);
            data.list = data.list || [];
            $rootView.html($.templates(templateHtml).render(data));
        }
    };
})(jQuery);
(function ($) {
    $.router.reload = function () {
        $.router.init($.router.getState());
    };

    $.router.getState = function () {
        return window.location.hash.replace('#!', '');
    };

    $.router.go = function (routerName) {
        if (typeof routerName === 'string') {
            window.location.hash = '#!' + routerName;
        }
    };

    $.router.init = function (routerName) {
        // 先判斷是否有指定 router name
        routerName = (routerName) ? routerName : $.router.getState();
        var params = routerName.split('/'),
            routerKey = params[0],
            router = $.router.routers[routerKey],
            guideMap = [],
            data = {
                path: '',
                params: {},
                result: '',
                status: ''
            };

        $.helper.toolbar.resetAll();

        if (!router) {
            // 如果沒有 match router 就給予設定預設值
            router = $.router.routers[$.router.default];
            routerKey = $.router.default;
        }

        guideMap.push(router.name);

        if (router.subRouter && router.subRouter[params[1]]) {
            router = router.subRouter[params[1]];
            routerKey = params[0] + '/' + params[1];
            guideMap.push(router.name);
        }

        if (router.data) {
            data.status = 'wait';

            if (router.data.length) {
                var deffers = [];
                $.each(router.data, function (i, item) {
                    item = $.extend({}, data, item);
                    var pathTemp   = ('function' === typeof item.path)   ? item.path(params)   : item.path;
                    var paramsTemp = ('function' === typeof item.params) ? item.params(params) : item.params;

                    deffers.push($.getJSON(pathTemp, paramsTemp));
                });

                $.when.apply(this, deffers).done(function () {
                    var hasError = false;

                    $.each(arguments, function (i, response) {
                        if (response.error) {
                            $.helper.ajaxError(response);
                            hasError = true;
                            return false;
                        }
                    });

                    if (hasError) {
                        return;
                    }

                    data.result = arguments;
                    data.status = 'done';
                    $(document).trigger(routerKey);
                }).fail(function () {
                    $.each(arguments, function (i, response) {
                        if (response.error) {
                            $.helper.ajaxError(response);
                        }
                    });
                });

            } else {

                data = $.extend({}, data, router.data);
                var pathTemp   = ('function' === typeof data.path) ? data.path(params) : data.path;
                var paramsTemp = ('function' === typeof data.params) ? data.params(params) : data.params;

                $.getJSON(pathTemp, paramsTemp).done(function (response) {
                    if (response.error) {
                        $.helper.ajaxError(response);
                        return;
                    }

                    data.result = response;
                    data.status = 'done';
                    $(document).trigger(routerKey);

                }).fail(function () {
                    $.helper.ajaxError(response);
                });
            }
        }

        // 載入 template html 並且進行 getdata 和 render
        $.get(router.template).done(function (responseText) {
            $(function () {
                var html = responseText;

                // 組合 html 和 data
                function render(template, json) {

                    if (null === json.data) {
                        json.data = [];
                    }
                    // 如果有設定自己的 renderer 就不自動 render
                    if ($.controller[routerKey] && typeof $.controller[routerKey].renderer === 'function') {
                        $.controller[routerKey].renderer(template, json, $($.router.rootView));
                    } else {
                        $($.router.rootView).html($.templates(template).render(json));
                    }

                    if ($.controller[routerKey] && typeof $.controller[routerKey].controller === 'function') {
                        $.controller[routerKey].controller(); // 執行 controller ，如果有的話
                    }

                    //window.location.hash = '!' + routerName;
                    check_active();
                }

                switch (data.status) {
                    case 'wait':
                        $(document).one(routerKey, function () {
                            render(responseText, data.result);
                        });
                        break;

                    case 'done':
                        render(responseText, data.result);
                        break;

                    default :
                        render(responseText, {});
                }
            });
        });

        $(function () {
            var $title = $('title'),
                $guideMap = $('#guide-map'),
                guideInfo = guideMap.join(' > ');

            $guideMap.text(guideInfo);
        });
    };

    function check_active() {
        $('.nav.navbar-nav li').removeClass('active').find('a[role="router"]').each(function () {
            var sref = $(this).attr('sref');
            $(this).attr('href', '#!' + sref);
            if (window.location.hash.replace(/\#\!/, '').split('/')[0] === sref) {
                $(this).parent().addClass('active');
            }
        });

        $('#root-view a[role="router"]').each(function () {
            $(this).attr('href', '#!' + $(this).attr('sref'));
        });
    }
    $(function () {
        $('#main-header-navbar').find('[role="router"]').on('click.bootstrap', function () {
            var $toogleBtn = $('.navbar-toggle');
            if ('true' === $toogleBtn.attr('aria-expanded')) {
                $toogleBtn.click();
            }
        });
    });
})(jQuery);
(function () {
    $.getJSON($.service.member.get).done(function (data) {
        if (data.error) {
            $.helper.ajaxError(data);
        } else {
            $.me = data.row;

            if ('1' === $.me.m_type) {
                $('.flag-root').show();
            }

            if ('2' === $.me.m_type) {
                $('.flag-admin').show();
            }

            $.router.init();
        }
    });
    $(window).on('hashchange', function (e) {
        $.router.init();
    });
})();