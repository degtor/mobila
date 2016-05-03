(function() {

  var chat = document.querySelector('#chat'),
    output = document.querySelector('#output'),
    input = document.querySelector('#input'),
    button = document.querySelector('#button'),
    avatar = document.querySelector('#avatar'),
    masterButton = document.querySelector('#MasterView'),
    test = document.querySelector('#test'),
    presence = document.querySelector('#presence');

  var channel = getLocation();
  var subChannel = channel;

  function getLocation() {
    if (navigator.geolocation) {
      var hehe = navigator.geolocation.watchPosition(showPosition);

    } else {
      test.innerHTML = "Geolocation is not supported by this browser.";}

    return hehe;
  }

  /*var o = {p: ''};*/
  
  function showPosition(position) {
    var direction = position.coords.heading;
    var dir = '';


    if (direction < 90) {
      dir = 'north';
      test.innerHTML = "Nu blev jag: " + dir + direction;
      var o = { p: dir };
    } else if (direction < 180) {
      dir = 'east';
      test.innerHTML = "Nu blev jag: " + dir + direction;
      var o = { p: dir };
    } else if (direction < 270) {
      dir = 'south';
      test.innerHTML = "Nu blev jag: " + dir + direction;
      var o = { p: dir };
    } else if (direction <= 360) {
      dir = 'west';
      test.innerHTML = "Nu blev jag: " + dir + direction;
      var o = { p: dir };
    }
    channel = dir;
    return dir;
  }
  function getDirection(degrees) {
    if (degrees < 90) {
      direction = 'north';
      test.innerHTML = "Nu blev jag: " + direction + degrees;
      var o = { p: direction };
    } else if (degrees < 180) {
      direction = 'east';
      test.innerHTML = "Nu blev jag: " + direction + degrees;
      var o = { p: direction };
    } else if (degrees < 270) {
      direction = 'south';
      test.innerHTML = "Nu blev jag: " + direction + degrees;
      var o = { p: direction };
    } else if (degrees <= 360) {
      direction = 'west';
      test.innerHTML = "Nu blev jag: " + direction + degrees;
      var o = { p: direction };
    }
    return direction;
  }

/*  o.watch('p', function(id, oldval, newval) {
      alert(id + oldval + newval);
    return newval;
  });*/

/*  var channel = test.addEventListener('change', function() {
    return getLocation();
  });*/

  var pressed = false;
  var tmp;

  // Assign a random avatar in random color
  avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

  var p = PUBNUB.init({
    subscribe_key: 'sub-c-9d3f64ec-0dff-11e6-bb6c-02ee2ddab7fe',
    publish_key: 'pub-c-0961bed5-2de7-4080-9a75-91a4c9312105'
  });
  console.log("Channel: " + channel);
  subscribe();

  p.bind('keyup', input, function(e) {
    (e.keyCode || e.charCode) === 13 && publish()
  });

  p.bind('click', button, publish);
  p.bind('click', MasterView, viewAll);

  function subscribe() {
    if (channel=== parseFloat(channel, 10)) {
      console.log("Channel was a number");
      channel = getDirection(channel);
      console.log("Chanel should now be: " + channel);
    } 
      console.log("Subscribing to: " + channel);
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
  }

  function reSub() {
    if (channel != subChannel) {
      p.unsubscribe({
        channel : channel,
        callback: function(m) {
          console.log(m);
          output.innerHTML ="";
        }
      });
      subChannel = channel;
      subscribe();
    } else {}
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
    } else{
      chat.innerHTML = document.querySelector('#chat');
      masterButton.innerHTML = 'MasterView';

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
    console.log("Skickar till " + channel);
    reSub();
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