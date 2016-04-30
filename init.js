var sqlite3=require('sqlite3').verbose();
var agent=require('superagent');
var express=require('express');
var app=express();
var fs=require('fs');
var path = require('path')
var file='database.db';
var bodyParser = require('body-parser');
var db;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/form.html',function(req,res)
{
	res.sendFile(__dirname+"/"+"form.html");
});
app.get('/items.html',function(req,res){
	res.sendFile(__dirname+"/"+"items.html");
});
app.get('/customer.html',function(req,res){
	res.sendFile(__dirname+"/"+"customer.html");
});
app.get('/server.html',function(req,res){
	res.sendFile(__dirname+"/"+"server.html");
});
app.get('/order.html',function(req,res){
	res.sendFile(__dirname+"/"+"order.html");
});
app.get('/chef.html',function(req,res){
	res.sendFile(__dirname+"/"+"chef.html");
});
app.post('/item',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.item=req.body.item;
	resp.price=req.body.price;
	resp.category=req.body.category;
	console.log(resp.item,resp.price,resp.category);	
	res.sendFile(__dirname+"/"+"items.html");
	fs.open(file,'a',function(err,fd){
	if(err)
		console.log('File is not found');
	else
	{
		db=new sqlite3.Database(file);
		db.run("PRAGMA foreign_keys=ON");
		console.log('exe');
	}
	var stmt=db.prepare("insert into item values(?,?,?)");
    stmt.run(resp.item,resp.price,resp.category);
    stmt.finalize();
	db.run("DELETE from item");
});
    
});
app.post('/customer',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.date=req.body.date;
	resp.id=req.body.id;
	resp.name=req.body.name;
	resp.address=req.body.address;
	resp.no=req.body.no;
	console.log(resp.date,resp.id,resp.name,resp.address,resp.no);	
	res.sendFile(__dirname+"/"+"customer.html");
});
app.post('/chef',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.id=req.body.id;
	resp.name=req.body.name;
	resp.exp=req.body.exp;
	resp.address=req.body.address;
	resp.no=req.body.no;
	console.log(resp.id,resp.name,resp.exp,resp.address);	
	res.sendFile(__dirname+"/"+"chef.html");
});
app.post('/server',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.id=req.body.id;
	resp.name=req.body.name;
	resp.exp=req.body.exp;
	resp.address=req.body.address;
	resp.no=req.body.no;
	console.log(resp.id,resp.name,resp.exp,resp.address);	
	res.sendFile(__dirname+"/"+"server.html");
});
app.post('/order',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.id=req.body.id;
	resp.no=req.body.no;
	for(var i=0;i<resp.no;i++)
	{
  		//$('div.list').append('<label for="name">Item '+ i +'</label><<input id="type" name="name" placeholder="Enter the food name:"></input><br><br><label for="qty"></label><input id="type" name="qty" placeholder="Quantity ordered:"></input><br><br>');
	}
	resp.exp=req.body.exp;
	resp.address=req.body.address;
	resp.no=req.body.no;
	console.log(resp.id,resp.name,resp.exp,resp.address);	
	res.sendFile(__dirname+"/"+"order.html");
});
app.post('/table',function(req,res)
{
	console.log('entering post...');
	var resp=new Object();
	resp.id=req.body.id;
	resp.occ=req.body.size;
	resp.ac=req.body.AC;
	resp.no=req.body.no;
	console.log(resp.id,resp.chef,resp.address);	
	res.sendFile(__dirname+"/"+"table.html");
});
app.listen('8080',function()
{
	console.log('Server is up and ready!!');
});

