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

export const createTemplate = (data, userId) => {
  return promisify(request
    .post('/templates')
    .send(data)
    .set('Html-User', userId)
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

export const addTemplateToFolder = (userId, folderId, templateId) =>
  promisify(request
    .put('/folders/' + folderId)
    .set('html-user', userId)
    .send({'newtemplate': templateId})
    .use(apiPrefix)
  )

export const getHTMLFromS3 = (s3URL) =>
    s3Promisify(request
      .get(s3URL)
      .set('Access-Control-Allow-Origin', "localhost:3000")
      .set('crossorigin', "anonymous")
      .set('Content-Type', 'text/html')

    )

export const getCSSFromS3 = (s3URL) =>
    s3Promisify(request
      .get(s3URL)
      .set('Access-Control-Allow-Origin', "localhost:3000")
      .set('crossorigin', "anonymous")
      .set('Content-Type', 'text/css')
    )

export const setTemplatePublic = (userId, templateId, toValue) =>
      promisify(request
        .patch('/templates/' + templateId)
        .set('Html-User', userId)
        .send({'is_public': toValue})
        .use(apiPrefix)
      )

export const renameTemplate = (userId, templateId, newName) =>
    promisify(request
      .post('/templates/' + templateId)
      .send({'newname': newName})
      .set('Html-User', userId)
      .use(apiPrefix)
    )

export const deleteTemplate = (userId, templateId, folderId) => 
      promisify(request
        .patch('/folders/' + folderId)
        .send({'is_delete': true, 'template_id': templateId, 'new_folder_id': 0})
        .set('html-user', userId)
        .use(apiPrefix)
      )

export const moveTemplate = (userId, templateId, oldFolderId, newFolderId) => 
    promisify(request
      .patch('/folders/' + oldFolderId)
      .send({'is_delete': false, 'template_id': templateId, 'new_folder_id': newFolderId})
      .set('html-user', userId)
      .use(apiPrefix)
    )

export const getUsersFolders = (userId) =>
    promisify(request
      .get('/folders')
      .set('html-user', userId)
      .use(apiPrefix)  
    )

export const uploadHTMLToS3 = (newVal, htmlFile) => 
  s3Promisify(request
    .put(htmlFile)
    .set('Content-Type', 'text/html')
    .set('x-amz-acl', 'bucket-owner-full-control')
    .send(newVal)
  )

export const uploadCSSToS3 = (newVal, cssFile) => 
  s3Promisify(request
    .put(cssFile)
    .set('Content-Type', 'text/css')
    .set('x-amz-acl', 'bucket-owner-full-control')
    .send(newVal)
  )