const express=require('express');
const fs=require('fs')
const path=require('path');
const resolve=(p)=>path.resolve(__dirname,p)
var app =express();
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
app.all('/jyWater/app/orderBase/:viewname?', function(req, res) {
	var result=JSON.parse(fs.readFileSync(resolve("./api/"+req.params.viewname+".json")))
	res.status(200)
	res.json(result)
});
var server = app.listen(3333, function () {
	console.log('listening at port 3333')
})