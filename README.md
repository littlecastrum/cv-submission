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
- Request priviledges to the admios automation@admios-sa.com email (It is 2-step authenticated so contact ricardo.chavarria@admios-sa.com to login)
- Go to https://myaccount.google.com/u/3/security to create an app password
- Get into the Sign-in link, look for the "App password" option. It will require authentication again. Eliminate the current one and add another.
- Copy the password provided

```bash
npm -g i firebase-tools

firebase login

git clone https://github.com/Admios/cv-submission.git

firebase use --add cv-submission

firebase functions:config:set gmail.email="automation@admios-sa.com" gmail.password="app_password"

cd cv-submission/functions

npm i

firebase deploy
```

- You can now make changes and only need to execute ```firebase deploy``` to have them up on the cloud

