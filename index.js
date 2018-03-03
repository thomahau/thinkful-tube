const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_WATCH_URI = 'https://www.youtube.com/watch?v=';
const YOUTUBE_CHANNEL_URI = 'https://www.youtube.com/channel/';

function getDataFromApi(query, callback) {
	const params = {
		part: 'snippet',
		key: 'AIzaSyDQJz_qnHkYO5zWsijpbBh_cAToSoEsU2M',
		q: query
	};
	$.getJSON(YOUTUBE_SEARCH_URL, params, callback);
}

function renderResult(result) {
	return `
		<div class="search-result">
			<div class="thumbnail">
				<a href="${YOUTUBE_WATCH_URI}${result.id.videoId}">
					<img src="${result.snippet.thumbnails.medium.url}" alt="Video thumbnail" />
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
	const results = data.items.map((item, index) => renderResult(item));
	$('.js-search-results').html(results);
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