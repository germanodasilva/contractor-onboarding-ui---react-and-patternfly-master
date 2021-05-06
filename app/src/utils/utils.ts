import filter from 'lodash/filter';
import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

export const parseDate = (startedAt: string) => {
  return moment(startedAt, 'YYYY-MM-DD').format('DD/MM/YYYY');
};

// params:
// collection: array of arrays with key / value ojects
// field - key value to filter on
// value - value to filter by
export const doFilterByFieldAndValue = (collection, field, value) => {
  if (isEmpty(collection)) {
    return [];
  }
  if (isUndefined(field) || isNull(field) || isUndefined(value) || isNull(value)) {
    return collection;
  } else {
    return filter(collection, item => {
      // cases collection has a .key
      return item.key
        ? includes(item.key[field].toLowerCase(), value.toLowerCase())
        : includes(item[field].toLowerCase(), value.toLowerCase());
    });
  }
};

export const doFilterByStatus = (collection, field, value) => {
  if (isEmpty(collection)) {
    return [];
  }
  if (isUndefined(field) || isNull(field) || isUndefined(value) || isNull(value)) {
    return collection;
  } else {
    return filter(collection, item => {
      // cases collection has a .key
      return item.key
        ? includes(item.key[field] + '', value + '')
        : includes(item[field].toLowerCase(), value.toLowerCase());
    });
  }
};
