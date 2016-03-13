/**
 * Created by Peter on 18/04/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    id           : {type: Number, required: true},
    id_str       : {type: String, required: true},
    creationDate : {type: Date, default: Date.now},
    updateDate   : {type: Date, default: Date.now},
    text         : String,
    user         : Array,
    source: String,
    truncated: Boolean,
    in_reply_to_status_id: Number,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: Number,
    in_reply_to_user_id_str: String,
    in_reply_to_screen_name: String,
    geo: Schema.Types.Mixed,
    coordinates: Schema.Types.Mixed,
    place: Schema.Types.Mixed,
    contributors: Schema.Types.Mixed,
    is_quote_status: Boolean,
    retweet_count: Number,
    favorite_count: Number,
    entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
    favorited: Boolean,
    retweeted: Boolean,
    lang: String

});

//tweetSchema.path('twitter.displayName').required(true, 'Display name is required');
tweetSchema.path('id').required(true, 'Twitter id is required');
tweetSchema.path('id_str').required(true, 'Twitter id_str is required');

module.exports = mongoose.model('Tweet', tweetSchema);

