window.addEventListener("load", function(){
	//HTML5 Audioに対応していない場合は以後の処理をしない
	if(!HTMLAudioElement)
	{
		return;
	}

	//エラーメッセージ
	var errorMessage = ["", "読み込みが中断されました", "ネットワークエラーです", "デコードエラーが発生しました", "未対応のデータかデータがありません"];
	//読み込み状況を表示する領域
	var output = document.getElementById("status");

	//オーディオオブジェクトを作成。多重演奏防止
	var audioObj = new Audio();

	//使える形式を調べる
	var audioObj = new Audio();
	var ext = ".wav";
	if(audioObj.canPlayType("audio/x-mp3") == "maybe")
	{
		ext = ".mp3";
	}

	//オーディオデータをカスタムデータ属性から読み込む
	var bookList = document.querySelectorAll("#books li");
	for(var i=0; i<bookList.length; i++)
	{
		bookList[i].addEventListener("click", function(){
			//既にオーディオが再生されている場合は停止。コントローラーを半透明に
			audioObj.pause();
			document.getElementById("controller").style.opacity = 0.5;

			//読み込むオーディオデータのURLを求める
			var url = this.getAttribute("data-book-url") + ext;
			audioObj = new Audio(url);

			//読み込みのイベントを表示
			audioObj.addEventListener("loadstart", function(){
				output.innerHTML = "データの読み込みを開始しました<br>" + url + "<br>";
			}, true);

			//エラーイベントを表示
			audioObj.addEventListener("error", function(){
				output.innerHTML += "エラーが発生しました<br>";
				output.innerHTML += "エラーコード：" + audioObj.error.code + "<br>";
				output.innerHTML += errorMessage[audioObj.error.code] + "<br>";
			}, true);

			//再生可能イベントを表示
			audioObj.addEventListener("canplay", function(){
				output.innerHTML += "再生が可能になりました<br>";
				document.getElementById("controller").style.opacity = 1.0;
			}, true);

			//再生時間を表示
			audioObj.addEventListener("timeupdate", function(){
				var playTime = document.getElementById("time");
				playTime.innerHTML = "再生時間：" + audioObj.currentTime.toFixed(0) + "秒";
			}, true);
		}, true);
	}

	//再生ボタンの処理
	document.getElementById("playButton").addEventListener("click", function(){
		audioObj.play();
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
