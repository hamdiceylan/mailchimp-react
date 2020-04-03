(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'jsonp'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('jsonp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.jsonp);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _jsonp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _jsonp2 = _interopRequireDefault(_jsonp);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = function (_ref) {
    var _ref$styles = _ref.styles,
        styles = _ref$styles === undefined ? {
      sendingMsg: {
        color: '#0652DD'
      },
      successMsg: {
        color: '#009432'
      },
      duplicateMsg: {
        color: '#EE5A24'
      },
      errorMsg: {
        color: '#ED4C67'
      }
    } : _ref$styles,
        className = _ref.className,
        _ref$namePlaceHolder = _ref.namePlaceHolder,
        namePlaceHolder = _ref$namePlaceHolder === undefined ? 'Please type your name' : _ref$namePlaceHolder,
        _ref$placeHolder = _ref.placeHolder,
        placeHolder = _ref$placeHolder === undefined ? 'Please type your email' : _ref$placeHolder,
        buttonClassName = _ref.buttonClassName,
        action = _ref.action,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {
      sending: 'Sending...',
      success: 'Thank you for subscribing!',
      error: 'An unexpected internal error has occurred.',
      empty: 'You must write an e-mail.',
      duplicate: 'Too many subscribe attempts for this email address',
      button: 'Subscribe!'
    } : _ref$messages;

    var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        status = _useState2[0],
        setStatus = _useState2[1];

    var _useState3 = (0, _react.useState)(''),
        _useState4 = _slicedToArray(_useState3, 2),
        email = _useState4[0],
        setEmail = _useState4[1];

    var _useState5 = (0, _react.useState)(''),
        _useState6 = _slicedToArray(_useState5, 2),
        name = _useState6[0],
        setName = _useState6[1];

    var handleSubmit = function handleSubmit(e) {
      e.preventDefault();
      var url = (action + '&EMAIL=' + email + '&FNAME=' + name).replace('/post?', '/post-json?');
      var regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
      !regex.test(email) ? setStatus('empty') : sendData(url);
    };
    var sendData = function sendData(url) {
      setStatus('sending');
      (0, _jsonp2.default)(url, { param: 'c' }, function (err, data) {
        if (data.msg.includes('already subscribed')) {
          setStatus('duplicate');
        } else if (err) {
          setStatus('error');
        } else if (data.result !== 'success') {
          setStatus('error');
        } else {
          setStatus('success');
        }
      });
    };
    return _react2.default.createElement(
      'form',
      { onSubmit: handleSubmit, className: className },
      _react2.default.createElement('input', {
        placeholder: namePlaceHolder,
        onChange: function onChange(e) {
          return setName(e.target.value);
        },
        defaultValue: name
      }),
      _react2.default.createElement('input', {
        placeholder: placeHolder,
        onChange: function onChange(e) {
          return setEmail(e.target.value);
        },
        defaultValue: email
      }),
      _react2.default.createElement(
        'button',
        {
          disabled: status === 'sending' || status === 'success',
          type: 'submit',
          className: buttonClassName
        },
        messages.button
      ),
      _react2.default.createElement(
        'div',
        { className: 'msg-alert' },
        status === 'sending' && _react2.default.createElement(
          'p',
          { style: styles.sendingMsg },
          messages.sending
        ),
        status === 'success' && _react2.default.createElement(
          'p',
          { style: styles.successMsg },
          messages.success
        ),
        status === 'duplicate' && _react2.default.createElement(
          'p',
          { style: styles.duplicateMsg },
          messages.duplicate
        ),
        status === 'empty' && _react2.default.createElement(
          'p',
          { style: styles.errorMsg },
          messages.empty
        ),
        status === 'error' && _react2.default.createElement(
          'p',
          { style: styles.errorMsg },
          messages.error
        )
      )
    );
  };
});