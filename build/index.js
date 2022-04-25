(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/hyperapp/index.js
  var SSR_NODE, TEXT_NODE, EMPTY_OBJ, EMPTY_ARR, SVG_NS, id, map, isArray, enqueue, createClass, shouldRestart, patchSubs, getKey, patchProperty, createNode, patch, propsChanged, maybeVNode, recycleNode, createVNode, text, h, app;
  var init_hyperapp = __esm({
    "node_modules/hyperapp/index.js"() {
      SSR_NODE = 1;
      TEXT_NODE = 3;
      EMPTY_OBJ = {};
      EMPTY_ARR = [];
      SVG_NS = "http://www.w3.org/2000/svg";
      id = (a2) => a2;
      map = EMPTY_ARR.map;
      isArray = Array.isArray;
      enqueue = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
      createClass = (obj) => {
        var out = "";
        if (typeof obj === "string")
          return obj;
        if (isArray(obj)) {
          for (var k = 0, tmp; k < obj.length; k++) {
            if (tmp = createClass(obj[k])) {
              out += (out && " ") + tmp;
            }
          }
        } else {
          for (var k in obj) {
            if (obj[k])
              out += (out && " ") + k;
          }
        }
        return out;
      };
      shouldRestart = (a2, b2) => {
        for (var k in { ...a2, ...b2 }) {
          if (typeof (isArray(a2[k]) ? a2[k][0] : a2[k]) === "function") {
            b2[k] = a2[k];
          } else if (a2[k] !== b2[k])
            return true;
        }
      };
      patchSubs = (oldSubs, newSubs = EMPTY_ARR, dispatch) => {
        for (var subs = [], i2 = 0, oldSub, newSub; i2 < oldSubs.length || i2 < newSubs.length; i2++) {
          oldSub = oldSubs[i2];
          newSub = newSubs[i2];
          subs.push(newSub && newSub !== true ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [
            newSub[0],
            newSub[1],
            (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1]))
          ] : oldSub : oldSub && oldSub[2]());
        }
        return subs;
      };
      getKey = (vdom) => vdom == null ? vdom : vdom.key;
      patchProperty = (node, key, oldValue, newValue, listener, isSvg) => {
        if (key === "style") {
          for (var k in { ...oldValue, ...newValue }) {
            oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
            if (k[0] === "-") {
              node[key].setProperty(k, oldValue);
            } else {
              node[key][k] = oldValue;
            }
          }
        } else if (key[0] === "o" && key[1] === "n") {
          if (!((node.events || (node.events = {}))[key = key.slice(2)] = newValue)) {
            node.removeEventListener(key, listener);
          } else if (!oldValue) {
            node.addEventListener(key, listener);
          }
        } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
          node[key] = newValue == null ? "" : newValue;
        } else if (newValue == null || newValue === false) {
          node.removeAttribute(key);
        } else {
          node.setAttribute(key, newValue);
        }
      };
      createNode = (vdom, listener, isSvg) => {
        var props = vdom.props;
        var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, props.is && props) : document.createElement(vdom.tag, props.is && props);
        for (var k in props) {
          patchProperty(node, k, null, props[k], listener, isSvg);
        }
        for (var i2 = 0; i2 < vdom.children.length; i2++) {
          node.appendChild(createNode(vdom.children[i2] = maybeVNode(vdom.children[i2]), listener, isSvg));
        }
        return vdom.node = node;
      };
      patch = (parent, node, oldVNode, newVNode, listener, isSvg) => {
        if (oldVNode === newVNode) {
        } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
          if (oldVNode.tag !== newVNode.tag)
            node.nodeValue = newVNode.tag;
        } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
          node = parent.insertBefore(createNode(newVNode = maybeVNode(newVNode), listener, isSvg), node);
          if (oldVNode != null) {
            parent.removeChild(oldVNode.node);
          }
        } else {
          var tmpVKid;
          var oldVKid;
          var oldKey;
          var newKey;
          var oldProps = oldVNode.props;
          var newProps = newVNode.props;
          var oldVKids = oldVNode.children;
          var newVKids = newVNode.children;
          var oldHead = 0;
          var newHead = 0;
          var oldTail = oldVKids.length - 1;
          var newTail = newVKids.length - 1;
          isSvg = isSvg || newVNode.tag === "svg";
          for (var i2 in { ...oldProps, ...newProps }) {
            if ((i2 === "value" || i2 === "selected" || i2 === "checked" ? node[i2] : oldProps[i2]) !== newProps[i2]) {
              patchProperty(node, i2, oldProps[i2], newProps[i2], listener, isSvg);
            }
          }
          while (newHead <= newTail && oldHead <= oldTail) {
            if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
              break;
            }
            patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = maybeVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
          }
          while (newHead <= newTail && oldHead <= oldTail) {
            if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
              break;
            }
            patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = maybeVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
          }
          if (oldHead > oldTail) {
            while (newHead <= newTail) {
              node.insertBefore(createNode(newVKids[newHead] = maybeVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
            }
          } else if (newHead > newTail) {
            while (oldHead <= oldTail) {
              node.removeChild(oldVKids[oldHead++].node);
            }
          } else {
            for (var keyed = {}, newKeyed = {}, i2 = oldHead; i2 <= oldTail; i2++) {
              if ((oldKey = oldVKids[i2].key) != null) {
                keyed[oldKey] = oldVKids[i2];
              }
            }
            while (newHead <= newTail) {
              oldKey = getKey(oldVKid = oldVKids[oldHead]);
              newKey = getKey(newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid));
              if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
                if (oldKey == null) {
                  node.removeChild(oldVKid.node);
                }
                oldHead++;
                continue;
              }
              if (newKey == null || oldVNode.type === SSR_NODE) {
                if (oldKey == null) {
                  patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
                  newHead++;
                }
                oldHead++;
              } else {
                if (oldKey === newKey) {
                  patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
                  newKeyed[newKey] = true;
                  oldHead++;
                } else {
                  if ((tmpVKid = keyed[newKey]) != null) {
                    patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                    newKeyed[newKey] = true;
                  } else {
                    patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
                  }
                }
                newHead++;
              }
            }
            while (oldHead <= oldTail) {
              if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
                node.removeChild(oldVKid.node);
              }
            }
            for (var i2 in keyed) {
              if (newKeyed[i2] == null) {
                node.removeChild(keyed[i2].node);
              }
            }
          }
        }
        return newVNode.node = node;
      };
      propsChanged = (a2, b2) => {
        for (var k in a2)
          if (a2[k] !== b2[k])
            return true;
        for (var k in b2)
          if (a2[k] !== b2[k])
            return true;
      };
      maybeVNode = (newVNode, oldVNode) => newVNode !== true && newVNode !== false && newVNode ? typeof newVNode.tag === "function" ? ((!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.memo)) && ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo), oldVNode) : newVNode : text("");
      recycleNode = (node) => node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node);
      createVNode = (tag2, { key, ...props }, children, type, node) => ({
        tag: tag2,
        props,
        key,
        children,
        type,
        node
      });
      text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
      h = (tag2, { class: c, ...props }, children = EMPTY_ARR) => createVNode(tag2, { ...props, ...c ? { class: createClass(c) } : EMPTY_OBJ }, isArray(children) ? children : [children]);
      app = ({
        node,
        view,
        subscriptions,
        dispatch = id,
        init = EMPTY_OBJ
      }) => {
        var vdom = node && recycleNode(node);
        var subs = [];
        var state;
        var busy;
        var update = (newState) => {
          if (state !== newState) {
            if ((state = newState) == null)
              dispatch = subscriptions = render = id;
            if (subscriptions)
              subs = patchSubs(subs, subscriptions(state), dispatch);
            if (view && !busy)
              enqueue(render, busy = true);
          }
        };
        var render = () => node = patch(node.parentNode, node, vdom, vdom = view(state), listener, busy = false);
        var listener = function(event) {
          dispatch(this.events[event.type], event);
        };
        return (dispatch = dispatch((action, props) => typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], action[1]) : action.slice(1).map((fx) => fx && fx !== true && (fx[0] || fx)(dispatch, fx[1]), update(action[0])) : update(action)))(init), dispatch;
      };
    }
  });

  // node_modules/@hyperapp/html/index.js
  var EMPTY_ARR2, EMPTY_OBJ2, tag, a, b, i, p, q, s, br, dd, dl, dt, em, h1, h2, h3, h4, h5, h6, hr, li, ol, rp, rt, td, th, tr, ul, bdi, bdo, col, del, dfn, div, img, ins, kbd, map2, nav, pre, rtc, sub, sup, wbr, abbr, area, cite, code, data, form, main, mark, ruby, samp, span, time, aside, audio, input, label, meter, param, small, table, tbody, tfoot, thead, track, video, button, canvas, dialog, figure, footer, header, iframe, legend, object, option, output, select, source, strong, address, article, caption, details, section, summary, picture, colgroup, datalist, fieldset, menuitem, optgroup, progress, textarea, blockquote, figcaption;
  var init_html = __esm({
    "node_modules/@hyperapp/html/index.js"() {
      init_hyperapp();
      init_hyperapp();
      EMPTY_ARR2 = [];
      EMPTY_OBJ2 = {};
      tag = (tag2) => (props = EMPTY_OBJ2, children = props.tag != null || Array.isArray(props) ? props : EMPTY_ARR2) => h(tag2, props === children ? EMPTY_OBJ2 : props, children);
      a = tag("a");
      b = tag("b");
      i = tag("i");
      p = tag("p");
      q = tag("q");
      s = tag("s");
      br = tag("br");
      dd = tag("dd");
      dl = tag("dl");
      dt = tag("dt");
      em = tag("em");
      h1 = tag("h1");
      h2 = tag("h2");
      h3 = tag("h3");
      h4 = tag("h4");
      h5 = tag("h5");
      h6 = tag("h6");
      hr = tag("hr");
      li = tag("li");
      ol = tag("ol");
      rp = tag("rp");
      rt = tag("rt");
      td = tag("td");
      th = tag("th");
      tr = tag("tr");
      ul = tag("ul");
      bdi = tag("bdi");
      bdo = tag("bdo");
      col = tag("col");
      del = tag("del");
      dfn = tag("dfn");
      div = tag("div");
      img = tag("img");
      ins = tag("ins");
      kbd = tag("kbd");
      map2 = tag("map");
      nav = tag("nav");
      pre = tag("pre");
      rtc = tag("rtc");
      sub = tag("sub");
      sup = tag("sup");
      wbr = tag("wbr");
      abbr = tag("abbr");
      area = tag("area");
      cite = tag("cite");
      code = tag("code");
      data = tag("data");
      form = tag("form");
      main = tag("main");
      mark = tag("mark");
      ruby = tag("ruby");
      samp = tag("samp");
      span = tag("span");
      time = tag("time");
      aside = tag("aside");
      audio = tag("audio");
      input = tag("input");
      label = tag("label");
      meter = tag("meter");
      param = tag("param");
      small = tag("small");
      table = tag("table");
      tbody = tag("tbody");
      tfoot = tag("tfoot");
      thead = tag("thead");
      track = tag("track");
      video = tag("video");
      button = tag("button");
      canvas = tag("canvas");
      dialog = tag("dialog");
      figure = tag("figure");
      footer = tag("footer");
      header = tag("header");
      iframe = tag("iframe");
      legend = tag("legend");
      object = tag("object");
      option = tag("option");
      output = tag("output");
      select = tag("select");
      source = tag("source");
      strong = tag("strong");
      address = tag("address");
      article = tag("article");
      caption = tag("caption");
      details = tag("details");
      section = tag("section");
      summary = tag("summary");
      picture = tag("picture");
      colgroup = tag("colgroup");
      datalist = tag("datalist");
      fieldset = tag("fieldset");
      menuitem = tag("menuitem");
      optgroup = tag("optgroup");
      progress = tag("progress");
      textarea = tag("textarea");
      blockquote = tag("blockquote");
      figcaption = tag("figcaption");
    }
  });

  // src/index.js
  var require_src = __commonJS({
    "src/index.js"(exports) {
      init_html();
      init_hyperapp();
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s2, i2 = 1, n = arguments.length; i2 < n; i2++) {
            s2 = arguments[i2];
            for (var p2 in s2)
              if (Object.prototype.hasOwnProperty.call(s2, p2))
                t[p2] = s2[p2];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      function fillName(state, event) {
        if (event.target instanceof HTMLInputElement) {
          return __assign(__assign({}, state), { name: event.target.value });
        } else {
          return state;
        }
      }
      function fillAge(state, event) {
        if (event.target instanceof HTMLInputElement) {
          return __assign(__assign({}, state), { age: event.target.value });
        } else {
          return state;
        }
      }
      function view(state) {
        return form({}, [
          label({}, [
            text("Name"),
            input({ type: "text", value: state.name, onchange: fillName }, [])
          ]),
          label({}, [
            text("Age"),
            input({ type: "text", value: state.age, onchange: fillAge }, [])
          ]),
          div({}, [
            p({}, [text("Name: ".concat(state.name))]),
            p({}, [text("Age: ".concat(state.age))])
          ])
        ]);
      }
      var initialState = {
        name: "",
        age: ""
      };
      function initialize(node) {
        app({
          init: initialState,
          view,
          node
        });
      }
      window.addEventListener("DOMContentLoaded", function(event) {
        var root = document.getElementById("root");
        if (root) {
          initialize(root);
        } else {
          throw Error("Failed to find root element.");
        }
      });
    }
  });
  require_src();
})();
