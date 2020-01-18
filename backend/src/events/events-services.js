const bcrypt = require('bcryptjs')
const xss = require('xss')
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

const EventsServices = {
  getEvents : function (db) {
    return db
    .select('events.id', 'events_photos.img_url', 'events.title', 'events.event_description', 'events.event_date')
    .from('events')
    .join('events_photos', {'events.img_url': 'events_photos.id'})
  },
  getPhotos : function (db) {
    return db
    .select('events_photos.id', 'events_photos.img_url', 'events.title')
    .from('events_photos')
    .leftJoin('events', 'events_photos.id', 'events.img_url')
  },
  deleteEvent: function (db, id) {
    return db
    .from('events')
    .where({ id })
    .del()
  },
  deletePhoto: function (db, id) {
    return db
    .from('events_photos')
    .where({ id })
    .del()
  },
  deleteUnusedPhotos: function(db, photos) {
    const s3 = new aws.S3();
    let photosToDelete = photos.filter(photo => photo.title === null);
    
    let keys = photosToDelete.map(item => {
      return {Key: item.img_url.substring(item.img_url.lastIndexOf('/') + 1)}
    });
    let ids = photosToDelete.map(item => item.id);

    const s3Params = {
      Bucket: S3_BUCKET,
      Delete: {
        Objects: keys
      }
    }

    if (keys.length) {
       s3.deleteObjects(s3Params, function (err, data) {
        if (err) { console.log('s3 error response', err, err.stack)
        } else { console.log('s3 success data response', data) }
      })
    }
   
    
    return db
      .from('events_photos')
      .whereIn('id', ids)
      .del()
      .returning('*')
    
    
  },
  editEvent: function (db, id, obj) {
    if (obj.img_url) {
      return EventsServices.insertPhoto(db, obj.img_url)
      .then(photo_id => {
        obj.img_url = photo_id;
        return db
          .from('events')
          .where({ id })
          .update(obj)
          .returning("*")
      })
    } else {
      return db
          .from('events')
          .where({ id })
          .update(obj)
          .returning("*")
    }
  },
  insertPhotoAndEvent (db, eventObj) {
    return EventsServices.insertPhoto(db, eventObj.img_url)
            .then(id => {
              eventObj.img_url = id;
              return EventsServices.insertEvent(db, eventObj)
            })
  },
  insertEvent: function(db, eventObj) {
    return db
      .insert(eventObj)
      .into('events')
      .returning('id')
      .then(([id]) => id)
  },
  insertPhoto: function(db, img_url) {
    return db
      .insert({img_url})
      .into('events_photos')
      .returning('id')
      .then(([id]) => id)
  }

}

module.exports = EventsServices
