/*
把播放器與按鈕寫成一個物件 
只需要下面一個類別就可重複呼叫使用 
呼叫方法在最下面
*/


class YoutubeVideoAPIContainer {
	constructor(videoId, width, height, playerId, containerId) {
		this.videoId = videoId;
		this.width = width;
		this.height = height;
		this.playerId = playerId;
		this.containerId = containerId;
		this.player = null;
	}

	init() {
		this.player = new YT.Player(this.playerId, {
			height: this.height,
			width: this.width,
			videoId: this.videoId,
			events: {
				onReady: this.onPlayerReady.bind(this),
				onStateChange: this.onPlayerStateChange.bind(this),
			},
		});
	}

	onPlayerReady(event) {
		// event.target.playVideo();
		var $this = this
		document.querySelector(`#${this.containerId}`).addEventListener("click", function () {
			document.querySelector(`#${$this.containerId} .vdo-poster`).style.visibility = "hidden";
			$this.player.playVideo();
		});
	}

	onPlayerStateChange(event) {
		var $this = this
		if (event.data == YT.PlayerState.ENDED) {
			$this.player.stopVideo();
			document.querySelector(`#${$this.containerId} .vdo-poster`).style.visibility = "visible";
		}
	}
}


/**

重複呼叫到html容器中 所以html要先放置可對應的容易 
css樣式也只需要寫一份通用就可以

主要對應 容器id & playerId
使用方法：只需要兩行 先定義 後 使用init啟動
const 播放區名稱 = new YoutubeVideoAPIContainer(yt影片id, 寬, 高,playerId,外層容器Id);
播放區名稱.init(); 

重新整理網頁就可以看到
*/

function onYouTubeIframeAPIReady() {
	const youtubeVideoAPIContainer = new YoutubeVideoAPIContainer('aUZLGPhq_uw', 560, 315, 'player', 'vdo-cover1');
	youtubeVideoAPIContainer.init();

	const youtubeVideoAPIContainer2 = new YoutubeVideoAPIContainer('9CYaa-wh1k8', 560, 315, 'player2', 'vdo-cover2');
	youtubeVideoAPIContainer2.init();

	const youtubeVideoAPIContainer3 = new YoutubeVideoAPIContainer('bqut12fzzOs', 560, 315, 'player3', 'vdo-cover3');
	youtubeVideoAPIContainer3.init();
}
