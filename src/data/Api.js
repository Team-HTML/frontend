import pref from 'superagent-prefix';
import request from 'superagent';

import {promisify} from './helpers';

const API_URL_PREFIX = 'https://rc497uwa28.execute-api.us-east-2.amazonaws.com/test';

const apiPrefix = pref(API_URL_PREFIX);

//this does not work!!!!!!
export const login = (data) =>
  promisify(request
    .post(API_URL_PREFIX + '/users')
    //.set('Access-Control-Allow-Origin', "*")
    //.set('Access-Control-Allow-Credentials', true)
    .send(data)
    .use(apiPrefix));

export const getFolderById = (folderId) => 
    promisify(request
      .get('/folders/' + folderId)
      .use(apiPrefix)
    )