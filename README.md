# cv-submission

This is a basic application form for the organization composed of First Name, Last Name, E-Mail, Phone & a Curriculum file.
It uses firebase to relay the information sent in the form to the jobs@admios-sa.con account.

The form.html is meant to be added as a code block to a Squarespace webpage (currently functional in the carrers view)

To make modifications to the functionality create a firebase account and proyect and follow the instructions

For deployment and further modifications:

### Form modifications
- Request priviledges to the Admios Squarespace and once in browse towards the "Carrers" page
- Click edit of the page components and scroll down where the form is the last element of the page
- Click edit of the block code at the end and add or substitute the new code
- Click apply and safe for the page to accept the modifications

### Form submission

```bash
npm -g i firebase-tools
firebase login
git clone https://github.com/Admios/cv-submission.git

# Modify config information in the form.html with you firebase account 
# app & follow Form modifications instructions

# Make modifications to the functions/index.js file

# To be able to send emails with your Gmail account: enable access to 
# Less Secure Apps and Display Unlock Captcha. For accounts with 2-step 
# verification enabled Generate an App Password

cd cv-submission/functions
npm i
firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
firebase deploy
```


