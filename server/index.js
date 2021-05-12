const express = require('express') ;
const mysql = require("mysql") ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const cookieparser = require('cookie-parser') ;
const session = require('express-session') ;
 
const app = express() ;

const bcrypt = require('bcrypt') ;
const saltRounds = 10 ;
app.use(express.json()) ; 

app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true})) ;
app.use(session({
    key: "userID",
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60 *24 ,
    },

}
))

const  db  = {
    host: "localhost",
    user: "root",
    password: "mySQL@2020",
    database: "cruddatabase",
    port: 3306,
    insecureAuth : true
};      
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
})) ;

const con = mysql.createConnection(db);


app.post("/register",(req,res)=>{
    const Username = req.body.Username ;
    const Password = req.body.Password ;
    const sqlInsert = "INSERT INTO `users` (Username,Password) VALUES (?, ?)" ;
    bcrypt.hash(Password,saltRounds,(err, hash)=>{
        if(err){
            console.log(err);
        }
        con.query(sqlInsert,[Username,hash],(err,result)=>{
        console.log(err) ;
    }) 
    })
    

}) 

app.get ("/login", (req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user}) ;
    }else{
        res.send({loggedIn: false}) ;
    }
})
app.post("/login",(req,res)=>{
    const Username = req.body.Username ;
    const Password = req.body.Password ;
    const sqlInsert = "SELECT * FROM `users` WHERE Username = ?  " ;
    con.query(sqlInsert,Username,(err,result)=>{
        if (err) {res.send({err: err}) ;}
        if (result.length > 0){
            bcrypt.compare(Password, result[0].Password, (error, response)=>{
                if(response){
                    req.session.user = result ;
                    console.log(req.session.user);
                    res.send(result) ;
                }else{
                    res.send({ "message": "wrong combination"}) ;
                }
            })
        }
        else {
            res.send({ "message": "User doesn't exist"}) ;
        }

        })
        
    

}) ;

app.get("/api/get", (req,res)=>{
    const sqlSelect = "SELECT * FROM `birthdays` " ;
    con.query(sqlSelect,(err,result)=>{
        res.send(result) ;
    }) ;
}) ;

app.post("/api/insert",(req,res)=>{

    const Name = req.body.Name ;
    const DOB = req.body.DOB ;
    const month = req.body.month ;
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB , month) VALUES (?, ? , ?)" ;
    con.query(sqlInsert,[Name,DOB,month],(err,result)=>{
        console.log(err) ;
    }) 

}) ;

app.delete("/api/delete/:Name",(req,res)=>{

    const name = req.params.Name ;
    
    const sqlDelete = "DELETE FROM `birthdays` WHERE Name = ? " ;
    con.query(sqlDelete,name,(err,result)=>{
        if (err) console.log(err) ;
    }) 

}) ;

app.put("/api/update",(req,res)=>{

    const name = req.body.Name ;
    const dob = req.body.DOB ;
    const month = req.body.month ;
    const sqlUpdate = "UPDATE `birthdays` SET  DOB = ?,month = ? WHERE Name = ? " ;
    con.query(sqlUpdate,[dob,month,name],(err,result)=>{
        if (err) console.log(err) ;
    }) 

}) ;
/*app.get("/",(req,res)=>{
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB) VALUES ('xyz', '12/2/2001')" ;
    con.query(sqlInsert, (err, result)=>{
        res.send("hi disha") ;
    });

}) ;*/
;

app.listen(3001, ()=>{
    console.log("Running on port 3001");
})