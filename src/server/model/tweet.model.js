/**
 * Created by Peter on 18/04/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  twitter          : {
    id           : {type: Number, required: true},
    id_str       : {type: String, required: true},
    creationDate : {type: Date, default: Date.now},
    updateDate   : {type: Date, default: Date.now},
    text         : String,
    completed    : Boolean,
    profileImage : String,
    favoriteCount: Number,
    retweetCount : Number,
    //image: getMedia( data.entities.media),
    //entities: data.entities,
    //quotedStatus: data.quoted_status,
    //quoted_status_id: data.quoted_status_id,
    //quoted_status_id_str: data.quoted_status_id_str,
    //user: data.user,
    //contributors: data.contributors,
    //coordinates: data.coordinates,
    //created_at: data.created_at,
    //geo: data.geo,
    //in_reply_to_screen_name: data.in_reply_to_screen_name,
    //in_reply_to_status_id: data.in_reply_to_status_id,
    //in_reply_to_status_id_str: data.in_reply_to_status_id_str,
    //in_reply_to_user_id: data.in_reply_to_user_id,
    //in_reply_to_user_id_str: data.in_reply_to_user_id_str,
    //is_quote_status: data.is_quote_status,
    //lang: data.lang,
    //metadata: data.metadata,
    //place: data.place,
    //possibly_sensitive: data.possibly_sensitive,
    //truncated: data.truncated,
    //source: data.source,
  }
});

//tweetSchema.path('twitter.displayName').required(true, 'Display name is required');
tweetSchema.path('twitter.id').required(true, 'Twitter id is required');

module.exports = mongoose.model('Tweet', tweetSchema);