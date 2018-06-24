var socket = io("ws://127.0.0.1:3000");
var intDiff = parseInt(60);//倒计时总秒数量
var is_painting = false;
$(function(){
   	//console.log(getCookie("name"));
	socket.emit('clientname',clientname);

	$("#sendBtn").click(function(){
		var txt = $("#sendTxt").val();
		if(txt){
			socket.emit('message',txt);
		}
		$("#sendTxt").val("");
	})

	$("#start").click(function(){
		socket.emit("gamestatus",{index:0});
	})

	socket.on('enter',function(data){
		showMessage("enter",data.str);
	})
	
	socket.on('message',function(data){
		showMessage("message",data.str);
	})
	socket.on('leave',function(data){
		showMessage("leave",data.str);
	})

	socket.on('userlist',function(data){
		//console.log(data);
		$("#list").empty();
		data.forEach(function(v,index,dd){
			var txt = $("<div></div>").text(v.username);
			$("#list").append(txt);
		})
		setClientCount(data.length);
	})

	socket.on("gamestatus",function(data){
		//alert(data);
		if (data.str == "你正在画画") {
			is_painting = true;
		}
		else{
			is_painting = false; 
		}
		$('.left h2:eq(2)').html(data.str);
		if(data.type=="ing"){
			timer(intDiff,data.index,data.answer,is_painting);
		}
		else if(data.type == "end"){

		}
	})
})

function showMessage(type,str){
	//var div = $("<div></div>").text(str);
	//$(".right .chatcontent").append(div);
	var tag = $(".right .chatcontent textarea");
	tag.val(tag.val() + str + "\n");
}

function setClientCount(num){
	var str = "当前在线人数：" +num
	$("#people_num").text(str)
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

var interval = null;
function timer(intDiff,index,ans,is_painting){
	if(is_painting){
		$('.left h2:eq(1)').html(ans.str);
	}
	if(interval){
		clearInterval(interval);
	}
   	interval = setInterval(function(){
	    $('.left h2:eq(0)').html('倒计时'+intDiff+'秒');
	    if(intDiff == 60 && !is_painting){
	    	$('.left h2:eq(1)').html(ans.length);
	    }
	    else if(intDiff == 30 && !is_painting){
	    	$('.left h2:eq(1)').html(ans.length+" "+ans.type);
	    }
    	intDiff--;
    	if (intDiff<0) {
    		socket.emit("gamestatus",{index : index+1})
    		socket.emit("clearPaint","cc");
    		clearInterval(interval);
    	}
    }, 1000);
} 

