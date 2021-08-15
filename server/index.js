const express = require('express');
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
var currUser = "";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userID",
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false,
}
))

const db = {
    host: "localhost",
    user: "root",
    password: "mySQL@2020",
    database: "cruddatabase",
    port: 3306,
    insecureAuth: true
};
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

const con = mysql.createConnection(db);

app.post("/register", (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const sqlInsert = "INSERT INTO `users` (Username,Password) VALUES (?, ?)";
    bcrypt.hash(Password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        con.query(sqlInsert, [Username, hash], (err, result) => {
            console.log(err);
        })
    })


})
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.send("Need a token, please give token")
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "you failed to authenticate" });
            }
            else {
                req.userId = decoded.id;
                req.username = decoded.username;
                next();
            }
        })
    }
}
app.get('/isuserAuth', verifyJWT, (req, res) => {
    res.send(data);
})
app.get("/login", (req, res) => {
    if (req.session.user) {

        res.send({loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})
app.post("/login", (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const sqlInsert = "SELECT * FROM `users` WHERE Username = ?  ";
    con.query(sqlInsert, Username, (err, result) => {
        if (err) { res.send({ err: err }); }
        if (result.length > 0) {
            bcrypt.compare(Password, result[0].Password, (error, response) => {
                if (response) {
                    currUser = Username ;
                    const id = result[0].id;
                    const token = jwt.sign({ id }, "jwtSecret", {
                        expiresIn: 600,
                        
                    });
                    
                    req.session.user = result;
                    res.json({ auth: true, token: token, result: result });
                } else {
                    res.json({ auth: false, message: "wrong username password combination" });
                }
            })
        }
        else {
            res.json({ auth: false, message: "no user exists" });
        }

    })

});

app.get("/api/get", (req, res) => {
    const username = req.session.Username;
    const sqlSelect = "SELECT * FROM `birthdays` WHERE Username = ?";
    con.query(sqlSelect, currUser, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const Name = req.body.Name;
    const DOB = req.body.DOB;
    const month = req.body.month;
    const Username = req.session.Username;
    const Event = req.body.Event ;
    const Description = req.body.Description ;
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB , month , Username, Event, Description) VALUES (?, ? , ? , ?, ?, ?)";
    con.query(sqlInsert, [Name, DOB, month, currUser, Event, Description], (err, result) => {
        console.log(err);
    })

});

app.delete("/api/delete/:Name", (req, res) => {

    const name = req.params.Name;

    const sqlDelete = "DELETE FROM `birthdays` WHERE Name = ? AND Username = ?  ";
    con.query(sqlDelete, [name, currUser], (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    })

});

app.put("/api/update", (req, res) => {

    const name = req.body.Name;
    const dob = req.body.DOB;
    const month = req.body.month;
    const sqlUpdate = "UPDATE `birthdays` SET  DOB = ?,month = ? WHERE Name = ? AND Username = ?";
    con.query(sqlUpdate, [dob, month, name, currUser], (err, result) => {
        if (err) console.log(err);
    })

});
/*app.get("/",(req,res)=>{
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB) VALUES ('xyz', '12/2/2001')" ;
    con.query(sqlInsert, (err, result)=>{
        res.send("hi disha") ;
    });

}) ;*/
;

app.listen(3001, () => {
    console.log("Running on port 3001");
})