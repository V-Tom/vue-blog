/**
 * @param container
 * @param options
 */
'use strict';

class WaterFall {

    constructor(container, options) {
        this._init(container, options);
    }

    destroy() {
        window.removeEventListener(this._onResize);
        window.removeEventListener(this._onScroll)
    }

    _init(container, options) {
        this.container = container;
        this.currentCell = 3;
        this._options = {
            defaultWidth: options.defaultWidth || 240,
            padding: options.padding || 10,
            cellLimit: options.cellLimit || {min: 1, max: 3},
            defaultCells: options.defaultCells || this.currentCell
        };
        this.page = 1;
        this.totalHeight = null;
        this.timer = null;
        this._setPosition();
    }

    _setPosition() {
        var _this = this;
        this.arrT = [];
        this.arrL = [];
        var iCells = this._getCell();
        for (var i = 0; i < iCells; i++) {
            this.arrT[i] = 0;
            this.arrL[i] = (this._options.defaultWidth + this._options.padding) * i;
        }
        this._bindEvents();
        this._getData(this.page).then(function (data) {
            _this._dealData(data);
        })
    }

    _bindEvents() {
        window.addEventListener('scroll', this._onScroll.bind(this), false);
        window.addEventListener('resize', this._onResize.bind(this), false);
    }

    _onScroll() {
        if (document.querySelector('.waterfall .row').lastChild) {
            var totalHeight = parseInt(document.querySelector('.waterfall .row').lastChild.style.transform.split(',')[1]) - 40;
            this.totalHeight = totalHeight;
            var _this = this;
            document.title = document.body.scrollTop + document.documentElement.clientHeight + ':' + totalHeight;
            if (document.body.scrollTop + document.documentElement.clientHeight + 50 > totalHeight) {
                this.page++;
                if (this.page <= this._options.cellLimit.max) {
                    this._getData(this.page).then(function (data) {
                        _this._dealData(data);
                    })
                } else {
                    return false;
                }
            }
        }
    }

    _onResize() {
        clearTimeout(this.timer);
        var _this = this;
        var translate = function (t) {
            return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
        };
        var totalHeight = parseInt(document.querySelector('.waterfall .row').lastChild.style.transform.split(',')[1]) - 40;
        this.totalHeight = totalHeight;
        this.container.style.height = totalHeight + 'px';
        this.timer = setTimeout(function () {
            var iCell = _this.currentCell;
            _this.currentCell = _this._getCell();
            if (iCell == _this.currentCell) {
                return;
            }
            _this.arrT = [];
            _this.arrL = [];
            for (var i = 0; i < _this.currentCell; i++) {
                _this.arrT[i] = 0;
                _this.arrL[i] = (_this._options.defaultWidth + _this._options.padding) * i;
            }
            [].slice.call(_this.container.querySelectorAll('div')).forEach(function (item) {
                var _index = _this._getMin();
                item.style.transform = translate({x: _this.arrL[_index], y: _this.arrT[_index], z: 0});
                _this.arrT[_index] += item.offsetHeight + 10;
            });
        }, 100);
    }

    _dealData(data) {
        var translate = function (t) {
            return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
        };
        var frag = document.createDocumentFragment(), _this = this;
        data.result.forEach(function (item) {
            var div = document.createElement('div'),
                img = new Image(),
                height = item.height * (_this._options.defaultWidth / item.width);


            div.style.height = height + 'px';

            var index = _this._getMin();
            div.style.transform = translate({x: _this.arrL[index], y: _this.arrT[index], z: 0});

            img.src = item.image;

            div.appendChild(img);
            img = null;
            frag.appendChild(div);


            _this.arrT[index] += height + 10;
        });
        _this.container.appendChild(frag);
        var totalHeight = parseInt(document.querySelector('.waterfall .row').lastChild.style.transform.split(',')[1]) - 40;
        _this.totalHeight = totalHeight;
        _this.container.style.height = totalHeight + 'px';
    }

    _getCell() {
        var iCells = Math.floor(this.container.offsetWidth / (this._options.defaultWidth + this._options.padding)),
            min = this._options.cellLimit.min, max = this._options.cellLimit.max;
        if (iCells <= min) {
            return min;
        } else if (iCells >= max) {
            return max;
        } else {
            return iCells
        }
    }

    _getMin() {
        var compare = this.arrT[0],
            _index = 0;
        this.arrT.forEach(function (item, index, array) {
            if (item < compare) {
                _index = index
            }
        });
        return _index;
    }

    _getData(page) {
        var client = new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            client.open("GET", "data" + page + ".json", true);
            client.onreadystatechange = handler;
            client.responseType = "json";
            client.setRequestHeader("Accept", "application/json");
            client.send(null);
            function handler() {
                if (this.readyState == 4) {
                    if (this.status === 200 && this.readyState === 4) {
                        resolve(this.response)
                    } else {
                        reject(this)
                    }
                } else {
                }
            }
        })
    }
}
