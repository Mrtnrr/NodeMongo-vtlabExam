"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// imports
// export
var _default = {
  'mainGet': _joi["default"].object({
    "when": _joi["default"].string().isoDate().optional(),
    "page": _joi["default"].number().optional(),
    "limit": _joi["default"].number().optional(),
    //new
    "weight": _joi["default"].number(),
    "dateFrom": _joi["default"].string().isoDate().optional(),
    "to": _joi["default"].string().isoDate().optional()
  }),
  'mainPost': _joi["default"].object({
    "when": _joi["default"].string().isoDate().required(),
    "origin": _joi["default"].object({
      "street": _joi["default"].string().max(150).required().trim(),
      "number": _joi["default"].string().max(10).required().trim(),
      "city": _joi["default"].string().max(50).required().trim(),
      "postalCode": _joi["default"].string().max(10).required().trim()
    }).required(),
    "destination": _joi["default"].object({
      "street": _joi["default"].string().max(150).required().trim(),
      "number": _joi["default"].string().max(10).required().trim(),
      "city": _joi["default"].string().max(50).required().trim(),
      "postalCode": _joi["default"].string().max(10).required().trim()
    }).required(),
    "products": _joi["default"].array().items(_joi["default"].string().alphanum().min(24).max(24).required().trim()).min(1).required()
  }),
  'getOne': _joi["default"].object({
    "id": _joi["default"].string().alphanum().min(24).max(24)
  }) //  'getOn': Joi.object({
  //   "id": Joi.string().alphanum().min(24).max(24),
  // }),

};
exports["default"] = _default;