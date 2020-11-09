export function setCookie(objName, objValue, objSeconds){//添加cookie
        var str = objName + "=" + escape(objValue);
        //为0时不设定过期时间，浏览器关闭时cookie自动消失
        if (objSeconds > 0) {
            var date = new Date();
            var ms = objSeconds * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
        //alert("添加cookie成功");
    }
    
    //获取指定名称的cookie的值
    export function getCookie(objName){
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName)
            return unescape(temp[1]);
        }
    }
    
    //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    export function delCookie(name){
        setCookie(name, '', -1);
    }