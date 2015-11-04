import { FETCH_MINI_ARTICLES } from './article.actions.js'

export function fetchMiniArticles() {
  return dispatch => {
    dispatch({type: FETCH_MINI_ARTICLES})
    //return fetch('https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672')
    //  , {
    //  headers: {
    //    'Access-Control-Allow-Origin': '*',
    //  }
    //})
    //// return fetch('https://api.github.com/users/peterkow')
    // return fetch('https://www.googleapis.com/drive/v2/files?access_token=1/fFBGRNJru1FQd44AzqT3Zg')
    //  .then(res => res.json())
     //.then (res => console.log('res', res))
    //.catch(response => {
    //  console.log('response', response)
    //  console.log('response', response.headers.get())
    //
    //})

    //Access-Control-Allow-Origin
    //makeCorsRequest()
  }
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'https://api.twitter.com/1.1/search/tweets.json?%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    debugger;
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}