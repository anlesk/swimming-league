import fetch from 'fetch';

class BaseService {
  getObject = (url, params) => fetch
    .get({ url, params });
}

export default BaseService;
