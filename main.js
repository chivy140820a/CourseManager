// function GetProducts(){
//     return new Promise(function(resolve,reject){
//          resolve("oke anh em nhe")
//     })
// }
// GetProducts()
//     .then(function(item){
//         console.log(item)
//     })

// import * as demo from "./demo.js"
import demo from "./constants/constant.js"




function RegisterEvent(){
    
    document.querySelector('#txtlistcourse').onclick = function(){
        window.location="indexcourse.html";
    }
    document.querySelector('#txtlistvideo').onclick = function(){
        window.location="video.html";
    }
    document.querySelector('#txtmylistcourse').onclick = function(){
        window.location="Mycourse.html";
    }

    var lista = document.querySelectorAll('.txta');
    lista.forEach(function(item){
        item.onclick = function(e){
            e.preventDefault();
            RemoveList();
            this.classList.add("txtcontent");
        }
})
function RemoveList(){
    var lista = document.querySelectorAll('.txta');
    lista.forEach(function(item){
        if(item.classList.contains("txtcontent")){
            item.classList.remove("txtcontent");
        }
    })
}



document.querySelector('#txtcheckall').onclick = function(){
     CheckAll();
}

var getallcontent = document.querySelectorAll('.txtcheckcontent');
getallcontent.forEach(function(item){
     item.onchange =function(){
        CheckAllContent();
     }
})

function CheckAll(){
    var getallcheck = document.querySelectorAll('.txtcheckcontent');
    if(document.querySelector('#txtcheckall').checked==true){
        getallcheck.forEach(function(item){
            item.checked = true;
       })
    }
    else{
        getallcheck.forEach(function(item){
            item.checked = false;
       })
    }
  
}
function CheckAllContent(){
    var getallcheck = document.querySelectorAll('.txtcheckcontent');
    var dem=0;
    getallcheck.forEach(function(item){
         if(item.checked==true){
             dem=dem+1;
         }
    })
    if(dem==getallcheck.length){
        document.querySelector('#txtcheckall').checked=true;
    }else{
        document.querySelector('#txtcheckall').checked=false;
    }
    
}
document.querySelector('#txtclick').onclick = function(){
     var response = [];
     var getall  = document.querySelectorAll('.txtcheckcontent');
     getall.forEach(function(item){
         if(item.checked==true){
              response.push(item.value);
         }
     })
    alert(response)
}




  document.querySelector('#signup').onclick = function(e){
    e.preventDefault();
    const name = this.elements['name'];
    const email = this.elements['email'];
    let fullName = name.value;
    let emailAddress = email.value;
    console.log(fullName);
    console.log(emailAddress);
  }



}
function LoadData(){
    RegisterEvent();
}
LoadData();
