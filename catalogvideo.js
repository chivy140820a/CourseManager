var listcourses =[];
var listvideos =[];
export function LoadListVideo(){
    fetch('http://localhost:3000/courses')
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
                Price:response[i].price,
                LastPrice:response[i].lastprice
            });
        }
        document.querySelector('#txtcontentlist').innerHTML = contentres;
    });
}
export function UpdateVideo(id,name,url,courseId){
    var urlrequest = "http://localhost:3000/videos"+'/'+parseInt(id);
    var obj ={
        name:name,
        url:url,
        courseId:courseId
    };
    fetch(urlrequest,{
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
     })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log("Thành công r nhé")
        })
}
export function DeleteVideo(id){
    var urlrequest = "http://localhost:3000/videos"+'/'+parseInt(id);
    fetch(urlrequest,{
        method: 'DELETE', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
     })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log("Thành công r nhé")
        })
}
export function AddVideo(name,url,courseId){
    var urlrequest = "http://localhost:3000/videos"
    var obj={
        name:name,
        url:url,
        courseId:courseId
    };
    fetch(urlrequest,{
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
     })
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            console.log("Thành công r nhé")
        })
}
export function UpdateChangeIdCourse(id,newid){
     listvideos.forEach(function(item){
         if(parseInt(item.id)==parseInt(id)){
             var obj ={
                 id:parseInt(item.id),
                 name:item.name,
                 url:item.url,
                 courseId: parseInt(newid)
             }
             var urlrequest = "http://localhost:3000/videos"+'/'+parseInt(item.id);
             fetch(urlrequest,{
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
             })
                .then(function(response){
                    return response.json();
                })
                .then(function(response){
                    console.log("Thành công r nhé")
                })
         }
          
     })
}
function LoadListCourse(){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listcourses = response;
    });
}
function LoadListVideos(){
    fetch('http://localhost:3000/videos')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        listvideos = response;
    });
}
LoadListVideos();
LoadListCourse();