
 let users = undefined;
 let username;
 let password;
 let totalprice = 0 ; 

     // arrays of pic descriptions and cost
     let pic = ["<img src='img/bag.jpeg' alt='bag'></img>","<img src='img/bag2.jpeg' alt='bag2'>","<img src='img/cup.jpg' alt='cup'></img>","<img src='img/hat.jpeg' alt='hat'></img>","<img src='img/lighter-case.jpeg' alt='lighter-case'></img>","<img src='img/monopol.jpg' alt='monopol'></img>","<img src='img/morty-figuer.jpeg' alt='morty'></img>","<img src='img/rick-figure.jpeg' alt='rick'></img>","<img src='img/pickle-rick-game.jpg' alt='pickle-rick'></img>"];
     let prices = [80,100,25,65,10,120,150,150,200];
     let des = ["תיק גב 1","תיק גב 2","כוס ריק ומורטי","כובע ריק ומורטי","מחזיק מצית","מונופול","דמות- מורטי","דמות- ריק סנצ'ז","פיקל ריק"];

 $(document).ready(init);
 $(document).ready(checkcoockies);
 $(document).ready(showCart);

 function logout()
{
   sessionStorage.clear();
   $("#loginmsg").text("היתנתקת בהצלחה! הינך מועבר לעמוד הראשי").css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"})
   setInterval(function(){ location.href = "index.html"; }, 3000);
}

 function checkcoockies()
 {
     let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser != null)
    {
        let msg= "הינך מחובר כ-" + currentUser  +  "  <a herf='#' class='w3-button w3-padding-small' onclick='logout()'><i class='fa fa-power-off' aria-hidden='true'></i></a>";
        $("#fastlogin").html(msg).css("font-size","13px");
        return true;
    }
    return false;
 }

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
    if (checkcoockies() == false)
    {
    let login = ("שם משתמש:  <input type='text' class='w3-round w3-tiny'  id='logusername' /> סיסמא:  <input type='password' class=' w3-round w3-tiny' id='logpass' /> <input type='button' value='התחבר' onclick='login()' class='w3-btn w3-round w3-blue w3-hover-blue-gray w3-tiny' />");
    $("#fastlogin").html(login);
    }
}

