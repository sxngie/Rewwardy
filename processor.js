const f = require('@ngneat/falso');
// import { Person, Date } from '@ngneat/falso';
 
function generateSignupData(requestParams, ctx, ee, next) {
    ctx.vars["firstName"] = f.randFirstName();
    ctx.vars["lastName"] = f.randLastName();
    ctx.vars["email"] = f.randEmail();
    ctx.vars["phone"] = f.randPhoneNumber();
    ctx.vars["password"] = f.randPassword(10);
    ctx.vars["dateOfBirth"] = f.randPastDate();
    ctx.vars["gender"] = "Other";
 
  return next();
}

function generateLoginData(requestParams, ctx, ee, next) {
    ctx.vars["email"] = f.randEmail();
    ctx.vars["password"] = f.randPassword(10);
}

module.exports = {
  generateSignupData,
  generateLoginData,
};