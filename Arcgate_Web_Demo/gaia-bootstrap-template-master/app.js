const nodeMailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const encodeUrl = bodyParser.urlencoded({ extended: false });
const app = express();

const port = process.env.PORT || 5000

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/freebie", function (req, res) {
  res.render("freebie");
//   console.log(req.socket.remoteAddress);
//   console.log(req.ip);
//   res.send("your IP is: " + req.ip);
});
//mailing
app.route("/send-email")
   .post( encodeUrl, function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'chandraprahlad9@gmail.com',
            pass: 'uucqxdqbmxhznlqp'
        }
    });
    let mailOptions = {
        from: '"Arcgate"', // sender address
        to: req.body.Email, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body        
        html: '<p><h2>Hey! ' + req.body.Name + '</h2><h4>' + req.body.Message + '</h4></p>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Reached")      
    });
})
var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();    
});
app.listen(port, () => {
  console.log(`server is up on http://localhost:${port}`);
});


