const express = require('express')
const eventsRouter = express.Router();
const jsonBodyParser = express.json();
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
const { requireAuth } = require('../middleware/auth-middleware');
const EventsServices = require('./events-services');

eventsRouter
  .post('/new-event', jsonBodyParser, requireAuth, (req, res) => {
    let obj = req.body;
    EventsServices.insertPhotoAndEvent(req.app.get('db'), obj)
    .then( event => {
          res
          .status(200)
          .json({success: true, event})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false})
    })
  })
  .delete('/delete-event', jsonBodyParser, requireAuth, (req, res) => {
    let id = req.body.id;
    EventsServices.deleteEvent(req.app.get('db'), id)
    .then( event => {
      res
      .status(200)
      .json({success: true, event})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false, error})
    })
  })
  .patch('/edit-event', jsonBodyParser, requireAuth, (req, res) => {

    // MAKE SURE THAT IF NEW IMG_URL IS LISTED YOU UPDATE THE MIDCOAST_IMAGE FILE AND THE CURRENT RECORDS IDc
    let obj = req.body.obj;
    let id = req.body.id;
    EventsServices.editEvent(req.app.get('db'), id, obj)
    .then( event => {
      // console.log(event);
      res
      .status(200)
      .json({success: true, event})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false, error})
    })
  })
  .get('/photos', requireAuth, (req, res) => {
    let obj = req.body;
    let db = req.app.get('db');
    EventsServices.getPhotos(db)
    .then( photos => {

      //housekeeping: delete photos that aren't being used from s3 and db
      EventsServices.deleteUnusedPhotos(db, photos)
      res
      .status(200)
      .json({success: true})
      // res
      // .status(200)
      // .json({photos: photos.filter(photo => photo.title !== null)})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false})
    })
  })
  .get('/events', (req, res) => {
    EventsServices.getEvents(req.app.get('db'))
    .then( events => {

      let obj = {};
      events.forEach(event => {
        if(!obj[event.id]) {
          obj[event.id] = event
        }
      })
      res
      .status(200)
      .json({events: obj})
    })
    .catch( error => {
      console.error(error)
      res
      .status(500)
      .json({success: false})
    })
  })
  .delete('/delete-photo', jsonBodyParser, requireAuth, (req, res) => {
    const s3 = new aws.S3();
    let url = req.body.url;
    let key =  url.substring(url.lastIndexOf('/') + 1)
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: key,
    }
    s3.deleteObject(s3Params, (err, data) => {
      if (err) {
        console.error(err, err.stack)
        res
        .status(500)
        .json({success: 'error with aws'})
      } else {
        EventsServices.deletePhoto(req.app.get('db'), req.body.id)
        .then( result => {
          res
          .status(204)
          .json({success: true})
        })
      }
    })
  })
  .get('/sign-s3', requireAuth, (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
   
    
  })

  
module.exports = eventsRouter;