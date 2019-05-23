$(document).ready(function () {

    $.ajax({
        'url': 'http://10.3.50.56:3015/getData',
        'method': 'POST',
        'data': {
            'uuid': localStorage.getItem('uuid')
        }
    }).done(function(data){
        console.log(JSON.parse(data));
        
        console.log(typeof JSON.parse(data));
        
        var obj = JSON.parse(data);
        console.log(obj['uuid']);
        console.log(obj['storyboards']['n']);
//        displayStoryboardInfo(storyboards);
    });
    
    
function displayStoryboardInfo(storyboards){
    storyboards.forEach(function(){
        
    });
}
});
