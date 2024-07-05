const express = require("express");
const { singers } = require("./singer.json");
const app = express();

app.get("/", (req, res) => {
    // res.send("這是首頁");
    res.redirect("/singer/3.html");
    //設定自動導向第三頁
})
app.get("/singer/:id.html", (req, res) => {
    const id = parseInt(req.params.id);
    const result = singers.find(singer => {
        if (singer.id === id) {
            return true;
        }


    });
    if (!result) {
        //沒有結果
        //res.statusCode = 404;//http
        res.status(404);//express
        res.send("<h1>404 找不到歌手</h1>");
        return;
    } else {
        //有結果
        res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${result.singer_name}</title>
</head>

<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>

</html>`)

    }
    res.send(req.params.id);

})
app.all("*", (req, res) => {
    res.send("<h1>404 not found</h1>");
})

app.listen(3000, () => {
    console.log(`服務已啟動於 http://localhost:3000`);
})