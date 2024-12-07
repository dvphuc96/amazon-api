import _ from 'lodash';

export class BaseService {
  formatOrderOption(order) {
    if (_.isEmpty(order)) return order;

    return _.isArray(order)
      ? order.map((v) => ({ [v.target]: v.direction }))
      : [order];
  }
}
