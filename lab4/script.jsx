var DataCard = React.createClass({
    getInitialState: function () {
        return {};
    },

    componentDidMount: function() {
      var component = this;
        $.ajax({
            url: mSensorDataURL + this.props.roomdata + ".json?gt[timestamp]=now- 1day",
            jsonp: "callback",
            cache: true,
            dataType: "jsonp",
            data:
            {
                page: 1
            },
            success: function(response)
            {
                if (response && response[0])
                {
                    component.setState(response[0]);
                }
            }
        });
    },

    render: function () {
       return (
           <div>
               <p>Humidity: {this.state.h}</p>
               <p>Temperature: {this.state.t}</p>
           </div>
       )
   }
});

// Where the sensor data is stored
var mSensorDataURL = 'http://backup.evothings.com:8082/output/';
var roomDataURL = 'http://smartspaces.r1.kth.se:8082/streams/';

var mSensors = {
    1: {"key": "BQa4EqqbgxfMgpBQ8XwNhvP82Dj",
        "image": "https://evothings.com/demos/dome_pics/IMG_1758.JPG"},
    2: {"key": "J3Wgj9qegGFX4r9KlxxGfaeMXQB",
        "image": "https://evothings.com/demos/dome_pics/IMG_1759.JPG"},
    3: {"key": "lB6p49pzXdFGQjpLwzzOTWj10rd",
        "image": "https://evothings.com/demos/dome_pics/IMG_1762.JPG"},
    4: {"key": "L4D98lO9ObtOdzx3PggKIaWmMGA",
        "image": "https://evothings.com/demos/dome_pics/IMG_1763.JPG"},
    5: {"key": "LAjQ9E8PBOiOdzx3PggKIaWmMGA",
        "image": "https://evothings.com/demos/dome_pics/IMG_1761.JPG"},
    6: {"key": "BkPNOapq2WSMgpVlNQQKFYXPBWr",
        "image": "https://evothings.com/demos/dome_pics/IMG_1760.JPG"}
};

//Main, Parent
var Main = React.createClass({
    render: function() {
        return (
            <div>
                <DataCard roomdata="BQa4EqqbgxfMgpBQ8XwNhvP82Dj" />
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));
