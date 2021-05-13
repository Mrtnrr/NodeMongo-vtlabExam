"use strict";

var _express = _interopRequireDefault(require("express"));

var _fnapply = require("@/router/globalMiddlewares/fnapply.middlewares");

var _response = require("@/router/globalMiddlewares/response.middlewares");

var _validator = require("libs/validator/validator");

var _deliveriesApiV = _interopRequireDefault(require("./deliveries.api.v1.validations"));

var _commonDeliveries = _interopRequireDefault(require("@/services/deliveries/common.deliveries.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ------------------ imports ------------------
// ------------------ init router --------------
var router = _express["default"].Router(); // ------------------ endpoints ----------------
// CRUD requests
// deliveries


router.route('/').get(function (req, res, next) {
  return (0, _fnapply.handler)(_validator.getValidator, req, res, next, _deliveriesApiV["default"]['mainGet']);
}, function (req, res, next) {
  return (0, _response.responses)(_commonDeliveries["default"].find, req, res, next);
}).post(function (req, res, next) {
  return (0, _fnapply.handler)(_validator.validator, req, res, next, _deliveriesApiV["default"]['mainPost']);
}, function (req, res, next) {
  return (0, _response.responses)(_commonDeliveries["default"].create, req, res, next);
}); // router.route('/:id')
//   .get(
//     (req, res, next) => handler(getValidator, req, res, next, validations['getOne']),
//     (req, res, next) => responses(deliveriesCommonServices.findOne, req, res, next))

router.route('/data').get(function (req, res, next) {
  return (0, _fnapply.handler)(_validator.getValidator, req, res, next, _deliveriesApiV["default"]['mainGet']);
}, function (req, res, next) {
  return (0, _response.responses)(_commonDeliveries["default"].findByFilters, req, res, next);
}); // export

module.exports = router;