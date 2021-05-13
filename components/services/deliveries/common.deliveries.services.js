import Deliveries from '@/models/Deliveries.model';
import moment from 'moment';

const findByFilters  = async (req) => {

  try {
  let page = req.body.page ? req.body.page : 1;
  let weigth = req.body.weight ? req.body.weight : 1
  let limit = req.params.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = (limit * page) - limit;

  //without filters obtaining those of the current week
  let dateFrom = req.body.dateFrom ? new Date(req.body.dateFrom) :  moment().startOf('week').toDate()
  let to = req.body.dateFrom ? new Date(req.body.to) :  moment().endOf('week').toDate()
  //  let count = [ {// uncomment to know detail of the paging
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
 
  let condition =  [
      {
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
      }, 
      {
        '$skip': Number(skip)
      },
      {
        '$limit': Number(limit)
      }, 
      {
        '$sort': {
          '_id': 1
        }
      },
  ]
  let deliveries = await Deliveries.aggregate(condition)
 
  

return {

    deliveries,
    totalResults: deliveries.length,
    // pageInfo //uncomment to know detail of the paging 
  }

  } catch (error) {
    console.log(error,'funcion');
  }
}

const find = async (req) => {
  // some vars
  let query = {};
  let limit = req.body.limit ? (req.body.limit > 100 ? 100 : parseInt(req.body.limit)) : 100;
  let skip = req.body.page ? ((Math.max(0, parseInt(req.body.page)) - 1) * limit) : 0;
  let sort = { _id: 1 }

  // if date provided, filter by date
  if (req.body.when) {
    query['when'] = {
      '$gte': req.body.when
    }
  };

  let totalResults = await Deliveries.find(query).countDocuments();

  if (totalResults < 1) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find any delivery`
      }
    }
  }

  let deliveries = await Deliveries.find(query).skip(skip).sort(sort).limit(limit);

  return {
    totalResults: totalResults,
    deliveries
  }
}

const create = async (req) => {
  try {
    await Deliveries.create(req.body);
  } catch (e) {
    throw {
      code: 400,
      data: {
        message: `An error has occurred trying to create the delivery:
          ${JSON.stringify(e, null, 2)}`
      }
    }
  }
}

const findOne = async (req) => {
  let delivery = await Deliveries.findOne({_id: req.body.id});
  if (!delivery) {
    throw {
      code: 404,
      data: {
        message: `We couldn't find a delivery with the sent ID`
      }
    }
  }
  return delivery;
}

export default {
  find,
  create,
  findOne,
  findByFilters,
}
