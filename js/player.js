var player = videojs('video');
player.ready(function(){
	var SPACE_KEY 			= 32;
	var ENTER_KEY 			= 13;
	var F_KEY				= 70;
	var FORWARD_SLASH_KEY	= 220;
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
			}
		}
	});
	
	this.progressTips();
});