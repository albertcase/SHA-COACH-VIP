(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			var clientHeight = window.innerHeight;
			if (!clientWidth) return;
			if(clientWidth/clientHeight > 750/1116){
				docEl.style.fontSize = 50 * (clientHeight / 558) + 'px';
			}else{
				docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
			}

		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
	//doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.addEventListener('load', function(){
	////console.log(2);
	//var slideEle = document.getElementsByClassName('slides')[0];
	//var curindex = 1;
	//var slideshow = setInterval(function(){
	//	//console.log(curindex);
	//	//if(curindex>0){
	//	//	slideEle.children[curindex-1].className = 'slide slide-'+curindex;
	//	//}
	//	//if(curindex>3){
	//	//	slideEle.children[curindex-1].className = 'slide slide-'+curindex;
	//	//}
	//	if(curindex==0){
	//		slideEle.children[3].className = 'slide';
	//		slideEle.children[curindex].className = 'slide current';
	//	}else{
	//		slideEle.children[curindex].className = 'slide current';
	//		slideEle.children[curindex-1].className = 'slide';
	//	}
	//	curindex++;
	//	if(curindex>3){
	//		curindex = 0;
	//	}
	//},1500);

});
