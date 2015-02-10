$(function(){


  var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);

  // var curl = $('#curl');

  var status = function(type,message){
    var close_button = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    $('#alerts').append("<div class='alert alert-" + type + "' role='alert'>" + message + close_button + "</div>");
    
  };

  ws.onopen = function(){
    status('success','Web socket is open');
  };

  ws.onclose = function(){
    status('danger','Web socket closed');
  }

  ws.onmessage = function(m){
    data = JSON.parse(m.data);

    if(data.type=='registered'){
      $('#hooks > #waiting').remove();
      var id = data.data.id
      var curl = "curl http://" + window.location.host + data.data.url + " --data \"foo=bar\"";
      $('#hooks').append("<tr><td>" + id + "</td><td>" + curl + "</td></tr>")
    }

    if(data.type=='hook'){
      message = JSON.stringify(data.data);
      $('#messages > #waiting').remove();
      $('#messages').append("<tr><td>" + data.id + "</td><td>" + message + "</td></tr>");
    }

    if(data.type=='error'){
      status('danger', data.message);
    }
    
  }

  $('#register').submit(function(e){
    e.preventDefault();
    message = {type:'register', id: $('#id').val()}
    console.log(JSON.stringify(message));
    ws.send(JSON.stringify(message));
  });


});