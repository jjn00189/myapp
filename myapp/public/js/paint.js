$(function(){
	//socket.emit('clientname',clientname+"ss");
	var canvas = $("#zone")[0];
	var cxt=canvas.getContext("2d");
    cxt.strokeStyle = "red";
    canvas.onmousedown=function(e){
        if(is_painting){
        	cxt.beginPath();
        	var x=e.clientX-canvas.offsetLeft;
            var y=e.clientY-canvas.offsetTop;
          	cxt.moveTo(x,y);
          	socket.emit("paint_start",{'x':x,'y':y});
          	
    		document.onmousemove=function(e) {
    			var nx=e.clientX-canvas.offsetLeft;
                var ny=e.clientY-canvas.offsetTop;
    			cxt.lineTo(nx, ny);
                socket.emit("paint_ing",{'x':nx,'y':ny});
    			cxt.stroke();
    			document.onmouseup=function(e){
                   document.onmousedown=null;
                   document.onmousemove=null;
                   socket.emit("paint_ing",{'x':-1,'y':-1});
                };
            };
        }
    };


    $("#clearbtn").click(function(){
       		//alert("kkk");
        if(is_painting){
    		var canvas = $("#zone")[0]; 
    		var cxt=canvas.getContext("2d");  
    		cxt.clearRect(0,0,canvas.width,canvas.height);  
            socket.emit("clearPaint","cc");
            alert("qingkong");
        }
    });
    

   	socket.on("paint_start",function(data){
        //console.log(data);
        cxt.beginPath();
        cxt.moveTo(data.x,data.y);
        socket.on("paint_ing",function(data){
            //console.log(data);
            if(data.x!=-1&&data.y!=-1){
                cxt.lineTo(data.x, data.y);
                cxt.stroke();
            }
        })
   	});

    socket.on("clearPaint",function(data){
        var canvas = $("#zone")[0]; 
        var cxt=canvas.getContext("2d");  
        cxt.clearRect(0,0,canvas.width,canvas.height);  
    })


});
 