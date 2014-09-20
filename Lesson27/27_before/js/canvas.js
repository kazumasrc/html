//ページの読み込みが完了したら処理を開始
window.addEventListener("load", function(){
	var ele = document.getElementById("status");

	//Canvasが使えるか調べる
	if(!window.HTMLCanvasElement)
	{
		ele.innerHTML = "Canvasが使用できません";
		return;
	}

	//Canvasの要素
	var canvasObj = document.getElementById("myCanvas");
	//2Dコンテキストの取得
	var context = canvasObj.getContext("2d");
	if(!context)
	{
		ele.innerHTML = "2Dコンテキストが取得できませんでした";
		return;
	}
	//Canvasを塗りつぶす
	context.fillStyle = "black";
	context.fillRect(0, 0, canvasObj.width, canvasObj.height);

	//描画
	canvasObj.oldX = 0;
	canvasObj.oldY = 0;
	canvasObj.drawFlag = false;
	canvasObj.addEventListener("mousemove", function(evt){
		if(!canvasObj.drawFlag)
		{
			return;
		}
		var x = evt.offsetX || evt.layerX;
		var y = evt.offsetY || evt.layerY;
		context.strokeStyle = "rgba(255, 255, 255, 1)";
		context.lineWidth = 10;
		context.lineCap = "round";
		context.beginPath();
		context.moveTo(canvasObj.oldX, canvasObj.oldY);
		context.lineTo(x, y);
		context.stroke();
		context.closePath();
		canvasObj.oldX = x;
		canvasObj.oldY = y;
	}, false);

	canvasObj.addEventListener("mousedown", function(evt){
		canvasObj.oldX = evt.offsetX || evt.layerX;
		canvasObj.oldY = evt.offsetY || evt.layerY;
		canvasObj.drawFlag = true;
	}, false);

	canvasObj.addEventListener("mouseup", function(evt){
		canvasObj.drawFlag = false;
	}, false);

	//文字を描画する
	document.getElementById("drawText").addEventListener("click", function(){
		context.fillStyle = "black";
		context.fillRect(0, 0, canvasObj.width, canvasObj.height);
		context.fillStyle = "gray";
		context.font = "normal bold 256pt 'MS P明朝'";
		context.textAlign = "center";
		var text = document.getElementById("char").value;
		context.fillText(text, canvasObj.width / 2, 320);
	}, true);

}, true);
