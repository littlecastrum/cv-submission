'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var mailing = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
    var data, messageToHR, messageToApplicant, mailHR, mailApplicant;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = event.data.val();
            messageToHR = {
              from: submitter + ' <noreply@firebase.com>',
              to: mailDestiny,
              subject: 'New webpage applicant',
              text: '\n      Applicant info\n      Name: ' + data.firstname + ' ' + data.lastname + '\n      Email: ' + data.email + '\n      Phone: ' + data.phone + '\n    ',
              attachments: data.fileUrl ? [{ href: data.fileUrl }] : []
            };
            messageToApplicant = {
              from: submitter + ' <noreply@firebase.com>',
              to: data.email,
              subject: 'Succesful Application',
              text: '\n    Hi ' + data.firstname + ' ' + data.lastname + ',\n\n    Thank you for applying for a job at Admios! \n\n    We like qualified candidates who are motivated to keep growing and have a passion for learning and development. \n\n    We will be contacting you via email within a week (make sure to add this email as well as vanessa.arenas@admios-sa.com to your address book so we don\u2019t get sent to your spam folder). \n\n     Kind Regards,\n\n    The Admios Hiring Team\n    '
            };
            mailHR = mailTransport.sendMail(messageToHR);
            mailApplicant = mailTransport.sendMail(messageToApplicant);
            _context.next = 7;
            return mailHR;

          case 7:
            _context.t0 = _context.sent;
            _context.next = 10;
            return mailApplicant;

          case 10:
            _context.t1 = _context.sent;
            return _context.abrupt('return', {
              mailHRRes: _context.t0,
              mailApplicantRes: _context.t1
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function mailing(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functions = require('firebase-functions');
var admin = require('firebase-admin');
var nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);

var gmailEmail = functions.config().gmail.email;
var gmailPassword = functions.config().gmail.password;
var mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});
var mailDestiny = 'jobs@admios-sa.com';
var submitter = 'CV Submission - Admios.com';

var db = functions.database.ref('applicant/{applicantId}').onWrite(mailing);

exports.admiosMailer = db;