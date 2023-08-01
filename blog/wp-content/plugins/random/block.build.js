/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var _wp = wp,
    apiFetch = _wp.apiFetch;
var Fragment = wp.element.Fragment;
var _wp$editor = wp.editor,
    RichText = _wp$editor.RichText,
    InspectorControls = _wp$editor.InspectorControls,
    MediaUpload = _wp$editor.MediaUpload,
    BlockControls = _wp$editor.BlockControls,
    InnerBlocks = _wp$editor.InnerBlocks,
    AlignmentToolbar = _wp$editor.AlignmentToolbar,
    PanelColorSettings = _wp$editor.PanelColorSettings;
var _wp$components = wp.components,
    PanelBody = _wp$components.PanelBody,
    TextControl = _wp$components.TextControl,
    Button = _wp$components.Button,
    SelectControl = _wp$components.SelectControl,
    RangeControl = _wp$components.RangeControl,
    ToggleControl = _wp$components.ToggleControl,
    ServerSideRender = _wp$components.ServerSideRender,
    ColorPalette = _wp$components.ColorPalette;


registerBlockType("random/random-title", {
  title: __("Random Title"),
  icon: "welcome-add-page",
  category: "common",
  parent: ["random/random-col1"],
  attributes: {
    // Necessary for saving block content.
    title: {
      type: "string",
      placeholder: "Add Title Here"
    },
    marginTop: {
      type: "string",
      default: ""
    },
    marginRight: {
      type: "string",
      default: ""
    },
    marginBottom: {
      type: "string",
      default: ""
    },
    marginLeft: {
      type: "string",
      default: ""
    },
    title_alignment: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var _props$attributes = props.attributes,
        title = _props$attributes.title,
        title_color = _props$attributes.title_color,
        marginTop = _props$attributes.marginTop,
        marginRight = _props$attributes.marginRight,
        marginBottom = _props$attributes.marginBottom,
        marginLeft = _props$attributes.marginLeft,
        title_alignment = _props$attributes.title_alignment,
        setAttributes = props.setAttributes;

    var textColors = [{
      name: "Pale pink",
      slug: "pink",
      color: "rgb(247, 141, 167)"
    }, {
      name: "Vivid red",
      slug: "red",
      color: "rgb(207, 46, 46)"
    }, {
      name: "Luminous vivid orange",
      slug: "orange",
      color: "rgb(255, 105, 0)"
    }, {
      name: "Luminous vivid amber",
      slug: "amber",
      color: "rgb(252, 185, 0)"
    }, {
      name: "Light green cyan",
      slug: "cyan",
      color: "rgb(123, 220, 181)"
    }, {
      name: "Vivid green cyan",
      slug: "green-cyan",
      color: "rgb(0, 53, 132)"
    }, {
      name: "Vivid green cyan",
      slug: "green-cyan",
      color: "rgb(0, 26, 132)"
    }, {
      name: "Vivid green cyan",
      slug: "green-cyan",
      color: "rgb(0, 208, 50)"
    }];
    return [wp.element.createElement(
      InspectorControls,
      { key: "Random typr" },
      wp.element.createElement(
        PanelBody,
        { title: "Title color", initialOpen: "true" },
        wp.element.createElement(ColorPalette, {
          type: "string",
          value: title_color,
          colors: textColors,
          label: "Title color",
          onChange: function onChange(value) {
            return setAttributes({ title_color: value });
          }
        })
      ),
      wp.element.createElement(
        PanelBody,
        { title: "Title Margin", initialOpen: "true" },
        wp.element.createElement(
          "div",
          { "class": "margin-setting" },
          wp.element.createElement(
            "div",
            { className: "margin-top has-tooltip", "data-tooltip": "Margin Top" },
            wp.element.createElement(TextControl, {
              type: "number",
              value: marginTop,
              onChange: function onChange(value) {
                return setAttributes({ marginTop: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            {
              className: "margin-right has-tooltip",
              "data-tooltip": "Margin Right"
            },
            wp.element.createElement(TextControl, {
              type: "number",
              value: marginRight,
              onChange: function onChange(value) {
                return setAttributes({ marginRight: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            {
              className: "margin-buttom has-tooltip",
              "data-tooltip": "Margin Bottom"
            },
            wp.element.createElement(TextControl, {
              type: "number",
              value: marginBottom,
              onChange: function onChange(value) {
                return setAttributes({ marginBottom: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            { className: "margin-left has-tooltip", "data-tooltip": "Margin Left" },
            wp.element.createElement(TextControl, {
              type: "number",
              value: marginLeft,
              onChange: function onChange(value) {
                return setAttributes({ marginLeft: value });
              }
            })
          )
        )
      )
    ), wp.element.createElement(
      Fragment,
      null,
      wp.element.createElement(
        BlockControls,
        null,
        wp.element.createElement(AlignmentToolbar, {
          value: title_alignment,
          onChange: function onChange(value) {
            return setAttributes({ title_alignment: value });
          }
        })
      ),
      wp.element.createElement(RichText, {
        tagName: "h2",
        className: "text-medium-38 font-weight-600 color-black word-wrap margin-bottom-19",
        placeholder: __("Enter Title...", "custom-block"),
        value: title,
        onChange: function onChange(value) {
          return setAttributes({ title: value });
        },
        keepPlaceholderOnFocus: true,
        style: {
          color: title_color,
          marginTop: marginRight + "px",
          marginRight: marginRight + "px",
          marginBottom: marginBottom + "px",
          marginLeft: marginLeft + "px",
          textAlign: title_alignment
        }
      })
    )];
  },
  save: function save(props) {
    var _props$attributes2 = props.attributes,
        title = _props$attributes2.title,
        title_color = _props$attributes2.title_color,
        marginTop = _props$attributes2.marginTop,
        marginRight = _props$attributes2.marginRight,
        marginBottom = _props$attributes2.marginBottom,
        marginLeft = _props$attributes2.marginLeft,
        title_alignment = _props$attributes2.title_alignment;

    return wp.element.createElement(
      "h2",
      {
        className: "text-medium-38 font-weight-600 color-black word-wrap margin-bottom-19",
        style: {
          color: title_color,
          marginTop: marginTop + "px",
          marginRight: marginRight + "px",
          marginBottom: marginBottom + "px",
          marginLeft: marginLeft + "px",
          textAlign: title_alignment
        }
      },
      title
    );
  }
}), registerBlockType("random/random-separator", {
  title: __("Random Separator"),
  icon: "welcome-add-page",
  category: "common",
  parent: ["random/random-col1"],
  attributes: {
    separator: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var separator = props.attributes.separator,
        setAttributes = props.setAttributes;

    return [wp.element.createElement(
      InspectorControls,
      { key: "Random Separator" },
      wp.element.createElement(
        PanelBody,
        { title: "Separator setting", initialOpen: "true" },
        wp.element.createElement(SelectControl, {
          label: __("Select Separator"),
          value: separator,
          options: [{ label: __("Select Separator"), value: "" }, { label: __("Small black border"), value: "small-black-border" }],
          onChange: function onChange(value) {
            return setAttributes({ separator: value });
          }
        })
      )
    ), wp.element.createElement("hr", { className: separator })];
  },
  save: function save(props) {
    var separator = props.attributes.separator;

    return wp.element.createElement("hr", { className: separator });
  }
});

registerBlockType("random/random-description", {
  title: __("Random Description"),
  icon: "welcome-add-page",
  category: "common",
  parent: ["random/random-col1"],
  attributes: {
    description: {
      type: "string"
    },
    desalignment: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var _props$attributes3 = props.attributes,
        description = _props$attributes3.description,
        desalignment = _props$attributes3.desalignment,
        setAttributes = props.setAttributes;

    return [wp.element.createElement(RichText, {
      tagName: "p",
      className: "text-medium-38 font-weight-600 color-black word-wrap margin-bottom-19",
      placeholder: __("Enter description...", "custom-block"),
      value: description,
      onChange: function onChange(value) {
        return setAttributes({ description: value });
      },
      keepPlaceholderOnFocus: true,
      style: {
        textAlign: desalignment
      }
    })];
  },
  save: function save(props) {
    var _props$attributes4 = props.attributes,
        description = _props$attributes4.description,
        desalignment = _props$attributes4.desalignment,
        setAttributes = props.setAttributes;

    return wp.element.createElement(
      "p",
      {
        style: {
          textAlign: desalignment
        }
      },
      description
    );
  }
});

var TEMPLATE_COL = [["random/random-title", {}], ["random/random-separator", {}], ["random/random-description", {}], ["core/button", {}]];
registerBlockType("random/random-col1", {
  title: __("Random type col-1"),
  icon: "portfolio",
  category: "common",
  parent: ["random/random"],
  edit: function edit() {
    return wp.element.createElement(InnerBlocks, { className: "", template: TEMPLATE_COL });
  },
  save: function save() {
    return wp.element.createElement(InnerBlocks.Content, { template: TEMPLATE_COL });
  }
});

registerBlockType("random/random-col2-icon", {
  title: __("Random type Icon"),
  icon: "portfolio",
  category: "common",
  parent: ["random/random-icon-text-col"],
  attributes: {
    random_icon: {
      type: "string"
    },
    icon_alignment: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var _props$attributes5 = props.attributes,
        random_icon = _props$attributes5.random_icon,
        icon_alignment = _props$attributes5.icon_alignment,
        setAttributes = props.setAttributes;

    function icon_select(random) {
      if (random) {
        return wp.element.createElement("i", { className: random + " icon-style" });
      } else {
        return wp.element.createElement(
          Button,
          { className: "icon_select" },
          "Select icon"
        );
      }
    }
    return [wp.element.createElement(
      InspectorControls,
      { key: "Random Icon" },
      wp.element.createElement(
        PanelBody,
        { title: __("All Icon"), initialOpen: true },
        wp.element.createElement(SelectControl, {
          label: __("Select Icon"),
          value: random_icon,
          options: [{ label: __("Select Style"), value: "" }, { label: __("Monitor"), value: "fa fa-tv" }, { label: __("Ios"), value: "fa fa-random" }, {
            label: __("Ios color filter"),
            value: "fa fa-filter"
          }, {
            label: __("Ios-personadd"),
            value: "fa fa-user"
          }],
          onChange: function onChange(value) {
            return setAttributes({ random_icon: value });
          }
        }),
        wp.element.createElement("i", { className: random_icon + " icon-style" })
      )
    ), wp.element.createElement(
      BlockControls,
      null,
      wp.element.createElement(AlignmentToolbar, {
        value: icon_alignment,
        onChange: function onChange(value) {
          return setAttributes({ icon_alignment: value });
        }
      })
    ), wp.element.createElement(
      "div",
      {
        className: "counter-icon ionicon-big color-brilliant-pink margin-bottom-14 linear-transition",
        style: {
          textAlign: icon_alignment
        }
      },
      icon_select(random_icon)
    )];
  },
  save: function save(props) {
    var _props$attributes6 = props.attributes,
        random_icon = _props$attributes6.random_icon,
        icon_alignment = _props$attributes6.icon_alignment,
        setAttributes = props.setAttributes;

    return wp.element.createElement(
      "div",
      {
        "class": "counter-icon ionicon-big color-brilliant-pink margin-bottom-14 linear-transition",
        style: {
          textAlign: icon_alignment
        }
      },
      wp.element.createElement("i", { className: random_icon + " icon-style" })
    );
  }
});

var TEMPLATE_ICON_TEXT = [["random/random-col2-icon", {}, []], ["core/paragraph", { placeholder: "Add Title" }, []]];
registerBlockType("random/random-icon-text-col", {
  title: __("Random type Icon-text"),
  icon: "portfolio",
  category: "common",
  parent: ["random/random-col2"],
  attributes: {
    borderStyle: {
      type: "string"
    },
    borderColor: {
      type: "string"
    },
    borderRadius: {
      type: "string"
    },
    paddingTop: {
      type: "string"
    },
    paddingRight: {
      type: "string"
    },
    paddingBottom: {
      type: "string"
    },
    paddingLeft: {
      type: "string"
    }
  },
  edit: function edit(props) {
    var _props$attributes7 = props.attributes,
        borderStyle = _props$attributes7.borderStyle,
        borderRadius = _props$attributes7.borderRadius,
        borderColor = _props$attributes7.borderColor,
        paddingTop = _props$attributes7.paddingTop,
        paddingRight = _props$attributes7.paddingRight,
        paddingBottom = _props$attributes7.paddingBottom,
        paddingLeft = _props$attributes7.paddingLeft,
        setAttributes = props.setAttributes;

    return [wp.element.createElement(
      InspectorControls,
      { key: "Random Border type" },
      wp.element.createElement(
        PanelBody,
        { title: __("All Border"), initialOpen: true },
        wp.element.createElement(SelectControl, {
          label: __("Select Border"),
          value: borderStyle,
          options: [{ label: __("Select Border"), value: "none" }, { label: __("Solid"), value: "solid" }, { label: __("Dotted"), value: "dotted" }, {
            label: __("Dashed"),
            value: "dashed"
          }, {
            label: __("Double"),
            value: "double"
          }],
          onChange: function onChange(value) {
            return setAttributes({ borderStyle: value });
          }
        }),
        wp.element.createElement(
          Fragment,
          null,
          wp.element.createElement(PanelColorSettings, {
            className: "bordercolor",
            title: __("Border Color"),
            initialOpen: true,
            colorSettings: [{
              label: __("Border Color"),
              value: borderColor,
              onChange: function onChange(value) {
                return setAttributes({ borderColor: value });
              }
            }]
          }),
          wp.element.createElement(RangeControl, {
            label: __("Border radius"),
            value: borderRadius ? borderRadius : 0,
            min: 0,
            max: 100,
            onChange: function onChange(value) {
              return setAttributes({ borderRadius: value });
            }
          })
        ),
        wp.element.createElement("div", {
          className: "demo_border",
          style: {
            borderStyle: borderStyle,
            borderRadius: borderRadius,
            borderColor: borderColor
          }
        }),
        wp.element.createElement(
          "p",
          null,
          "Padding Setting (px)"
        ),
        wp.element.createElement(
          "div",
          { "class": "padding-setting" },
          wp.element.createElement(
            "div",
            { className: "padd-top has-tooltip", "data-tooltip": "Padding Top" },
            wp.element.createElement(TextControl, {
              type: "number",
              min: "1",
              value: paddingTop,
              onChange: function onChange(value) {
                return setAttributes({ paddingTop: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            {
              className: "padd-right has-tooltip",
              "data-tooltip": "Padding Right"
            },
            wp.element.createElement(TextControl, {
              type: "number",
              min: "1",
              value: paddingRight,
              onChange: function onChange(value) {
                return setAttributes({ paddingRight: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            {
              className: "padd-buttom has-tooltip",
              "data-tooltip": "Padding Bottom"
            },
            wp.element.createElement(TextControl, {
              type: "number",
              min: "1",
              value: paddingBottom,
              onChange: function onChange(value) {
                return setAttributes({ paddingBottom: value });
              }
            })
          ),
          wp.element.createElement(
            "div",
            { className: "padd-left has-tooltip", "data-tooltip": "Padding Left" },
            wp.element.createElement(TextControl, {
              type: "number",
              min: "1",
              value: paddingLeft,
              onChange: function onChange(value) {
                return setAttributes({ paddingLeft: value });
              }
            })
          )
        )
      )
    ), wp.element.createElement(
      "div",
      { "class": "col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding-left" },
      wp.element.createElement(
        "div",
        {
          className: "counter-block border-dim-gray margin-bottom-30 wow slideInRight",
          style: {
            borderStyle: borderStyle,
            borderRadius: borderRadius,
            borderColor: borderColor,
            paddingTop: paddingTop + "px",
            paddingRight: paddingRight + "px",
            paddingBottom: paddingBottom + "px",
            paddingLeft: paddingLeft + "px"
          }
        },
        wp.element.createElement(
          "div",
          { className: "inner_class_icon" },
          wp.element.createElement(InnerBlocks, { className: "", template: TEMPLATE_ICON_TEXT })
        )
      )
    )];
  },
  save: function save(props) {
    var _props$attributes8 = props.attributes,
        borderStyle = _props$attributes8.borderStyle,
        borderRadius = _props$attributes8.borderRadius,
        borderColor = _props$attributes8.borderColor,
        paddingTop = _props$attributes8.paddingTop,
        paddingRight = _props$attributes8.paddingRight,
        paddingBottom = _props$attributes8.paddingBottom,
        paddingLeft = _props$attributes8.paddingLeft,
        setAttributes = props.setAttributes;

    return wp.element.createElement(
      "div",
      { "class": "col-lg-6 col-md-6 col-sm-6 col-xs-6 no-padding-left" },
      wp.element.createElement(
        "div",
        {
          className: "counter-block border-dim-gray margin-bottom-30 wow slideInRight",
          style: {
            borderStyle: borderStyle,
            borderRadius: borderRadius,
            borderColor: borderColor,
            paddingTop: paddingTop + "px",
            paddingRight: paddingRight + "px",
            paddingBottom: paddingBottom + "px",
            paddingLeft: paddingLeft + "px"
          }
        },
        wp.element.createElement(
          "div",
          { className: "inner_class_icon" },
          wp.element.createElement(InnerBlocks.Content, { template: TEMPLATE_ICON_TEXT })
        )
      )
    );
  }
});

var TEMPLATE_COL2 = [["core/column", {}, [["core/columns", { columns: 2 }, [["core/column", {}, [["random/random-icon-text-col", {}, []]]], ["core/column", {}, [["random/random-icon-text-col", {}, []]]]]], ["core/columns", { columns: 2 }, [["core/column", {}, [["random/random-icon-text-col", {}, []]]], ["core/column", {}, [["random/random-icon-text-col", {}, []]]]]]]]];

registerBlockType("random/random-col2", {
  title: __("Random type col-2"),
  icon: "portfolio",
  category: "common",
  parent: ["random/random"],
  edit: function edit() {
    return wp.element.createElement(InnerBlocks, { className: "", template: TEMPLATE_COL2 });
  },
  save: function save() {
    return wp.element.createElement(InnerBlocks.Content, { template: TEMPLATE_COL2 });
  }
});

var TEMPLATE = [["core/columns", {}, [["core/column", {}, [["random/random-col1", {}]]], ["core/column", {}, [["random/random-col2", {}]]]]]];
registerBlockType("random/random", {
  title: __("Random type"),
  icon: "portfolio",
  category: "common",
  edit: function edit() {
    return wp.element.createElement(InnerBlocks, { className: "", template: TEMPLATE });
  },
  save: function save() {
    return wp.element.createElement(InnerBlocks.Content, { template: TEMPLATE });
  }
});

/***/ })
/******/ ]);