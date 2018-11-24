import pref from 'superagent-prefix';
import request from 'superagent';

import {promisify, s3Promisify} from './helpers';

const API_URL_PREFIX = 'https://rc497uwa28.execute-api.us-east-2.amazonaws.com/test';
const S3_URL_PREFIX = 'http://cse110.html.image.s3.amazonaws.com'

const apiPrefix = pref(API_URL_PREFIX);
const s3Prefix = pref(S3_URL_PREFIX);

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

export const getTemplateById = (id) => 
  promisify(request
    .get('/templates/' + id)
    .use(apiPrefix)
  )

export const uploadImgToS3 = (img, epoch) => 
  s3Promisify(request
    .put('/' + epoch + `.${img.type.split('/')[1]}`)
    .set('Content-Type', 'multipart/form-data')
    .set('x-amz-acl', 'bucket-owner-full-control')
    .send(img)
    .use(s3Prefix)
  )

export const getJSONFromImg = (s3Key) =>
  promisify(request
    .post('/img')
    .send({s3Key})
    .use(apiPrefix)
  )

export const generateHTML = (json) => 
  promisify(request
    .post('/generate')
    .send(json)
    .use(apiPrefix)
  )

export const createTemplate = (data) => {
  return promisify(request
    .post('/templates')
    .send(data)
    .use(apiPrefix)
  )
}