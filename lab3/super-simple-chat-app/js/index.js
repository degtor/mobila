(function() {

  var geo = navigator.geolocation;
  //console.log(geo);

  var chat = document.querySelector('#chat')
    output = document.querySelector('#output'),
    input = document.querySelector('#input'),
    button = document.querySelector('#button'),
    avatar = document.querySelector('#avatar'),
    masterButton = document.querySelector('#MasterView'),
    test = document.querySelector('#test'),
    presence = document.querySelector('#presence');
  var channel = getLocation();
  var pressed = false;
  var tmp;
  console.log(channel);

  // Assign a random avatar in random color
  avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

  var p = PUBNUB.init({
    subscribe_key: 'sub-c-9d3f64ec-0dff-11e6-bb6c-02ee2ddab7fe',
    publish_key: 'pub-c-0961bed5-2de7-4080-9a75-91a4c9312105'
  });
  getLocation();
  p.subscribe({
    channel: channel,
    callback: function(m) {
      output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' + m.text.replace(/[<>]/ig, '') + '</span></p>' + output.innerHTML;
    },
    presence: function(m) {
      if (m.occupancy > 1) {
        presence.textContent = m.occupancy + ' people online';
      } else {
        presence.textContent = 'Nobody else is online';
      }
    }
  });

  p.bind('keyup', input, function(e) {
    (e.keyCode || e.charCode) === 13 && publish()
  });

  p.bind('click', button, publish);
  p.bind('click', MasterView, viewAll)
  function getDirection() {
    var index = (Math.random() * 4) >>> 0; 
    console.log(index);
    var directions = ["north", "south", "west", "east"];
    return directions[index];
  }
  function getLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.watchPosition(showPosition);
      //loc = 170;
      /*var dir = '';
      if (loc < 90) {
          dir = 'north';
          test.innerHTML = "Nu blev jag: " + dir;
        }else if (loc < 180) {
          dir = 'east';
          test.innerHTML = "Nu blev jag: " + dir;
        } else if (loc < 270) {
          dir = 'south';
          test.innerHTML = "Nu blev jag: " + dir;
        }else if (loc <= 360) {
          dir = 'west';
          test.innerHTML = "Nu blev jag: " + dir;
        }
      return dir;*/
    } else {
      test.innerHTML = "Geolocation is not supported by this browser.";}
  }
  //getLocation();

  function showPosition(position) {
    var direction = position.coords.heading;
    var dir = '';
      if (direction < 90) {
          dir = 'north';
          test.innerHTML = "Nu blev jag: " + dir;
        }else if (direction < 180) {
          dir = 'east';
          test.innerHTML = "Nu blev jag: " + dir;
        } else if (direction < 270) {
          dir = 'south';
          test.innerHTML = "Nu blev jag: " + dir;
        }else if (direction <= 360) {
          dir = 'west';
          test.innerHTML = "Nu blev jag: " + dir;
        }
      //return dir;
    channel = dir;
    //return direction;
  }

  function viewAll() {
    //Creates 4 divs that outputs for all our lovely channels
   if (pressed == false) {

      chat.innerHTML = '',
      masterButton.innerHTML = 'Chat',

      p.unsubscribe({
        channel : channel,
        callback: function(m) {
          console.log(m);
          output.innerHTML ="";
        }
        
      });
      p.subscribe({
        channel: ["north", "south", "west", "east"],
        callback: function(m) {
          console.log(m.channel);
          output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>'+ m.channel +': '+ m.text.replace(/[<>]/ig, '') + '</span></p>' + output.innerHTML;
        }
      })
      pressed = true;
    }else{
      chat = document.querySelector('#chat')
      masterButton.innerHTML = 'MasterView',

      p.unsubscribe({
        channel : ["north", "south", "west", "east"],
        callback: function(m) {
          console.log(m);
          output.innerHTML ="";
        }
      });
      p.subscribe({
        channel: channel,
        callback: function(m) {
          output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' + m.text.replace(/[<>]/ig, '') + '</span></p>' + output.innerHTML;
        },
        presence: function(m) {
          if (m.occupancy > 1) {
            presence.textContent = m.occupancy + ' people online';
          } else {
            presence.textContent = 'Nobody else is online';
          }
        }
      });
      pressed = false;
    }
  }
  function publish() {
    console.log(channel);
    p.publish({
      channel: channel,
      message: {
        avatar: avatar.className,
        text: input.value,
        channel: channel
      },
      x: (input.value = '')
    });
  }

})();