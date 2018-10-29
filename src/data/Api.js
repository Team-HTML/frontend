import pref from 'superagent-prefix';
import request from 'superagent';

import {promisify} from './helpers';

const API_URL_PREFIX = 'https://at9ztwzw95.execute-api.us-east-2.amazonaws.com/test/';

const apiPrefix = pref(API_URL_PREFIX);

//this does not work!!!!!!
export const login = (data) =>
  promisify(request
    .post(API_URL_PREFIX + 'login')
    //.set('Access-Control-Allow-Origin', "*")
    //.set('Access-Control-Allow-Credentials', true)
    .send(data)
    .use(apiPrefix));

export const getFolderById = (folderId) => 
    promisify(request
      .get('/folder/' + folderId)
      .use(apiPrefix)
    )