function login()
{
    let user = users.find(x => x.name == $("#logusername").val() && x.pass == $("#logpass").val());
        if (user != null) 
        {
            sessionStorage.setItem("currentUser", user.name);
            $("#loginmsg").text("התחברת בהצלחה! הינך מועבר לעגלת הקניות").css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"});
            setInterval(function(){ location.href = "cart.html"; }, 3000);
        }
        else 
        {
            $("#loginmsg").text("פרטי הכניסה אינם נכונים").css({"visibility":"visible"});
        }

}
/* 
function will show pay window
*/
function showPay()
{
    $("#footerpay").css("visibility","visible");
    $("#showamont").html(totalprice);

}
/*
function will validate all the parameters before charge the customer
*/
function pay()
{
    let d = new Date;
    let cardNumber = $("#cardnum").val();
    let passport = $("#numid").val();
    let date = $("#date").val();
    let backNum = $("#backcard").val();
    let phone = $("#phonenum").val();
    let msg = $("#paymsg");
    let flag = false;

    let reg_cardNumber = /^[0-9]{16}$/;
    let reg_passport = /^[0-9]{9}$/;
    let reg_backNum = /^[0-9]{3}$/;
    let reg_phone = /^0{1}[1-9]{1,2}[0-9]+$/;
    
    if(reg_cardNumber.test(cardNumber) == false || cardNumber == " ")
    {
        msg.css("visibility","visible");
        msg.html(" לא הוזן מספר כרטיס/ כרטיס לא חוקי");
        flag = false;
    }
    else
    {
        msg.css("visibility","hidden");
        msg.html(" ");

        if(reg_passport.test(passport) == false || passport == " ")
        {
            msg.css("visibility","visible");
            msg.html(" לא הוזן מספר ת.ז/ מספר לא חוקי");
            flag = false;
        }
        else
        {
            msg.css("visibility","hidden");
            msg.html(" ");

            if( date <= d || date == "")
            {
                msg.css("visibility","visible");
                msg.html(" לא הוזן תאריך");
                flag = false;
            }
            else
            {
                msg.css("visibility","hidden");
                msg.html(" ");

                if(reg_backNum.test(backNum) == false || backNum == " ")
                {
                    msg.css("visibility","visible");
                    msg.html(" לא הוזן 3 ספרות בגב הכרטיס/ לא הוזנו ספרות תקינות");
                    flag = false;
                }
                else
                {
                    msg.css("visibility","hidden");
                    msg.html(" ");
                    if(reg_phone.test(phone) == false || phone == " ")
                    {
                        msg.css("visibility","visible");
                        msg.html(" לא הוזן מספר טלפון / המספר איננו חוקי");
                        flag = false;
                    }
                    else
                    {
                        msg.css("visibility","hidden");
                        msg.html(" ");
                        flag = true;
                    }
                }
            }
            
        }
    }
    
    if (flag == true)
    {
        users = JSON.parse(localStorage.getItem("users"));
        let user = users.find(x => x.name == sessionStorage.getItem("currentUser"));

        msg.css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"});
        let paymsg = user.name + "חוייבת בהצלחה בסכום כולל של: <br />" + totalprice + "הינך מועבר בעוד מספר רגעים";
        msg.html(paymsg);
        user.products = [];
        totalprice = 0;
        
        localStorage.setItem("users", JSON.stringify(users));
        
        alert(paymsg);
        setInterval(function(){ location.href = "index.html"; }, 1500);
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

/*
sign up function will check all the fields before it allow you to register. if there is connected user the function will not allow to 
sign up untill loguot
*/
function signUp()
{
 setUserNameAndPassword();
 let checkpassword = $("#checkpassword").val();
 let email = $("#emailAdd").val();
 let signupmsg = $("#signupmsg");
 let flag= false;
 
    if (checkcoockies() == true)
    {
        $("#loginmsg").html("כדי להירשם יש להתנתק לפני").css("visibility","visible");
        $("#signbtn").prop("disabled", true);  
    }
    else{
        $("#signbtn").prop("disabled", false);
    

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
 } 
 
 if (flag == true)
 {
     signupmsg.css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"})
     signupmsg.html("הרישום בוצע בהצלחה! <br />  הינך מועבר לעמוד הראשי בעוד 3 שניות לצורך התחברות");
     $("#signbtn").prop("disabled", true);
     register();
     setInterval(function(){ location.href = "index.html"; }, 3000);
 }

}

/*
delete item function will delete frome lockcal storage and from user table
*/

function removeItem(i)
{
    
    users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(x => x.name == sessionStorage.getItem("currentUser"));
    user.products.splice(i,1);
    localStorage.setItem("users", JSON.stringify(users));
    
    showCart();
}

/*
this function will add item for each user products array, only if the user name is connected!
*/

function addItem(index)
{   
   if (checkcoockies() == false)
    {
        $("#myProductsTable").css({"visibility":"hidden"});
        $("#productsTable").css({"visibility":"hidden"});
        $("#loginmsg").text("על מנת להוסיף פריטים לעגלה יש להתחבר לפני!").css({"visibility":"visible"});
    }
    else
    {
        $("#myProductsTable").css({"visibility":"visible"});
        $("#productsTable").css({"visibility":"visible"});
       
        users = JSON.parse(localStorage.getItem("users"));
    
        let user = users.find(x => x.name == sessionStorage.getItem("currentUser"));
       
        user.products.push([des[index],prices[index],pic[index]]);

        localStorage.setItem("users", JSON.stringify(users));
        let msg = des[index] + " נוסף בהצלחה ";
        $("#loginmsg").text(msg).css({"visibility":"visible" ,"color":"rgb(95, 224, 112)", "border-color": "rgb(95, 224, 112)"})
        showCart();
    }
}

function showCart()
{
    totalprice = 0;

    if (checkcoockies() == false)
    {
        $("#myProductsDiv").css({"visibility":"hidden"});
        $("#productsDiv").css({"visibility":"hidden"});
        let page = window.location.pathname;
        
        if (page.search("cart.html") != -1)
            $("#loginmsg").text("על מנת לצפות בעגלת הקניות יש להתחבר!").css({"visibility":"visible"});
    }
    else
    {
        $("#myProductsDiv").css("visibility","visible");
        $("#productsDiv").css("visibility","visible");

        
        users = JSON.parse(localStorage.getItem("users"));
        let user = users.find(x => x.name == sessionStorage.getItem("currentUser"));
        let create;
        $("#myProductsDiv").html(" ");
        let userItemsTable = "<table id='myProductsTable' class='w3-table-all'><tr><th>פריט</th><th>מחיר</th><th>תמונה</th><th>מחיקה</th></tr><tr><th colspan='4' class='w3-center' id='amont'></th></tr>";
    
        $("#myProductsDiv").append(userItemsTable);
    
        //create the row of our purchased item
        let i;
        for (i = 0 ; i < user.products.length; i++)
        {
            if(user.products[i] != null)
            {
            create = "<tr><td>"+ user.products[i][0] + "</td><td>" + user.products[i][1] + "</td><td class='mini-icones'>" + user.products[i][2] +"</td><td><a herf='#' onclick='removeItem("+i+")' class='w3-button w3-medium' style='background-color: inherit;'><i class='fa fa-minus-circle' aria-hidden='true'></i></a></td></tr>";
            $("#myProductsTable").append(create);
            totalprice += user.products[i][1];
            }

        }
        
        let endtable = "<tr><td colspan='4'><input type='button' onclick='showPay()'  value='בצע תשלום' class='w3-button w3-white w3-border w3-round w3-small w3-center'></tr></table>"
        $("#myProductsDiv").append(endtable);

        let amont = $("#amont");
        let amontmsg = 'מחיר כולל: ' + totalprice + ' ש"ח ';
        amont.html(amontmsg);

    }

}

