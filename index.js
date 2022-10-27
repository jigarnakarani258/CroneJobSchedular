var nodemailer = require('nodemailer')
var cron = require('node-cron')

let configOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user : '<Your_EmailID>',
        pass : '<Your_password>'
    }
}

var transport = nodemailer.createTransport(configOptions)

let greetingMessage = "";
function greeting(hours){
    if(hours<12 && hours>5)
        greetingMessage ="Good Morning,"
    else if(hours<16 && hours>11)
        greetingMessage ="Good Afternoon,"
    else if(hours<22 && hours>15)
        greetingMessage ="Good Evening,"
}

function minutestest(minutes){
    if(minutes<20 && minutes>0)
        greetingMessage ="Good Morning Sir, "
    else if(minutes<40 && minutes>19)
        greetingMessage ="Good Afternoon Sir,"
    else if(minutes<60 && minutes>39)
        greetingMessage ="Good Evening Sir, "
    return greetingMessage;
}

var mailOptions = {
    from : '<Your_EmailID>',
    to: '<Your_EmailID>',
    subject: 'Sample demo.',
    text: `${greetingMessage} You want to learn Node Js .`,
    attachments: [
        {
            filename : 'file1.txt',
            path: './file1.txt'
        }
    ]
}


let task = cron.schedule(`0 */5 * * * *` , () => {
    console.log("Runnning task at 0,30 second");
    const time = new Date()
    //const hours = time.getHours()
    const minutes = time.getMinutes();

    let msg = minutestest(minutes)

    transport.sendMail(mailOptions , (err , info) =>{
    if(err) 
        console.log(err);
    else 
        console.log( msg + "Email sent" + info.response);
    })
    
})

task.start()

