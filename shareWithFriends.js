function login() {
	FB.login(function(response) {
		if (response.authResponse) {
			console.log("連結成功, 狀態為 connected");
			// 連結成功, 狀態為 connected
		} else {
			console.log("取消登入");
			// 取消登入
		}
	}, {
		scope: 'email,publish_stream,user_about_me,user_likes,user_birthday,user_status'
	});
}

function shareToFb(body) {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			var fbhtml_url = window.location.toString();
			//var body = 'Reading JS SDK documentation';
			FB.api('/me/feed', 'post', {
				message : body
			}, function(response) {
				if (!response || response.error) {
					alert('貼文失敗!');
				} else {
					alert('已貼文到動態時報，你好華喔!');
				}
			});

		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook,
			// but has not authenticated your app
			login();
			console.log("not_authorized");
		} else {
			// the user isn't logged in to Facebook.
			login();
			console.log("isn't logged");
		}
	});
} 