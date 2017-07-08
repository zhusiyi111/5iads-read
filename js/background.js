chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(sender.url==='http://www.5iads.cn/zhuan.asp?zhuan=click'){
		processClickAds(request, sender, sendResponse);
  	}else if(/www\.baidu\.com/.test(sender.url)){
  		processBaidu(request, sender, sendResponse);
  	}else if(/m\.baidu\.com/.test(sender.url)){
		processMBaidu(request, sender, sendResponse);
  	}

  	return true;
  });

function processBaidu(request, sender, sendResponse){

}

function processClickAds(request, sender, sendResponse){
	// 获得localStroge中的搜索链接及title
	if(request.J_method==='getAnswer'){
		getAnswer(request, sender, sendResponse);
	}
}

function processMBaidu(request, sender, sendResponse){
}


// 查询答案
function getAnswer(request, sender, sendResponse){
	
	var data = {
		img:request.data.img,
		keyword:request.data.keyword,
		url:request.data.url
	}

	$.ajax({
		url:'http://localhost:3000/task/getAnswer',
		method:'get',
		data:data,
		success:function(data){
			data = JSON.parse(data);
			if(data.length){
				console.log(data[0])
				sendResponse(data[0]);
			}

			
		}
	});

}