import {LoadListCourses} from "./catalogcourses.js"
import {AddCourse} from "./catalogcourses.js"
import {UpdateCourse} from "./catalogcourses.js"
import {DeleteCourse} from "./catalogcourses.js"
import {DeleteVideo} from "./catalogvideo.js"
var listcourse =[];
var listvideo = [];

function FindCourseById(id){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
         response.forEach(function(item){
             if(parseInt(item.id)==parseInt(id)){
                 document.querySelector('#txtnameupdatecourse').value= item.name;
                 document.querySelector('#txtpriceupdatecourse').value= item.price;
                 document.querySelector('#txtlastpriceupdatecourse').value= item.lastprice;
             }
         })
    });
}
function RegisterEvent(){
    var getviewall = document.querySelectorAll('.txtviewall');
    getviewall.forEach(function(item){
        item.onclick = function(){
             var id = parseInt(this.getAttribute('data-id'));
             localStorage.setItem('courseDetail',JSON.stringify(id));
             window.location="detailcourse.html";
        }
    })

    var getalldelete = document.querySelectorAll('.txtdeleteall');
    getalldelete.forEach(function(item){
         item.onclick = function(){
            var id = parseInt(item.getAttribute('data-id'));
             listvideo.forEach(function(item){
                if(parseInt(item.courseId)==parseInt(id)){
                    DeleteVideo(parseInt(item.id))
                }
             })
            DeleteCourse(id);
            window.location="indexcourse.html"
         }
        
         
    })

    document.querySelector('#txtupdatecoursecontent').onclick = function(){
       var id = document.querySelector('#txtupdatehiddenId').value;
       var name =   document.querySelector('#txtnameupdatecourse').value;
       var price = document.querySelector('#txtpriceupdatecourse').value;
       var lastprice = document.querySelector('#txtlastpriceupdatecourse').value;
       UpdateCourse(id,name,price,lastprice);
       $('#txtmodalupdatecourse').modal('hide');
       LoadData();
    }
    var getallupdate = document.querySelectorAll('.txtupdateall');
    getallupdate.forEach(function(item){
        
        item.onclick = function(){
            var idupdate = parseInt(item.getAttribute("data-id"));
            document.querySelector('#txtupdatehiddenId').value = idupdate;
            FindCourseById(idupdate);
            $('#txtmodalupdatecourse').modal('show');
        }
    })

    document.querySelector('#txtaddcourse').onclick = function(){
        $('#txtmodaladdcourse').modal('show');
    }


    document.querySelector('#txtcheckall').onclick = function(){
        LoadCheckAll();
    }
    var getallcheckbyid = document.querySelectorAll('.txtcheckcontent');
    getallcheckbyid.forEach(function(item){
        item.onchange = function(){
             CheckClick();
        }
    })
    document.querySelector('#txtbuycourse').onclick = function(){
        var responseid =[];
        var response = [];
        var getall = document.querySelectorAll('.txtcheckcontent');
        var mylistcourse = JSON.parse(localStorage.getItem('buycourse'));
        if(mylistcourse!=null){
            getall.forEach(function(item){
                if(item.checked==true){
                     response.push(item);
                }
            })
          
            var total =0;
            for(var i=0;i<mylistcourse.length;i++){
                for(var j=0;j<response.length;j++){
                    if(parseInt(mylistcourse[i])==parseInt(response[j].value)){
                        total = total+1;
                    }
                }
            }
            if(total>0){
                alert("Khóa học bị trùng vs khóa học đã mua")
            }
            else{
                var contentarr =[];
                contentarr= mylistcourse;
                getall.forEach(function(item){
                    if(item.checked==true){
                        contentarr.push(parseInt(item.value));
                    }
                })
                localStorage.setItem("buycourse",JSON.stringify(contentarr));
            }
        }
       
        else{
            getall.forEach(function(item){
                if(item.checked==true){
                     responseid.push(parseInt(item.value));
                }
            })
            localStorage.setItem("buycourse",JSON.stringify(responseid));
            window.location="Mycourse.html";
        }
      
       
    }
    
    var getalljoin = document.querySelectorAll('.txtjoinlistvideo');
    getalljoin.forEach(function(item){
        item.onclick = function(){
            var id = parseInt(item.getAttribute('data-id'));
            var getall = JSON.parse(localStorage.getItem('buycourse'))
            var total = 0;
             if(getall!=null){
                  getall.forEach(function(item){
                      if(parseInt(item)==id){
                          total = total+1;
                      }
                  })
                  if(total>0){
                      alert('Khóa học đã bị trùng')
                  }
                  else{
                      var coursecontent = getall;
                      coursecontent.push(parseInt(id));
                      localStorage.setItem('buycourse',JSON.stringify(coursecontent));
                  }
             }
             
             else{
                var contenttype = [];
                contenttype.push(parseInt(id));
                localStorage.setItem('buycourse',JSON.stringify(contenttype));
             }
        }
    })
    
    var getvideoofcourse = document.querySelectorAll('.txtlistvideoofvideo');
    getvideoofcourse.forEach(function(item){
        item.onclick =function(){
            var id = parseInt(item.getAttribute("data-id"));
            var content ="";
            var templatehtml = document.querySelector('#templateshowVideocontent').innerHTML;
            listvideo.forEach(function(jtem){
                var test  = parseInt(jtem.courseId);
                if(parseInt(jtem.courseId)==id){
                   content +=Mustache.render(templatehtml,{
                       Id:jtem.id,
                       Name:jtem.name
                   })
                }
            })
            document.querySelector('#txtlistvideocontent').innerHTML = content;
            GetVideoDetail();
            $('#txtmodalshowVideo').modal('show');
        }
    })
}

