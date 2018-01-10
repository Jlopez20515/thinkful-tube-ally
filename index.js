const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = 'AIzaSyCx_K8zG5A_mkIatb3nBMPCz6-r1DPm4_k';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function displayResult(result) {
  console.log('displayResult', result);
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
      </h2>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
  `;
}

function displayYoutubeSearchResults(data) {
  const searchResults = data.items.map((item, index) => displayResult(item));
  console.log('displayYoutubeSearchResults', searchResults);
  $('.js-search-results').html(searchResults);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let searchTerm = $('.js-query').val();
    getDataFromApi(searchTerm, displayYoutubeSearchResults);
  });
}

$(watchSubmit);
