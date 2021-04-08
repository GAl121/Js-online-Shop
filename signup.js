
    let users = undefined;
    let username;
    let password;

    $(document).ready(init);

    function init() {
        users = JSON.parse(localStorage.getItem("users"));
        if (users == null) {
            users = [];
        }
    } 

    function register() 
    {
        users.push({
            name: username,
            pass: password,
            products : []  
        });

        localStorage.setItem("users", JSON.stringify(users));
    
}
function showlogin()
{
    let login = ("שם משתמש:  <input type='text' class='w3-round w3-tiny'  id='logusername' /> סיסמא:  <input type='password' class=' w3-round w3-tiny' id='logpass' /> <input type='button' value='התחבר' onclick='login()' class='w3-btn w3-round w3-blue w3-hover-blue-gray w3-tiny' />");
    $("#fastlogin").html(login);
}
function login()
{
    let user = users.find(x => x.name == $("#logusername").val() && x.pass == $("#logpass").val());
    if (user != null) {
        sessionStorage.setItem("currentUser", username);
        $("#loginmsg").text("התחברת בהצלחה! הינך מועבר לעגלת הקניות").css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"})
        setInterval(function(){ location.href = "craft.html"; }, 3000);
        ;
    }
    else {
        $("#loginmsg").text("פרטי הכניסה אינם נכונים").css({"visibility":"visible"});
    }

}


function setUserNameAndPassword() {
    username = $("#username").val();
    password = $("#password").val();
}

function checkUsername(str)
{
    let reguser = /^\w+([\.-]?\w+)/;
    return reguser.test(str);

}

function checkMail(str)
{
    let regemail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regemail.test(str);
}

function signUp()
{
    setUserNameAndPassword();
    let checkpassword = $("#checkpassword").val();
    let email = $("#email").val();
    let signupmsg = $("#signupmsg");
    let flag= false;
    

    // check validation of username
    if(checkUsername(username) == false || username == "")
    {
        signupmsg.css("visibility","visible");
        signupmsg.html(" שם המשתמש אינו חוקי ! חייב להכיל לפחות 2 תווים")
        flag = false;
    }
    else
    {
        signupmsg.css("visibility","hidden");
        signupmsg.html(" ");
        flag = true;
        //check if ther is any user with this name
        if (users.find(x => x.name == username) != null) 
        {
            signupmsg.css("visibility","visible");
            signupmsg.html("שם המשתמש תפוס")
            flag = false;
        }
        else
        {
                signupmsg.css("visibility","hidden");
                signupmsg.html(" ");
                lag = true;

            // check validation of passwords
            if(password == "" || checkpassword == "")
            {
                signupmsg.css("visibility","visible");
                signupmsg.html("לא הוזנה סיסמא או וידוא של הסיסמא!")
                flag = false;
            }
            else
            {
                    signupmsg.css("visibility","hidden");
                    signupmsg.html(" ");
                    flag = true;

                    if( document.getElementById("password").value.length < 6 || document.getElementById("checkpassword").value.length < 6 )
                    {
                        signupmsg.css("visibility","visible");
                        signupmsg.html("הסיסמא חייבת להיות באורך של 6 תווים לפחות");
                        flag = false;
                    }
                    else{

                            signupmsg.css("visibility","hidden");
                            signupmsg.html(" ");
                            flag = true;

                            if(password != checkpassword )
                            {
                                signupmsg.css("visibility","visible");
                                signupmsg.html(" הסיסמאות שהזנת איננן תואמות!");
                                flag = false;
                            }
                            else 
                            {
                                    signupmsg.css("visibility","hidden");
                                    signupmsg.html(" ");
                                    flag = true;
                                    // check e-mail validation
                                    if (checkMail(email) == false || email == "")
                                    {
                                            signupmsg.css("visibility","visible");
                                            signupmsg.html("כתובת המייל שהזנת איננה חוקית!");
                                            flag = false;
                                    }
                                    else
                                    {
                                            signupmsg.css("visibility","hidden");
                                            signupmsg.html(" ");
                                            flag = true;
                                    }                       
                            }
                        }
            }

        }
    } 
    
    if (flag == true)
    {
        signupmsg.css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"})
        signupmsg.html("הרישום בוצע בהצלחה! <br />  הינך מועבר לעמוד הראשי בעוד 3 שניות לצורך התחברות");
        $("#signbtn").prop("disabled", true);
        register();
        setInterval(function(){ location.href = "main.html"; }, 3000);
    }

}