function GetVideoDetail(){
    var getall= document.querySelectorAll('.txtcontent');
    getall.forEach(function(item){
         item.onclick =function(){
            var id = parseInt(this.getAttribute('data-id'));
            listvideo.forEach(function(jtem){
                if(parseInt(jtem.id)==id){
                    var url = 'https://www.youtube.com/embed'+'/'+jtem.url;
                    document.querySelector('#txtshowVideoHere').setAttribute('src',url)
                }
            })
            RemoveListClass();
            this.classList.add('txtalink');
         }
    })
}

function RemoveListClass(){
    var getall= document.querySelectorAll('.txtcontent');
    getall.forEach(function(item){
        if(item.classList.contains('txtalink')){
             item.classList.remove('txtalink');
        }
    })
}


function CheckClick(){
    var dem =0;
    var getall = document.querySelectorAll('.txtcheckcontent');
    getall.forEach(function(item){
        if(item.checked==true){
            dem = dem+1;
        }
    })
    if(dem==getall.length){
        document.querySelector('#txtcheckall').checked=true;
    }
    else{
        document.querySelector('#txtcheckall').checked=false;
    }
}
function LoadCheckAll(){
    var getall = document.querySelectorAll('.txtcheckcontent');
    if(document.querySelector('#txtcheckall').checked==true){
        getall.forEach(function(item){
            item.checked =true;
        })
    }
    else{
        getall.forEach(function(item){
            item.checked=false;
        })
    }
}



function LoadData(){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listcourse = response;
        var demo =response.length;
        var html = document.querySelector('#templatecourse').innerHTML;
        var contentres ="";
        for(var i=0;i<response.length;i++){
                contentres+=Mustache.render(html,{
                Id:response[i].id,
                Name:response[i].name,
                Price:response[i].price,
                LastPrice:response[i].lastprice
            });
        }
        document.querySelector('#txtlistcourse').innerHTML = contentres;
        LoadListVideo();
        RegisterEvent();
    });
   
}
document.querySelector('#txtaddcoursecontent').onclick = function(){
    var name = document.querySelector('#txtnamecourse').value;
    var price = document.querySelector('#txtpricecourse').value;
    var lastprice = document.querySelector('#txtlastpricecourse').value;
    AddCourse(name,price,lastprice);
    $('#txtmodaladdcourse').modal('hide');
    window.location ="indexcourse.html"
}

function LoadListVideo(){
    fetch('http://localhost:3000/videos')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listvideo  = response;
    });
}
LoadData();
