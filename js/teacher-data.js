$(document).ready(function(){

   var teacherHtml = '<section class="6u"><div class="box post profile"><a href="#" class="image left"><img src="#photourl#" alt="" /></a><div class="inner"><h3>#name#</h3><h4><span class="flag-label"><span class="flag-icon flag-icon-#countryflag#"></span> #nationality#</span></h4><p>#description#</p><hr /><h4>Message to students:</h4><p><i class="fa fa-quote-left"></i> <i>#message#</i> <i class="fa fa-quote-right"></i></p></div></div></section>';
    
    /*
   $.getJSON("http://spreadsheets.google.com/feeds/list/1EXy1-voVZ0rW0hV8mxyobIfW_YYv-I_NbyvyO-YzXCo/od6/public/values?alt=json", function(data) {
       displayteachers(data);
    }); 
    */
    
    $.ajax({
       type:        'GET',
       url:         "http://spreadsheets.google.com/feeds/list/1EXy1-voVZ0rW0hV8mxyobIfW_YYv-I_NbyvyO-YzXCo/od6/public/values?alt=json",  
       contentType: "application/json",
       dataType:    "jsonp",
       jsonp:       "callback",
       success:     function(data){ displayTeachers(data); console.log("YAY!");},
       error:       function(){console.log("NAY!");}
    });
    
    function displayTeachers(data)
    {
      $("#teachers").html('');
      var teacherCount = data.feed.entry.length;
      var teacherRow = ''; 
      for (teacherIndex = 0; teacherIndex  < teacherCount; teacherIndex++) {   
          
          if (data.feed.entry[teacherIndex]['gsx$show']['$t'] !== "Y") continue;
          
          var iseven = ((teacherIndex % 2) == 1); 
          
          var currentTeacherHtml = '';//teacherHtml;
          
          currentTeacherHtml = currentTeacherHtml.concat(teacherHtml);
          currentTeacherHtml = currentTeacherHtml.replace("#name#", data.feed.entry[teacherIndex]['gsx$name']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#position#", data.feed.entry[teacherIndex]['gsx$position']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#nationality#", data.feed.entry[teacherIndex]['gsx$nationality']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#countryflag#", data.feed.entry[teacherIndex]['gsx$countryflag']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#description#", data.feed.entry[teacherIndex]['gsx$description']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#message#", data.feed.entry[teacherIndex]['gsx$message']['$t']);
          currentTeacherHtml = currentTeacherHtml.replace("#photourl#", data.feed.entry[teacherIndex]['gsx$photourl']['$t']);
          
          teacherRow = teacherRow.concat(currentTeacherHtml); 
          
          if(iseven || teacherIndex == teacherCount - 1)
          {
              $("#teachers").append('<div class="row">' + teacherRow + '</div>');
              teacherRow = '';
          }
          
      }
    }
});