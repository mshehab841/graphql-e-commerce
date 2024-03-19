import SibApiV3Sdk from 'sib-api-v3-sdk'
import dotenv from 'dotenv';dotenv.config()
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SIB_API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

export function sendVerificationEmail (email: string,verificationToken : string) {
    sendSmtpEmail.templateId = 5
    sendSmtpEmail.subject = 'Verification Link'
    sendSmtpEmail.sender = {
        name: 'com',
        email: 'com@ecom.com',
    }
    sendSmtpEmail.to = [{
        email: email,
        name: 'Receiver Name',
    }]
    sendSmtpEmail.params = {
        verificationToken: verificationToken,
        email: email
    }
    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(function (data) {
            console.log('API called successfully. Returned data:', data)
        })
        .catch(function (error) {
            console.error('Error sending verification email:', error.message)
        })
}

export function sendForgetPasswordEmail (email: string,OTP : string) {
    sendSmtpEmail.templateId = 1
    sendSmtpEmail.subject = ' forget Password '
    sendSmtpEmail.sender = {
        name: 'com',
        email: 'com@ecom.com',
    }
    sendSmtpEmail.to = [{
        email: email,
        name: 'Receiver Name',
    }]
    sendSmtpEmail.params = {
        OTP: OTP,
        email: email
    }
    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(function (data) {
            console.log('API called successfully. Returned data:', data)
        })
        .catch(function (error) {
            console.error('Error sending verification email:', error.message)
        })
}