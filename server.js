var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app=express();
app.use(morgan('combined'));

var articleOne={
    title:'Article-one',
    date:'Sep 1,2017',
    heading:'Article-one|Praveen Bellary',
    content:`  <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   
         <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   
         <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   `
};

function createTemplate(data){
var title=data.title;
var date = data.date;
var heading=data.heading;
var content=data.content;
var htmlTemplate=`<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width-device-width,initial-scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>  
        <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
        ${content}
        </div>
    </body>
</html>
`;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','index.html'));
});

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-two.html'));
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


