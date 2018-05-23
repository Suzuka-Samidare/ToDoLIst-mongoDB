// console.logはブラウザ出力
$(function () {

    const outputEl = $('#todo-list');
    let loadCnt = 1;

    // url先にGETを投げる
    $.ajax({
        url: 'http://localhost:3000/all',
        type: 'GET',
    // res受信する所
    }).done( (data) => {
        // dataをスキーマをhtmlで可視化する
        for (let cnt = 0, len = data.length; cnt < len; cnt++) {
            const divadd = $('<div class="todo-content">');
            divadd.html(
                `<p class=cTime-${loadCnt}>${data[cnt].create} 追加</p>
                 <p class="cName-${loadCnt}">${data[cnt].content}</p>
                 <p class="cRadio-${loadCnt}">${data[cnt].limit}：${data[cnt].date} ${data[cnt].time}</p>`
            );
            const divDelAdd = $('<input type="submit" class="todo-content-del" value="Delete">');
            divDelAdd.on('click', () => {
                let delCreateTime = divDelAdd.prev().prev().prev().text().slice(0,-3);
                divDelAdd.parent().remove();
                // url先にGETを投げる
                $.ajax({
                    url: 'http://localhost:3000/delete',  //delete.jsのrouter.get
                    type: 'GET',
                    data: {
                        create: delCreateTime //url先で比較したいデータの指定
                    }
                }).done( (data) => {
                    console.log(data);
                }).fail( () => {
                    console.log('main.js : delete failed');
                });
            })
            outputEl.append(divadd);
            divadd.append(divDelAdd);
            loadCnt += 1
        }
        console.log('main.js : GET success!');
        console.log(data);
    }).fail( () => {
        console.log('main.js : GET failed');
    });


    $('#add-btn').on('click', () => {
        // セレクタ
        let inpContent = $('#input-content').val();
        let inpLimit = $("input[name='limit']:checked").val();
        let inpDate = $('#input-date').val();
        let inpTime = $('#input-time').val();
        // 時間の取得
        let now = new Date;
        let year = now.getFullYear(); // 年
        let month = ('0'+(now.getMonth() + 1)).slice(-2); // 月
        let date = ('0'+now.getDate()).slice(-2);
        let hour = now.getHours(); // 時
        let min = now.getMinutes(); // 分
        // スキーマ格納仕様にする
        let nowDate = `${year}-${month}-${date}`;
        let nowTime = `${hour}:${min}`
        let createTime = `${nowDate} ${nowTime}`;

        if (inpContent && inpLimit && inpDate && inpTime) {
            // url先にPOSTを投げる
            $.ajax({
                url: 'http://localhost:3000/', //index.jsのrouter.post
                method: 'POST',
                data: {
                    content: inpContent,
                    limit: inpLimit,
                    date: inpDate,
                    time: inpTime,
                    create: createTime
                }
            // 受信データがある場合 
            }).done( (data) => {
                outputEl.empty();
                for (let cnt = 0, len = data.length; cnt < len; cnt++) {
                    const divadd = $('<div class="todo-content">');
                    divadd.html(
                        `<p class=cTime-${loadCnt}>${data[cnt].create} 追加</p>
                         <p class="cName-${loadCnt}">${data[cnt].content}</p>
                         <p class="cRadio-${loadCnt}">${data[cnt].limit}：${data[cnt].date} ${data[cnt].time}</p>`
                    );
                    const divDelAdd = $('<input type="submit" class="todo-content-del" value="Delete">');
                    divDelAdd.on('click', () => {
                        let delCreateTime = divDelAdd.prev().prev().prev().text().slice(0,-3);
                        divDelAdd.parent().remove();
                        // url先にGETを投げる
                        $.ajax({
                            url: 'http://localhost:3000/delete',  //delete.jsのrouter.get
                            type: 'GET',
                            data: {
                                create: delCreateTime //url先で比較したいデータの指定
                            }
                        }).done( (data) => {
                            console.log(data);
                        }).fail( () => {
                            console.log('main.js : delete failed');
                        });
                    })
                    outputEl.append(divadd);
                    divadd.append(divDelAdd);
                    loadCnt += 1
                }    
                console.log('main.js : ajaxPOST success!');
                console.log(data)
            // ない場合
            }).fail( () => {
                console.log('失敗');
            });
        }    
    });
});