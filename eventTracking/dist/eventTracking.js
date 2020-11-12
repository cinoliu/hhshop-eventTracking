(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.eventTracking = factory());
}(this, (function () {
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var globalVarApp = App; // 小程序原App对象
  var globalVarPage = Page; // 小程序原Page对象
  var globalVarComponent = Component; // 小程序原Component对象

  var Wrapper = function () {
    function Wrapper(isUsingPlugin) {
      var _this = this;

      classCallCheck(this, Wrapper);

      this.injectPageMethods = [];
      this.injectAppMethods = [];
      this.extraPageMethods = [];
      this.extraAppMethods = [];
      this.injectComponentMethods = [];
      this.extraComponentMethods = [];
      if (!isUsingPlugin) {
        App = function App(app) {
          return globalVarApp(_this._create(app, _this.injectAppMethods, _this.extraAppMethods));
        };
        Page = function Page(page) {
          return globalVarPage(_this._create(page, _this.injectPageMethods, _this.extraPageMethods));
        };
        Component = function Component(component) {
          return globalVarComponent(_this._createComponent(component, _this.injectComponentMethods, _this.extraComponentMethods));
        };
      }
    }

    /**
     * 对用户定义函数进行包装.
     * @param {Object} target page对象或者app对象
     * @param {String} methodName 需要包装的函数名
     * @param {Array} methods 函数执行前执行任务
     */


    createClass(Wrapper, [{
      key: '_wrapTargetMethod',
      value: function _wrapTargetMethod(target, component, methodName) {
        var methods = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        var methodFunction = target[methodName];
        target[methodName] = function _aa() {
          var _this2 = this;

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var result = methodFunction && methodFunction.apply(this, args);
          var methodExcuter = function methodExcuter() {
            methods.forEach(function (fn) {
              fn.apply(_this2, [target, component, methodName].concat(args));
            });
          };
          try {
            if (Object.prototype.toString.call(result) === '[object Promise]') {
              result.then(function () {
                methodExcuter();
              }).catch(function () {
                methodExcuter();
              });
            } else {
              methodExcuter();
            }
          } catch (e) {
            console.error(methodName, '钩子函数执行出现错误', e);
          }
          return result;
        };
      }

      /**
       * 追加函数到Page/App对象
       * @param {Object} target page对象或者app对象
       * @param {Array} methods 需要追加的函数数组
       */

    }, {
      key: '_addExtraMethod',
      value: function _addExtraMethod(target, methods) {
        methods.forEach(function (fn) {
          var methodName = fn.name;
          target[methodName] = fn;
        });
      }

      /**
       * @param {*} target page对象或者app对象
       * @param {*} methods 需要插入执行的函数
       */

    }, {
      key: '_create',
      value: function _create(target, injectMethods, extraMethods) {
        var _this3 = this;

        Object.keys(target).filter(function (prop) {
          return typeof target[prop] === 'function';
        }).forEach(function (methodName) {
          _this3._wrapTargetMethod(target, null, methodName, injectMethods);
        });
        this._addExtraMethod(target, extraMethods);
        return target;
      }
    }, {
      key: '_createComponent',
      value: function _createComponent(component, injectMethods, extraMethods) {
        var _this4 = this;

        var target = component.methods;
        Object.keys(target).filter(function (prop) {
          return typeof target[prop] === 'function';
        }).forEach(function (methodName) {
          _this4._wrapTargetMethod(target, component, methodName, injectMethods);
        });
        this._addExtraMethod(target, extraMethods);
        return component;
      }
    }, {
      key: 'addPageMethodWrapper',
      value: function addPageMethodWrapper(fn) {
        this.injectPageMethods.push(fn);
      }
    }, {
      key: 'addComponentMethodWrapper',
      value: function addComponentMethodWrapper(fn) {
        this.injectComponentMethods.push(fn);
      }
    }, {
      key: 'addAppMethodWrapper',
      value: function addAppMethodWrapper(fn) {
        this.injectAppMethods.push(fn);
      }
    }, {
      key: 'addPageMethodExtra',
      value: function addPageMethodExtra(fn) {
        this.extraPageMethods.push(fn);
      }
    }, {
      key: 'addAppMethodExtra',
      value: function addAppMethodExtra(fn) {
        this.extraAppMethods.push(fn);
      }
    }, {
      key: 'createApp',
      value: function createApp(app) {
        globalVarApp(this._create(app, this.injectAppMethods, this.extraAppMethods));
      }
    }, {
      key: 'createPage',
      value: function createPage(page) {
        globalVarPage(this._create(page, this.injectPageMethods, this.extraPageMethods));
      }
    }, {
      key: 'createComponent',
      value: function createComponent(component) {
        globalVarPage(this._createComponent(component, this.injectPageMethods, this.extraPageMethods));
      }
    }]);
    return Wrapper;
  }();

  /**
   * 获取页面元素信息
   * @param {String} element 元素class或者id
   * @returns {Promise}
   */
  var getBoundingClientRect = function getBoundingClientRect(element) {
      return new Promise(function (reslove) {
          var query = wx.createSelectorQuery();
          query.selectAll(element).boundingClientRect();
          query.selectViewport().scrollOffset();
          query.exec(function (res) {
              return reslove({ boundingClientRect: res[0], scrollOffset: res[1] });
          });
      });
  };
  /**
   * 判断点击是否落在目标元素
   * @param {Object} clickInfo 用户点击坐标
   * @param {Object} boundingClientRect 目标元素信息
   * @param {Object} scrollOffset 页面位置信息
   * @returns {Boolean}
   */
  var isClickTrackArea = function isClickTrackArea(clickInfo, boundingClientRect, scrollOffset) {
      if (!boundingClientRect) return false;
      var _clickInfo$detail = clickInfo.detail,
          x = _clickInfo$detail.x,
          y = _clickInfo$detail.y; // 点击的x y坐标

      var left = boundingClientRect.left,
          right = boundingClientRect.right,
          top = boundingClientRect.top,
          height = boundingClientRect.height;
      var scrollTop = scrollOffset.scrollTop;

      if (left < x && x < right && scrollTop + top < y && y < scrollTop + top + height) {
          return true;
      }
      return false;
  };

  /**
   * 获取当前页面
   * @returns {Object} 当前页面Page对象
   */
  var getActivePage = function getActivePage() {
      var curPages = getCurrentPages();
      if (curPages.length) {
          return curPages[curPages.length - 1];
      }
      return {};
  };

  /**
   * 解析数组类型dataKey
   * 例如list[$INDEX],返回{key:list, index: $INDEX}
   * 例如list[4],返回{key:list, index: 4}
   * @param {*} key
   * @param {*} index
   */

  var apis = require('../../utils/apis.js');

  var resloveArrayDataKey = function resloveArrayDataKey(key, index) {
      var leftBracketIndex = key.indexOf('[');
      var rightBracketIndex = key.indexOf(']');
      var result = {};
      if (leftBracketIndex > -1) {
          var arrIndex = key.substring(leftBracketIndex + 1, rightBracketIndex);
          var arrKey = key.substring(0, leftBracketIndex);
          if (arrIndex === '$INDEX') {
              arrIndex = index;
          }
          result.key = arrKey;
          result.index = parseInt(arrIndex, 10);
      }
      return result;
  };

  /**
   * 获取全局数据
   * @param {*} key 目前支持$APP.* $DATASET.* $INDEX
   * @param {*} dataset 点击元素dataset
   * @param {*} index 点击元素索引
   */
  var getGloabData = function getGloabData(key, dataset) {
      var result = '';
      if (key.indexOf('$APP.') > -1) {
          var App = getApp();
          var appKey = key.split('$APP.')[1];
          result = App[appKey];
      } else if (key.indexOf('$DATASET.') > -1) {
          var setKey = key.split('$DATASET.')[1];
          result = dataset[setKey];
      } else if (key.indexOf('$INDEX') > -1) {
          result = dataset.index;
      }
      return result;
  };

  var getPageData = function getPageData(key) {
      var dataset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var paegData = arguments[2];
      var index = dataset.index;

      var keys = key.split('.');
      var result = paegData;
      if (keys.length > -1) {
          keys.forEach(function (name) {
              var res = resloveArrayDataKey(name, index);
              if (res.key) {
                  result = result[res.key][res.index];
              } else {
                  result = result[name];
              }
          });
      } else {
          result = paegData[key];
      }
      return result;
  };

  var dataReader = function dataReader(key, dataset, pageData) {
      try {
          var result = '';
          if (key.indexOf('$') === 0) {
              result = getGloabData(key, dataset);
          } else {
              result = getPageData(key, dataset, pageData);
          }
          return result;
      } catch (e) {
          console.log(e);
          return '';
      }
  };

  var report = function report(track, pageData) {
      var element = track.element,
          method = track.method,
          remark = track.remark;

      var logger = [];
      track.dataKeys.forEach(function (name) {
          var data = dataReader(name, track.dataset, pageData);
          logger.push({ element: element, method: method, name: name, data: data, remark: remark });
      });
      console.table(logger);
      var data = {
          logList: logger,
          userInfo: wx.getStorageSync("userInfo")
      };
      wx.request({
          url: apis.logUrl,
          method: 'POST',
          data: data,
          header: apis.jsonHead,
          success: function success(res) {
              console.log(res);
          },
          fail: function fail(res) {
              console.log(res);
          }
      });
  };

  var Tracker = function (_Wrapper) {
      inherits(Tracker, _Wrapper);

      function Tracker(_ref) {
          var tracks = _ref.tracks,
              isUsingPlugin = _ref.isUsingPlugin;
          classCallCheck(this, Tracker);

          // 埋点配置信息
          var _this = possibleConstructorReturn(this, (Tracker.__proto__ || Object.getPrototypeOf(Tracker)).call(this, isUsingPlugin));

          _this.tracks = tracks;
          // 自动给每个page增加elementTracker方法，用作元素埋点
          _this.addPageMethodExtra(_this.elementTracker());
          // 自动给page下预先定义的方法进行监听，用作方法执行埋点
          _this.addPageMethodWrapper(_this.methodTracker());
          // 自动给page component下预先定义的方法进行监听，用作方法执行埋点
          _this.addComponentMethodWrapper(_this.comMethodTracker());
          return _this;
      }

      createClass(Tracker, [{
          key: 'elementTracker',
          value: function elementTracker() {
              var _this2 = this;

              // elementTracker变量名尽量不要修改，因为他和wxml下的名字是相对应的
              var elementTracker = function elementTracker(e) {
                  var tracks = _this2.findActivePageTracks('element');

                  var _getActivePage = getActivePage(),
                      data = _getActivePage.data;

                  tracks.forEach(function (track) {
                      getBoundingClientRect(track.element).then(function (res) {
                          res.boundingClientRect.forEach(function (item) {
                              var isHit = isClickTrackArea(e, item, res.scrollOffset);
                              track.dataset = item.dataset;
                              isHit && report(track, data);
                          });
                      });
                  });
              };
              return elementTracker;
          }
      }, {
          key: 'methodTracker',
          value: function methodTracker() {
              var _this3 = this;

              return function (page, component, methodName) {
                  var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                  var tracks = _this3.findActivePageTracks('method');

                  var _getActivePage2 = getActivePage(),
                      data = _getActivePage2.data;

                  var _ref2 = args.currentTarget || {},
                      dataset = _ref2.dataset;

                  tracks.forEach(function (track) {
                      if (track.method === methodName) {
                          track.dataset = dataset;
                          report(track, data);
                      }
                  });
              };
          }

          /**
           * function函数改变上下文this指针，指向组件
           */

      }, {
          key: 'comMethodTracker',
          value: function comMethodTracker() {
              var self = this;
              return function (page, component, methodName) {
                  var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

                  var tracks = self.findActivePageTracks('comMethod');
                  var data = this.data;

                  var _ref3 = args.currentTarget || {},
                      dataset = _ref3.dataset;

                  tracks.forEach(function (track) {
                      if (track.method === methodName) {
                          track.dataset = dataset;
                          report(track, data);
                      }
                  });
              };
          }

          /**
           * 获取当前页面的埋点配置
           * @param {String} type 返回的埋点配置，options: method/element/comMethod
           * @returns {Object}
           */

      }, {
          key: 'findActivePageTracks',
          value: function findActivePageTracks(type) {
              try {
                  var _getActivePage3 = getActivePage(),
                      route = _getActivePage3.route;

                  var pageTrackConfig = this.tracks.find(function (item) {
                      return item.path === route;
                  }) || {};
                  var tracks = {};
                  if (type === 'method') {
                      tracks = pageTrackConfig.methodTracks || [];
                  } else if (type === 'element') {
                      tracks = pageTrackConfig.elementTracks || [];
                  } else if (type === 'comMethod') {
                      tracks = pageTrackConfig.comMethodTracks || [];
                  }
                  return tracks;
              } catch (e) {
                  return {};
              }
          }
      }]);
      return Tracker;
  }(Wrapper);

  return Tracker;

})));
