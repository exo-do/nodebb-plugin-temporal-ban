
(function(TemporalBan) {
	// Funcion para deteccion de multicuenta por cookie
	init = function()
	{
		$(window).on('action:ajaxify.contentLoaded', function () {
			try{
				if( document.URL.indexOf("/user") > -1 && $("#chat-btn") && app.user.isAdmin )
				{	// Si estamos en el perfil de un usuario, ponemos los botones y demas
					$($("#chat-btn").parent()).append('<br><br><input type="text" style="color:black;" id="banTime" placeholder="Selecciona la fecha de acabado del ban"><a href="#" class="btn btn-danger" onclick="banWithTime()">Ban</a>');
					$("#banTime").datepicker();
					infoBanTime();
				}
			}catch(e){
			}
		});
	}

	banWithTime = function()
	{	// Pedimos por socket que banee al usuario
		var banTime = moment($("#banTime").val());
		var uid = $(".account").attr("data-uid");
		socket.emit('admin.banUser', {banTime: banTime.format("x"), uid:uid}, function(err, data){
	        if(err)
	        {
	        	alert("No ha sido posible banear al usuario :(");
	        }
	        else
	        {
	        	alert("Usuario Baneado!");
	        }
	    });
	}

	infoBanTime = function()
	{	// Pedimos el tiempo de baneo para mostrarlo
		var uid = $(".account").attr("data-uid");
		socket.emit('admin.infoBanTime', {uid:uid}, function(err, data){
	        if(!err)
	        {
	        	if( data.banned )
	        	{
	        		var timeB = moment(data.banTime, "x");
	        		$("#banTime").val(timeB.format("YYYY-MM-DD"));
	        	}
	        }
	    });
	}

	init();

})(window.TemporalBan);

