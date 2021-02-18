var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const port = process.env.PORT||3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/registration",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    //var password = req.body.password;
    var course=req.body.course;
    var courseconfirm=req.body.courseconfirm;
    var dob=req.body.dob;
    var college=req.body.college;
    var branch=req.body.branch;
    var  semester=req.body.semester;
  
    var streetaddress=req.body.streetaddress;
    var city=req.body.city;
    var postalcode=req.body.postalcode;
    var state=req.body.state;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        //"password" : password,
        "course":course,
        "courseconfirm":courseconfirm,
        "dob":dob,
        "college":college,
        "branch":branch,
        "streetaddress":streetaddress,
        "city":city,
        "postalcode":postalcode,
        "state":state,
        "semester":semester
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('registration.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port);


console.log(`Listening on port ${port}`);