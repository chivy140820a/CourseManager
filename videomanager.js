import {UpdateChangeIdCourse} from './catalogvideo.js'
import {DeleteVideo} from './catalogvideo.js'
import {AddVideo} from './catalogvideo.js'
import {UpdateVideo} from './catalogvideo.js'
var listcourse = [];
function RegisterEvent(){
    
    document.querySelector('#txtcheckall').onclick = function(){
        CheckAllContent();
    }
    var getallcheckcontent = document.querySelectorAll('.txtcheckcontent');
    getallcheckcontent.forEach(function(item){
        item.onclick = function(){
            LoadCheckClick();
        }
    })

    var getalldelete = document.querySelectorAll('.txtdeleteall');
    getalldelete.forEach(function(item){
        item.onclick  = function(){
            var id = parseInt(item.getAttribute("data-id"));
            DeleteVideo(id);
            LoadListCourse();
        }
    })
    
    var getallupdate = document.querySelectorAll('.txtupdateall');
    getallupdate.forEach(function(item){
        item.onclick = function(){
            var idvideo = parseInt(item.getAttribute("data-id"));
            document.querySelector('#txthdId').value = idvideo;
            LoadListCourseByVideoUpdate();
            FindVideoById(idvideo);
            $('#txtmodalupdateVideo').modal('show');
        }
    })

    $('body').on('change','.txtselectcontent',function(){
         var idcourse = $(this).val();
         var idvideo = $(this).attr('data-id');
         UpdateChangeIdCourse(idvideo,idcourse);
         LoadData();
    })
    // document.querySelector('#txtchange').change(function(){
    //     alert(this.value);
    // })
    // $('.txtselectcontent').change(function(){
    //     var id = parseInt($(this).attr("data-id"));
    //     var newidcourse = parseInt($(this).val());
    //     UpdateChangeIdCourse(id,newidcourse);
    // })
    // var listchangecourse  = document.querySelectorAll('.txtselectcontent');
    // listchangecourse.forEach(function(item){
    //       this.onchange(function(){
    //          var id = parseInt(item.getAttribute("data-id"));
    //          var newidcourse = parseInt(item.value);
    //          UpdateChangeIdCourse(id,newidcourse);
    //     })
    // })
}

function LoadCheckClick(){
    var getall =  document.querySelectorAll('.txtcheckcontent');
    var total= 0;
    getall.forEach(function(item){
        if(item.checked==true){
            total = total+1;
        }
        
    })
    if(total==getall.length){
        document.querySelector('#txtcheckall').checked=true;
    }
    else{
        document.querySelector('#txtcheckall').checked=false;
    }
}

function CheckAllContent(){
    var getall =  document.querySelectorAll('.txtcheckcontent');
    if(document.querySelector('#txtcheckall').checked==true){
        getall.forEach(function(item){
            item.checked = true;
        })
    }
    else{
        getall.forEach(function(item){
            item.checked = false;
        })
    }
   
}

document.querySelector('#txtdeleteallchoose').onclick = function(){
    var getall = document.querySelectorAll('.txtcheckcontent');
    var total =0;
    getall.forEach(function(item){
        if(item.checked==true){
            total = total+1;
        }
    })
    if(total>0){
        getall.forEach(function(item){
             if(item.checked==true){
                var id = parseInt(item.value);
                DeleteVideo(id)
                
             }
        })
        window.location ="video.html"
    }
    else{
        alert("Bạn phải chọn sản phẩm muốn xóa")
    }
    
}

function LoadListCourseByVideoUpdate(){
    var content="";
    listcourse.forEach(function(item){
        content+='<option value="'+item.id+'">"'+item.name+'"</option>'
    })
    document.querySelector('#txtcorseIdupdate').innerHTML = content;
}

function FindVideoById(id){
    fetch('http://localhost:3000/videos')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        response.forEach(function(item){
            if(item.id==id){
                document.querySelector('#txtnameVideoupdate').value =item.name;
                document.querySelector('#txturlVideoupdate').value =item.url;
                document.querySelector('#txtcorseIdupdate').value = item.courseId;
            }
        })
    });
}


document.querySelector('#txtupdateVideo').onclick = function(){
    var id = document.querySelector('#txthdId').value;
    var name = document.querySelector('#txtnameVideoupdate').value;
    var url = document.querySelector('#txturlVideoupdate').value;
    var courseId = document.querySelector('#txtcorseIdupdate').value;
    UpdateVideo(id,name,url,courseId);
    $('#txtmodalupdateVideo').modal('hide')
    
}
document.querySelector('#txtaddVideo').onclick = function(){
    var content = "";
    listcourse.forEach(function(item){
        content+= '<option value="'+item.id+'">'+item.name+'</option>'
    })
    document.querySelector('#txtcorseId').innerHTML = content;
    $('#txtmodaladdVideo').modal('show')
}
document.querySelector('#txtadd').onclick = function(){
    var name = document.querySelector('#txtnameVideo').value;
    var url = document.querySelector('#txturlVideo').value;
    var courseid = document.querySelector('#txtcorseId').value;
    AddVideo(name,url,courseid);
    $('#txtmodaladdVideo').modal('hide')
    LoadData();
}
function LoadData(){
    fetch('http://localhost:3000/videos')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var demo =response.length;
        var html = document.querySelector('#templatevideo').innerHTML;
        var contentres ="";
        for(var i=0;i<response.length;i++){
                contentres+=Mustache.render(html,{
                Id:response[i].id,
                Name:response[i].name,
                Url:response[i].price,
                CourseId:LoadCourseById(response[i].courseId,response[i].id)
            });
        }
        document.querySelector('#txtlistvideo').innerHTML = contentres;
        RegisterEvent();
    });
}

function LoadCourseById(id,idvideo){
    var htmlcontent = "<select class='txtselectcontent' data-id='"+idvideo+"'>";
    for(var i=0;i<listcourse.length;i++){
        if(listcourse[i].id==id){
              htmlcontent+="<option id='"+listcourse[i].id+"' value='"+listcourse[i].id+"'>'"+listcourse[i].name+"'</option>"
        }
    }
    for(var i=0;i<listcourse.length;i++){
        if(listcourse[i].id!=id){
              htmlcontent+="<option id='"+listcourse[i].id+"' value='"+listcourse[i].id+"'>'"+listcourse[i].name+"'</option>"
        }
    }
    return htmlcontent;

}
function LoadListCourse(){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listcourse = response;
        LoadData();
    });
}
LoadListCourse();
