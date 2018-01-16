const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

admin.initializeApp(functions.config().firebase);

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})
const mailDestiny = 'jobs@admios-sa.com'
const submitter = 'CV Submission - Admios.com'

async function mailing(event) {
  let data = event.data.val()
  const messageToHR = {
    from: `${submitter} <noreply@firebase.com>`,
    to: mailDestiny,
    subject: 'New webpage applicant',
    text: `
      Applicant info
      Name: ${data.firstname} ${data.lastname}
      Email: ${data.email}
      Phone: ${data.phone}
    `,
    attachments: data.fileUrl ? [{href: data.fileUrl}] : []
  }
  const messageToApplicant = {
    from: `${submitter} <noreply@firebase.com>`,
    to: data.email,
    subject: 'Succesful application',
    text: `
    Hi ${data.firstname} ${data.lastname},

    Thank you for applying for a job at Admios! 

    We like qualified candidates who are motivated to keep growing and have a passion for learning and development. 

    We will be contacting you via email within a week (make sure to add this email as well as vanessa.arenas@admios-sa.com to your address book so we don’t get sent to your spam folder). 

     Kind Regards,

    The Admios Hiring Team
    `
  }
  const mailHR = mailTransport.sendMail(messageToHR)
  const mailApplicant = mailTransport.sendMail(messageToApplicant)
  return {
    mailHRRes: await mailHR,
    mailApplicantRes: await mailApplicant
  }
}

const db = functions.database.ref('applicant/{applicantId}').onWrite(mailing)

exports.admiosMailer = db
