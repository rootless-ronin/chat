function CommonMethods(){
	this.socket = io();
	this.showUserChat = function(userID, userName){
		try{
			$("#right-panel").empty();
			var chatPanel = document.createElement("div");
			$(chatPanel).addClass("panel");

			var chatHeading = document.createElement("div");
			$(chatHeading).addClass("heading");
			$(chatPanel).append(chatHeading);

			var chatUserIcon = document.createElement("span");
			$(chatUserIcon).addClass("icon mif-user");
			$(chatHeading).append(chatUserIcon);

			var chatUserTitle = document.createElement("span");
			$(chatUserTitle).addClass("title");
			$(chatUserTitle).text(userName);
			$(chatHeading).append(chatUserTitle);

			var chatWindow = document.createElement("div");
			$(chatWindow).addClass("content");
			$(chatWindow).attr("id", "messages-window");
			$(chatPanel).append(chatWindow);

			$("#right-panel").append(chatPanel);

		}
		catch(err){
			alert(err.message + "CommonMethods::showUserChat");
		}
	}

	this.sendUserChat = function(userID, userName){
		try{
			var myMessage = document.createElement("div");
			$(myMessage).addClass("bubble me");
			this.socket.emit("echo request", $("#user-text-window").val());
			$(myMessage).text($("#user-text-window").val());
			$("#user-text-window").val("");

			$("#messages-window").append(myMessage);

		}
		catch(err){
			alert(err.message + "CommonMethods::sendUserChat");
		}
	}

}

function ChatMethods(){
	this.socket = io();
}

$(document).ready(function(){
	try{
		var socket =  io();

		socket.on('echo response', function(msg){
			var serverMessage = document.createElement("div");
			$(serverMessage).addClass("bubble other");
			$(serverMessage).text(msg);
			$("#messages-window").append(serverMessage);
		});


		$(".user-bar").click(function(){

			var commonMethodsObj = new CommonMethods();
			var userID = $(this).attr("data-user-id");
			var userName = $(this).attr("data-user-name");
			commonMethodsObj.showUserChat(userID, userName);
		});

		$("#send-message-button").click(function(){
			var commonMethodsObj = new CommonMethods();
			commonMethodsObj.sendUserChat("test", "test");
		});
	}
	catch(err){
		alert(err.message + "document::ready");
	}
});