var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config={
    user:'praveenbellaryp',
    database:'praveenbellaryp',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };

var app=express();
app.use(morgan('combined'));



var articles={
  'article-one':{
    title:'Article-one|Praveen Bellary',
    date:'Sep 1,2017',
    heading:'Article-one',
    content:`  <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   
         <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   
         <p>
            This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.This is my first Article.
        </p>   `
},
  'article-two':{ title:'Article-two|Praveen Bellary',
    date:'Sep 1,2017',
    heading:'Article-two',
    content:`  <p>
            This is my Second Article.
         </p>  `},
  'article-three':{title:'Article-three|Praveen Bellary',
    date:'Sep 1,2017',
    heading:'Article-three',
    content:`  <p>
            This is my Third Article.
          </p> `}
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
                ${date.toDateString()}
            </div>
        ${content}
        </div>
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){
    
  var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
    
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send("Article not found");
            }else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});



app.get('/ui/main.js',function(req,res){
   res.sendFile(path.join(__dirname,'ui','main.js')); 
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


