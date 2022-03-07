var listvideo =[];
function RegisterEvent(){

    var getviewall = document.querySelectorAll('.txtviewall');
    getviewall.forEach(function(item){
        item.onclick = function(){
             var id = parseInt(this.getAttribute('data-id'));
             localStorage.setItem('courseDetail',JSON.stringify(id));
             window.location="detailcourse.html";
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

    document.querySelector('#txtcheckall').onclick = function(){
        GetAllCheck();
    }
    var getall = document.querySelectorAll('.txtcheckcontent');
    getall.forEach(function(item){
        item.onclick = function(){
            LoadCheck();
        }
    })

    
}
function LoadCheck(){
    var dem =0;
    var getall = document.querySelectorAll('.txtcheckcontent');
    getall.forEach(function(item){
        if(item.checked==true){
            dem=dem+1;
        }
        
    })
    if(dem==getall.length){
        document.querySelector('#txtcheckall').checked=true;
    }
    else{
        document.querySelector('#txtcheckall').checked=false;
    }
}
function GetAllCheck(){
    var getall = document.querySelectorAll('.txtcheckcontent');
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

function LoadListVideo(){
    fetch('http://localhost:3000/videos')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listvideo  = response;
    });
}
function RemoveListClass(){
    var getall= document.querySelectorAll('.txtcontent');
    getall.forEach(function(item){
        if(item.classList.contains('txtalink')){
             item.classList.remove('txtalink');
        }
    })
}

function LoadData(){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var demo =response.length;
        var html = document.querySelector('#templatemylistcourse').innerHTML;
        var contentres ="";
        var listmycourse = JSON.parse(localStorage.getItem('buycourse'));
        
        for(var i=0;i<listmycourse.length;i++){
            for(var j=0;j<response.length;j++){
                var content = parseInt(listmycourse[i]);
                var content2 = parseInt(response[j].id)
                if(parseInt(listmycourse[i])==parseInt(response[j].id)){
                    contentres+=Mustache.render(html,{
                        Id:response[j].id,
                        Name:response[j].name,
                        Price:response[j].price,
                        LastPrice:response[j].lastprice
                    });
                }
            } 
        }
        document.querySelector('#txtmylistcourse').innerHTML = contentres;
        LoadListVideo();
        RegisterEvent();
    });
   
}
LoadData();