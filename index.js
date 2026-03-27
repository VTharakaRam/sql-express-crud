require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override");


const port =1010;

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: process.env.DB_PASSWORD
});

let getRandomUser =()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

//Home Page
app.get("/" , (req,res)=>{
    res.render("home.ejs");
});


//adding new user page
app.get("/users/new" , (req,res)=>{
    res.render("addUser.ejs");
});


//Users page
app.get("/users",(req,res)=>{

    let q = `select * from user`;
    
    connection.query( q , (err,users)=>{
        if(err){
            console.log(err);
            res.send("Some error occured, Please check!");
        }

        // console.log(users);
        console.log(users.length);
        res.render( "user.ejs" , { users });
    });
});

//adding user into db
app.post("/users", (req,res)=>{
    let {username : newUsername , email : newEmail} = req.body;

    let newId =faker.string.uuid();
    let newPassword = faker.internet.password();

    data = [newId,newUsername,newEmail,newPassword];

    let q = `insert into user (id,username,email,password) values (?,?,?,?)`;
    connection.query(q, data , (err,results)=>{
        if(err){
            res.send("Please check. Something went wrong");
        }
        
        res.redirect("/users");
    });
});


//edit page of the user
app.get("/users/:id/edit" , (req,res)=>{
    let {id} = req.params;

    let q = `select * from user where id= '${id}'`;

    connection.query(q , (err,result)=>{
        if(err){
            console.log(err);
            res.send("Some error occured, Please check!");
        }

        let user = result[0];

        console.log(user);
        res.render( "edit.ejs" , { user });
    });
});

//update db route
app.patch("/users/:id" , (req,res)=>{
    let { id } = req.params;

    let {password: formPass ,username : newUsername} = req.body;

    let q1 = `select * from user where id= '${id}'`;

    connection.query(q1 , (err,result)=>{
        if(err){
            console.log(err);
            res.send("Something went wrong, Please check!");
        }

        let user = result[0];
        
        if(formPass !== user.password){
            res.send("Wrong Password! Please check.");
        }
        else{
            let q2 = `update user set username = '${newUsername}' where id = '${id}'`;
            connection.query(q2 , (err,result)=>{
                if(err){
                    console.log(err);
                    res.send("Some error occured, Please check!");
                }
                res.redirect( "/users");
            });
        }
    });
});

//delete page
app.get("/users/:id/delete" , (req,res)=>{
    let {id} = req.params;

    let q = `select * from user where id= '${id}'`;

    connection.query(q , (err,result)=>{
        if(err){
            console.log(err);
            res.send("Some error occured, Please check!");
        }

        let user = result[0];

        res.render( "deleteUser.ejs" , { user });
    });
});

//delete from db route
app.delete("/users/:id" , (req,res)=>{
    let {id} = req.params;

    let formPass = req.body.password;

    let q1 = `select * from user where id = '${id}'`;
    connection.query(q1 ,(err,results)=>{
        if(err){
            console.log(err);
            res.send("Cannot process. Something went Wrong!");
        }
        
        let user = results[0];

        if(user.password !== formPass){
            res.send("Wrong Password! Please check it.");
        }
        else{
            let q2 = `delete from user where id = '${id}'`;
            connection.query(q2 , (err,result)=>{
                if(err){
                    console.log(err);
                    res.send("Something went Wrong!");
                }
                res.redirect( "/users");
            });
        }
    })
});

//Starting the server
app.listen(port , ()=>{
    console.log(`listening to the port ${port}`);
});
