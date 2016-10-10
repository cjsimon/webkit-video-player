var player = videojs('video');

/**
 * @link http://www.html5rocks.com/en/tutorials/file/dndfiles/
 */
function filelistener(dom) {
	var filebrowser = document.querySelector(dom);
	filebrowser.addEventListener("change", function(evt) {
		console.log("Selected Video: " + this.value);
		loadPlayer(this.value);
	}, false);
}
filelistener('#filebrowser');

// TODO: Fix play pause listener states
this.isPlaying = false;
player.on("pause", function () {
	this.isPlaying = false;
});
player.on("play", function () {
	this.isPlaying = true;
});

function loadPlayer(videopath) {
	player.ready(function() {
		console.log("Loading Player: " + videopath);
		
		// Dynamic video loading
		// @link http://stackoverflow.com/a/16714206/2104168
		player.src([
			{type: "video/mp4", src: videopath} // + ".mp4"}
		]);
		
		player.pause();
		
		// Hotkeys
		var SPACE_KEY           = 32;
		var ENTER_KEY           = 13;
		var F_KEY               = 70;
		var FORWARD_SLASH_KEY   = 220;
		var CTRL_KEY            = 17;
		var O_KEY               = 79;
		var fullscreen = false;
		
		this.hotkeys({
			volumeStep: 0.1,
			seekStep: 7,
			enableMute: true,
			enableVolumeScroll: false,
			enableFullscreen: true,
			enableNumbers: true,
			alwaysCaptureHotkeys: true,
			enableJogStyle: false,
			
			playPauseKey: function(event, player) {
				return event.which === SPACE_KEY || (!event.altKey && event.which === ENTER_KEY);
			},
			fullscreenKey: function(event, player) {
				return event.which === F_KEY || event.altKey && event.which === ENTER_KEY;
			},
			
			// TODO: Add delays to keys to prevent them from getting stuck
			customKeys: {
				simpleKey: {
					key: function(e) {
						return (e.which === FORWARD_SLASH_KEY);
					},
					handler: function() {
						var control = document.querySelector('.vjs-control-bar');
						control.classList.toggle('fadeOut');
					}
				},
				
				simpleKey: {
					key: function(e) {
						return (CTRL_KEY && e.which === O_KEY);
					},
					handler: function() {
						console.log("Open File");
						// Pause the video while the file browser is open
						if(player.isPlaying) {
							player.pause();
						}
						var filebrowser = document.querySelector("#filebrowser");
						filebrowser.click();
					}
				}
			}
		});
		
		// Progress Tooltip
		this.progressTips();
	});
}
// TODO: Load a specified video on startup
loadPlayer("http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4");