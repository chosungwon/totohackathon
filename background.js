chrome.tabs.onUpdated.addListener(function (tabId, tab, changeInfo) {
    let url = changeInfo.url;
    if (url != localStorage.getItem('url')){
        chrome.tabs.executeScript({
            code: 'document.URL'
        },function (domain) {
            localStorage.setItem('url', domain);
        })
    }
    else


        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            let a = JSON.parse(xhr.responseText);
            let b = a.count;
            let c = a.check;
            let d = a.time;
            if(c == true){
                alert('배너가' + b + '개 검출된 사이트입니다. \n최종 업데이트 일자 : '+d);
                chrome.tabs.executeScript({
                    code: 'history.go(-1)'
                })
            }
            else if(c == false){
                alert('건전한 사이트 입니다.')
            }

        } else {
            console.error(xhr.responseText);
        }
    };
        xhr.open('POST', 'http://soylatte.kr:3000/image/check');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('url=' + changeInfo.url);
    alert('사이트 감별중입니다. 잠시만기다려주세요.');

})


