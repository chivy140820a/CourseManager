export function LoadListCourses(){

    
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
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
    });
}
export function AddCourse(name,price,lastpirce){
    var urlrequest = "http://localhost:3000/courses"
    var obj={
        name:name,
        price:parseInt(price),
        lastprice:parseInt(lastpirce),
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
export function UpdateCourse(id,name,price,lastpirce){
    var urlrequest = "http://localhost:3000/courses"+"/"+parseInt(id);
    var obj={
        id:parseInt(id),
        name:name,
        price:parseInt(price),
        lastprice:parseInt(lastpirce),
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
export function DeleteCourse(id){
    var urlrequest = "http://localhost:3000/courses"+"/"+parseInt(id);

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