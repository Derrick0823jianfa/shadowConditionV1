Page({
    data: {
        list: [
            {
                id: 'tool',
                name: '卫星计算工具',
                open: false,
                pages: ['emoji', 'index-list', 'tabs', 'vtabs', 'sticky', 'select-text']
            },
            {
                id: 'widget',
                name: '业务相关',
                open: false,
                pages: ['ka业务', '超级基站业务', 'IDR业务']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
});
