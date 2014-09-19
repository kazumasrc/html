window.addEventListener("load", function(){
	//HTML5 Audioに対応していない場合は以後の処理をしない
	if(!HTMLAudioElement)
	{
		return;
	}
	//audio要素へのアクセスを手軽にするため変数aoudioObjに入れる
	var audioObj = document.getElementById("myAudio");

	//再生ボタンの処理
	audioObj.addEventListener("canplaythrough", function(){
		document.getElementById("playButton").addEventListener("click", function(){
			audioObj.play();
		}, true);
	}, true);

	//停止ボタンの処理
	document.getElementById("stopButton").addEventListener("click", function(){
		audioObj.pause();
	}, true);

	//巻き戻しボタンの処理
	document.getElementById("rewindButton").addEventListener("click", function(){
		audioObj.currentTime = 0;
		audioObj.pause();
	}, true);

	//等倍速再生ボタンの処理
	document.getElementById("normalButton").addEventListener("click", function(){
		audioObj.playbackrate = 1.0;
		audioObj.defaultPlaybackRate = 1.0;
	}, true);

	//２倍速再生ボタンの処理
	document.getElementById("fastButton").addEventListener("click", function(){
		audioObj.playbackrate = 2.0;
		audioObj.defaultPlaybackRate = 2.0;
	}, true);

	//スロー再生ボタンの処理
	document.getElementById("slowButton").addEventListener("click", function(){
		audioObj.playbackrate = 0.5;
		audioObj.defaultPlaybackRate = 0.5;
	}, true);

}, true);
