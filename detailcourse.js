var getid = JSON.parse(localStorage.getItem('courseDetail'));
var id = getid;
function RegisterEvent(){
    fetch('http://localhost:3000/courses')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var listcourse=response;
        var contenthtml ='';
        listcourse.forEach(function(item){
            var itemid = parseInt(item.id)
            if(parseInt(item.id)==id){
                 var html = document.querySelector('#templateshowVideocontent').innerHTML;
                 contenthtml = Mustache.render(html,{
                     Name:item.name,
                     Price:item.price,
                     LastPrice:item.lastprice
                 })
            }
           
        })
        document.querySelector('#txtdetail').innerHTML = contenthtml;
    });
   
}
RegisterEvent();