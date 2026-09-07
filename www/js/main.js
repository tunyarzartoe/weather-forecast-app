'use strict';

const targetAreaNo = '130000';  // 対象地域の番号（130000は東京都）
let url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${targetAreaNo}.json`;  // 天気予報情報をJSON形式で提供している気象庁のURL
// 気象庁のWebAPIを利用して天気予報情報を取得
fetch(url)  // urlにAjaxでリクエストを送信
    // Ajax通信に成功した場合
    .then(response => {
        // レスポンスをJSONとして解釈し，オブジェクトに変換
        const obj = response.json();
        // thenメソッドの引数の関数内でreturnされた値（ここではobj）は，
        // 次のthenメソッドの引数内の関数の引数（ここではweather）にセットされる
        return obj;
    })
    .then(weather => {
        // オブジェクトをJSON形式にしてそのままコンソールに表示（内容を確認するため）
        console.log(JSON.stringify(weather));
        // 画面に出力
        document.getElementById('publishingOffice').lastElementChild.textContent = weather.publishingOffice;
        document.getElementById('reportDatetime').lastElementChild.textContent = weather.reportDatetime;
        document.getElementById('targetArea').lastElementChild.textContent = weather.targetArea;
        document.getElementById('headlineText').lastElementChild.textContent = weather.headlineText;
        document.getElementById('text').lastElementChild.innerHTML = weather.text.replace(/\n\n/g, '<br>');  // 全ての'\n\n'を<br>に置換し，HTMLとして埋め込み
    })
    // Ajax通信に失敗した場合
    .catch(error => {
        console.log('Ajax通信に失敗しました', error);
    });