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

const db = functions.database.ref('applicant/{applicantId}').onWrite((event) => {
  let data = event.data.val()
  const message = {
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
  return mailTransport.sendMail(message).then(() => {
    console.log('New welcome email sent');
  })
})

exports.admiosMailer = db
