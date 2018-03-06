const API_KEY = 'AIzaSyDQJz_qnHkYO5zWsijpbBh_cAToSoEsU2M';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_WATCH_URI = 'https://www.youtube.com/watch?v=';
const YOUTUBE_CHANNEL_URI = 'https://www.youtube.com/channel/';

function getDataFromApi(query, callback) {
	const params = {
		part: 'snippet',
		key: API_KEY,
		q: query
	};
	$.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function renderResult(result) {
	return `
		<div class="search-result">
			<div class="thumbnail">
				<a href="${YOUTUBE_WATCH_URI}${result.id.videoId}" target="_blank" rel="noopener noreferrer">
					<img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title} video thumbnail" />
				</a>
			</div>
			<div class="video-info">
				<h3><a href="${YOUTUBE_WATCH_URI}${result.id.videoId}">${result.snippet.title}</a></h3>
				<p>Uploaded by <a href="${YOUTUBE_CHANNEL_URI}${result.snippet.channelId}">${result.snippet.channelTitle}</a></p>
			</div>
		</div>
	`;
}

function displayYouTubeSearchData(data) {
	const resultCount = data.pageInfo.totalResults;
	const results = data.items.map((item, index) => renderResult(item));

	$('.js-results-count')
		.prop('hidden', false)
		.html(`About ${resultCount} results`);

	$('.js-search-results').empty();
	$('.js-search-results')
		.prop('hidden', false)
		.html(results);
}

function watchSubmit() {
	$('.js-search-form').submit(function(event) {
		event.preventDefault();
		const queryTarget = $(this).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val('');
		getDataFromApi(query, displayYouTubeSearchData);
	});
}

$(watchSubmit);