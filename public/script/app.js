$(function(){
  var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);


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
      var curl = "curl http://" + window.location.host + data.data.path + " --data \"foo=bar\"";
      var row = $("<tr><td class='id'></td><td class='curl'></td></tr>");
      $('td.id', row).text(id).html();
      $('td.curl', row).text(curl).html();

      $('#hooks').append(row)
    }

    if(data.type=='hook'){
      message = JSON.stringify(data.data);
      $('#messages > #waiting').remove();

      var row = $("<tr><td class='id'></td><td class='message'></td></tr>");
      
      $('td.id',row).text(data.id).html();
      $('td.message',row).text(message).html();
      
      $('#messages').append(row);
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