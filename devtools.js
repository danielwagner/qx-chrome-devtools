var createSidebar = function(sidebar) {
  var getQxProperties = function() {
    var getDecoratorCss = function(decorator) {
      var css = [];
      var selector = ".qx-" + decorator;
      [].forEach.call(document.styleSheets, function(sheet) {
        [].forEach.call(sheet.rules, function(rule) {
          if (rule.selectorText && rule.selectorText.indexOf(selector) == 0) {
            css.push(rule.cssText);
          }
        });
      });
      return css.join("\n");
    };

    var widget;
    var isMobile = false;
    try {
      widget = qx.ui.core.Widget.getWidgetByElement($0);
    } catch(ex) {}

    if (!widget) {
      try {
        widget = qx.ui.mobile.core.Widget.getWidgetById($0.id);
        isMobile = true;
      } catch(ex) {}
    }

    if (!widget) {
      return null;
    }

    $w = widget;

    var layoutParent = widget.getLayoutParent();
    if (layoutParent) {
      layoutParent = layoutParent.toString();
    }

    var data = {
      classname: widget.classname,
      hash: widget.toHashCode(),
      layoutParent: layoutParent,
    };

    if (!isMobile) {
      data.appearance = widget.getAppearance();
      data.decorator = widget.getDecorator();
    }

    var css = data.decorator ? getDecoratorCss(data.decorator) : null;
    if (css) {
      data.decoratorCss = css;
    }

    return data;
  };

  function updateElementProperties() {
    sidebar.setExpression("(" + getQxProperties.toString() + ")()");
  }

  chrome.devtools.panels.elements.onSelectionChanged.addListener(
    updateElementProperties);
};

chrome.devtools.panels.elements.createSidebarPane("qx Widget", createSidebar);
