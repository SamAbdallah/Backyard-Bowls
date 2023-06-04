var Sib = require('sib-api-v3-sdk');

exports.sendMail=async(details)=>{
    const client=Sib.ApiClient.instance
    
    const apiKey=client.authentications['api-key']
    apiKey.apiKey=api2.env.API
    
    const tranEmailApi= new Sib.TransactionalEmailsApi
    
    const sender={ 
        email:'saa081@student.bau.edu.lb'
    }
    
    const receivers=[
        {
            email:details.receiver
        }
    ]
    
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:details.subject,
        textContent:details.content
    }).then(console.log).catch(console.log)
    
    }