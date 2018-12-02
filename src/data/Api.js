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

export const getFolderById = (folderId, userId) => 
    promisify(request
      .get('/folders/' + folderId)
      .set('html-user', userId)
      .use(apiPrefix)
    )

export const getTemplateById = (id, userId) => 
  promisify(request
    .get('/templates/' + id)
    .set('Html-User', userId)
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

export const getUser = (userId) => 
  promisify(request
    .get('/users/' + userId)
    .use(apiPrefix)
  )

export const verifyToken = (userId, token) =>
  promisify(request
    .get(`/users/${userId}/${token}`)
    .use(apiPrefix)  
  )

export const createFolder = (folderName, userId) => 
  promisify(request
    .post('/folders')
    .send({created_by: userId, folder_name: folderName})
    .set('html-user', userId)
    .use(apiPrefix)
  )

export const getGallery = () =>
  promisify(request
    .get('/templates/')
    .use(apiPrefix)
  )

export const appendFolder = (userId, data) =>
  promisify(request
    .patch('/users/' + userId)
    .send(data)
    .use(apiPrefix)
  )

export const deleteFolder = (userId, folderId) =>
  promisify(request
    .delete('/folders/' + folderId)
    .set('html-user', userId)
    .use(apiPrefix)
  )

export const renameFolder = (userId, folderId, newName) =>
  promisify(request
    .post('/folders/' + folderId)
    .set('Html-User', userId)
    .send({'newname': newName})
    .use(apiPrefix)
  )