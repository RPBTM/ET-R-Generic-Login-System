var url_loginSheet = "https://docs.google.com/spreadsheets/d/1L0kdxaoabT0MCyPXn0tTmKUxu1WvlyKoXVTOcjuL7qM/edit?usp=sharing";


function doGet(request) {

  if(request.parameters.v){
    return HtmlService.createTemplateFromFile('PassReset').evaluate();
  
  }else if(request.parameters.n){
    return HtmlService.createTemplateFromFile('Activation').evaluate();
  
  }else{
  return HtmlService.createTemplateFromFile('FrontPage').evaluate();
}

}

function include(File) {
    return HtmlService.createHtmlOutputFromFile(File).getContent();
};

function getUrl() {
    return ScriptApp.getService().getUrl();
}

function validateLogin(login_data){

  var result = {};
  result.email = "";
  result.password = "";
  result.activation = "";

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("A:A").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==login_data.email){
        Logger.log(i)
        if(ws.getRange("D"+(i+1).toString()).getValue()==login_data.email && ws.getRange("E"+(i+1).toString()).getValue()==login_data.password){
        var resulted = ws.getRange("D"+(i+1).toString()+":H"+(i+1).toString()).getValues();
        result.email = resulted[0][0];
        result.password = resulted[0][1];
        result.activation = resulted[0][4];
        }
      }
    }
  Logger.log('results_login_data : ', result);
  return result
}

function validate_forget_password(fp_data){

  // var fp_data= {};
  // fp_data.email = 'user2@gmail.com'
  var result = {};
  result.email = "";
  result.password = "";
  result.resetLink = "";

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("A:A").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==fp_data.email){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("D"+(i+1).toString()).getValue()==fp_data.email){
        var resulted = ws.getRange("D"+(i+1).toString()+":F"+(i+1).toString()).getValues();
         Logger.log('resulted : %s',resulted)
        result.email = resulted[0][0];
        result.password = resulted[0][1];
        result.resetLink = resulted[0][2];
        }
      }
    }
  Logger.log('results_fp : %s', result.email);
  return result

}


function reset_password(reset_data){

  // var reset_data='huhjn67'

  var result = {};
  result.email = "";

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("B:B").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==reset_data){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("F"+(i+1).toString()).getValue()==reset_data){
        var resulted = ws.getRange("D"+(i+1).toString()+":F"+(i+1).toString()).getValues();
         Logger.log('resulted : %s',resulted)
        result.email = resulted[0][0];
        }
      }
    }
  Logger.log('results : %s', result.email);
  return result

}

function activateUser(activationKey){


  var result = {};
  result.email = "";
  result.status = "";
  result.activationValue = "";

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("C:C").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==activationKey){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("H"+(i+1).toString()).getValue()==activationKey){
        var resulted = ws.getRange("D"+(i+1).toString()+":H"+(i+1).toString()).getValues();
        ws.getRange("H"+(i+1).toString()).setValue("Activated");
         Logger.log('resulted : %s',resulted)
        result.email = resulted[0][0];
        result.activationValue = resulted[0][4];
        result.status = 'Success';
        }
      }
    }
  Logger.log('results : %s', result.status);
  return result

}

function reset_password_change_pass(change_pass){

  // var change_pass = {};
  // change_pass.reset_email = "user2@gmail.com";
  // change_pass.reset_password = "passg";
  // change_pass.reset_password_c = "passg";

  var result = {};
  result.status = "";

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("A:A").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==change_pass.reset_email){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("D"+(i+1).toString()).getValue()==change_pass.reset_email && ws.getRange("F"+(i+1).toString()).getValue()!=""){
        ws.getRange("E"+(i+1).toString()).setValue(change_pass.reset_password);
        ws.getRange("F"+(i+1).toString()).setValue("");

        result.status = "Success";
        }
      }
    }
  Logger.log('results : %s', result.status);
  return result

}

function setResetKey(reset_data){

  // var reset_data = {};
  // reset_data.email = "user2@gmail.com";
  var keyData = {};
  keyData.status = '';
  // keyData.key = "huhkkhh";
  keyData.key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("A:A").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==reset_data.email){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("D"+(i+1).toString()).getValue()==reset_data.email){
        ws.getRange("F"+(i+1).toString()).setValue(keyData.key);

        keyData.status = "Success";
        }
      }
    }
  Logger.log('keyData : %s', keyData.status);
  return keyData


}

function sendResetEmail(emailData){

// var emailData ={}
// emailData.email = "user1@gmail.com";
// emailData.link = "user1@edefefegmail.com";

  MailApp.sendEmail(
    emailData.email,
    "Login System password reset link",
    "Dear Sir/Madam," + "\n\n" +
    "Link :  "+emailData.link+ "\n" +
    "Thank you."+ "\n" +
    "Best regards,"+ "\n"+
    "Login Automation System.",
  {name: "GMOA in Collaboation with SHRI",
  }
  );
return "Success"
}

function sendNewUserActivationEmail(emailData){


  MailApp.sendEmail(
    emailData.email,
    "Login System New User Activation link",
    "Dear Sir/Madam," + "\n\n" +
    "Please click on or copy paste below link to activate your account," + "\n\n" +
    "Link :  "+emailData.link+ "\n" +
    "Thank you."+ "\n" +
    "Best regards,"+ "\n"+
    "ET&R Login Automation System.",
  {name: "ET&R Login System",
  }
  );
return "Success"
}

function randomKeyGen(){
  var key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20);
  Logger.log("key : %s", key)
}

function regNewUser(newUser_data){

  // var newUser_data = {};
  // newUser_data.email = "user5@gmail.com";
  // newUser_data.password = "dcdcdcdc";
  
  var newUser_reg = {};
  newUser_reg.status = '';
  newUser_reg.activationKey = newUser_data.activationKey;
  newUser_reg.email = newUser_data.email;

  var ss = SpreadsheetApp.openByUrl(url_loginSheet);
  var ws = ss.getSheetByName('LoginData');
  var wsIndex = ss.getSheetByName('Index');
  var dataIndex = wsIndex.getRange("A:A").getValues();

    for (var i = 0; i < dataIndex.length; i++) {
      if(dataIndex[i][0]==newUser_data.email){
        Logger.log('dataIndex[i][0] : %s',dataIndex[i][0])
        if(ws.getRange("D"+(i+1).toString()).getValue()==newUser_data.email){
          newUser_reg.status ="Already Registered"
          break
        // ws.getRange("F"+(i+1).toString()).setValue(keyData.key);

        // keyData.status = "Success";
        }
      }
    }

    if(newUser_reg.status == ''){
      ws.appendRow(
        [,
        ,
        ,
        newUser_data.email,
        newUser_data.password,
        ,
        ,
        newUser_data.activationKey]
      )

      newUser_reg.status = 'Success';

      

    }
  Logger.log('newUser_reg : %s', newUser_reg.status);
  return newUser_reg


}















