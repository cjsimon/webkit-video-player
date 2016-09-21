/**
 * @link http://www.html5rocks.com/en/tutorials/file/dndfiles/
 */
var player = videojs('video');

function filelistener(dom) {
	var filebrowser = document.querySelector(dom);
	filebrowser.addEventListener("change", function(evt) {
		console.log(this.value);
		alert(this.value);
		loadPlayer(this.value);
	}, false);
}
filelistener('#filebrowser');

var userActivity, activityCheck;

player.on('mousemove', function(){
	userActivity = true;
});

activityCheck = setInterval(function() {
	// Check to see if the mouse has been moved
	if(userActivity) {
		// Reset the activity tracker
		userActivity = false;
		// If the user state was inactive, set the state to active
		if(player.userActive() === false) {
			player.userActive(true);
		}
		// Clear any existing inactivity timeout to start the timer over
		clearTimeout(inactivityTimeout);

		// In X seconds, if no more activity has occurred 
		// the user will be considered inactive
		inactivityTimeout = setTimeout(function() {
			// Protect against the case where the inactivity timeout can trigger
			// before the next user activity is picked up  by the 
			// activityCheck loop.
			if(!userActivity) {
				this.userActive(false);
			}
		}, 2000);
	}
}, 250);

function loadPlayer(videopath) {
	player.ready(function() {
		console.log("Loading Player");
		
		// Dynamic video loading
		// @link http://stackoverflow.com/a/16714206/2104168
		player.src([
			{type: "video/mp4", src: videopath + ".mp4"}
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
loadPlayer("");