"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Deliveries = _interopRequireDefault(require("@/models/Deliveries.model"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var findByFilters = function findByFilters(req) {
  var page, weigth, limit, skip, dateFrom, to, condition, deliveries;
  return regeneratorRuntime.async(function findByFilters$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          page = req.body.page ? req.body.page : 1;
          weigth = req.body.weight ? req.body.weight : 1;
          limit = req.params.limit ? req.body.limit > 100 ? 100 : parseInt(req.body.limit) : 100;
          skip = limit * page - limit; //without filters obtaining those of the current week

          dateFrom = req.body.dateFrom ? new Date(req.body.dateFrom) : (0, _moment["default"])().startOf('week').toDate();
          to = req.body.dateFrom ? new Date(req.body.to) : (0, _moment["default"])().endOf('week').toDate(); //  let count = [ {// uncomment to know detail of the paging
          //       '$lookup': {
          //         'from': 'products', 
          //         'localField': 'products', 
          //         'foreignField': '_id', 
          //         'as': 'products'
          //       }
          //     }, {
          //       '$match': {
          //         'when': {
          //           '$gte': new Date(dateFrom), 
          //           '$lte': new Date(to)
          //         }, 
          //         'products.weight': {
          //           '$gte': Number(weigth)
          //         }
          //       }
          //     }, ]
          // let totalResults = await Deliveries.aggregate(count)
          //   let pageInfo = {
          //     current: Number(page),
          //     total: totalResults.length,
          //     pages: Math.ceil(totalResults.length / limit),
          //  };

          condition = [{
            '$lookup': {
              'from': 'products',
              'localField': 'products',
              'foreignField': '_id',
              'as': 'products'
            }
          }, {
            '$match': {
              'when': {
                '$gte': new Date(dateFrom),
                '$lte': new Date(to)
              },
              'products.weight': {
                '$gte': Number(weigth)
              }
            }
          }, {
            '$skip': Number(skip)
          }, {
            '$limit': Number(limit)
          }, {
            '$sort': {
              '_id': 1
            }
          }];
          _context.next = 10;
          return regeneratorRuntime.awrap(_Deliveries["default"].aggregate(condition));

        case 10:
          deliveries = _context.sent;
          return _context.abrupt("return", {
            deliveries: deliveries,
            totalResults: deliveries.length // pageInfo //uncomment to know detail of the paging 

          });

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0, 'funcion');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var find = function find(req) {
  var query, limit, skip, sort, totalResults, deliveries;
  return regeneratorRuntime.async(function find$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // some vars
          query = {};
          limit = req.body.limit ? req.body.limit > 100 ? 100 : parseInt(req.body.limit) : 100;
          skip = req.body.page ? (Math.max(0, parseInt(req.body.page)) - 1) * limit : 0;
          sort = {
            _id: 1
          }; // if date provided, filter by date

          if (req.body.when) {
            query['when'] = {
              '$gte': req.body.when
            };
          }

          ;
          _context2.next = 8;
          return regeneratorRuntime.awrap(_Deliveries["default"].find(query).countDocuments());

        case 8:
          totalResults = _context2.sent;

          if (!(totalResults < 1)) {
            _context2.next = 11;
            break;
          }

          throw {
            code: 404,
            data: {
              message: "We couldn't find any delivery"
            }
          };

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(_Deliveries["default"].find(query).skip(skip).sort(sort).limit(limit));

        case 13:
          deliveries = _context2.sent;
          return _context2.abrupt("return", {
            totalResults: totalResults,
            deliveries: deliveries
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var create = function create(req) {
  return regeneratorRuntime.async(function create$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Deliveries["default"].create(req.body));

        case 3:
          _context3.next = 8;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          throw {
            code: 400,
            data: {
              message: "An error has occurred trying to create the delivery:\n          ".concat(JSON.stringify(_context3.t0, null, 2))
            }
          };

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var findOne = function findOne(req) {
  var delivery;
  return regeneratorRuntime.async(function findOne$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_Deliveries["default"].findOne({
            _id: req.body.id
          }));

        case 2:
          delivery = _context4.sent;

          if (delivery) {
            _context4.next = 5;
            break;
          }

          throw {
            code: 404,
            data: {
              message: "We couldn't find a delivery with the sent ID"
            }
          };

        case 5:
          return _context4.abrupt("return", delivery);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var _default = {
  find: find,
  create: create,
  findOne: findOne,
  findByFilters: findByFilters
};
exports["default"] = _default;