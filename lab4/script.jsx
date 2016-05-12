// Where the sensor data is stored
var mSensorDataURL = 'http://backup.evothings.com:8082/output/';
var roomDataURL = 'http://smartspaces.r1.kth.se:8082/streams/';

var mSensors = [
    //{"key": "BQa4EqqbgxfMgpBQ8XwNhvP82Dj",
    //    "image": "https://evothings.com/demos/dome_pics/IMG_1758.JPG"},
    /*Konferansrum upp*/{"key": "J3Wgj9qegGFX4r9KlxxGfaeMXQB",
        "image": "https://evothings.com/demos/dome_pics/IMG_1759.JPG"},
    /*Konferansrum nere*/{"key": "lB6p49pzXdFGQjpLwzzOTWj10rd",
        "image": "https://evothings.com/demos/dome_pics/IMG_1762.JPG"}/*,
    {"key": "L4D98lO9ObtOdzx3PggKIaWmMGA",
        "image": "https://evothings.com/demos/dome_pics/IMG_1763.JPG"},
    {"key": "LAjQ9E8PBOiOdzx3PggKIaWmMGA",
        "image": "https://evothings.com/demos/dome_pics/IMG_1761.JPG"},
    {"key": "BkPNOapq2WSMgpVlNQQKFYXPBWr",
        "image": "https://evothings.com/demos/dome_pics/IMG_1760.JPG"}*/
];

var sensor = {};
var n = 0;
//Main, Parent
var Main = React.createClass({
    getInitialState: function () {
        return {
            key: mSensors[0].key,
            image: mSensors[0].image,
            pressure: 0,
            temp: 0,
            lum: 0,
            np: 0,
            pp: 0,
            occupied: "checking"
        };
    },

    componentDidMount: function () {
        this.getData(mSensors[0].key);
        this.checkOp(mSensors[0].key);
    },

    nextSensor: function () {
        mSensors[n] = this.state;
        if (n == mSensors.length - 1) {
            n = 0;
        } else {
            n++;
        }

        this.getData(mSensors[n].key);
        this.checkOp(mSensors[n].key);
        this.setState({
            key: mSensors[n].key,
            image: mSensors[n].image
        });
    },

    prevSensor: function () {
        mSensors[n] = this.state;
        if (n == 0) {
            n = mSensors.length - 1;
        } else {
            n--;
        }
        console.log("prev" + mSensors[n].key);

        this.getData(mSensors[n].key);
        this.checkOp(mSensors[n].key);
        this.setState({
            key: mSensors[n].key,
            image: mSensors[n].image
        });
    },

    getData: function() {
        var component = this;
        $.ajax({
            url: mSensorDataURL + component.state.key + ".json?gt[timestamp]=now- 1day",
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
                        console.log(response[0].timestamp)
                        //console.log(response[100].timestamp)
                        //console.log(response[300].timestamp)
                        console.log(response[response.length-1].timestamp)

                        component.setState({
                            pressure: response[0].p,
                            temp: response[0].t,
                            lum: response[0].l,
                            np: response[0].np,
                            pp: response[0].pp
                        });
                    }
                }
        });
    },

    checkOp: function() {
        var component = this;
        var totalMovment = 0;
        component.setState({
            occupied: "checking"
        });
        console.log("Hej");
        $.ajax({
            url: mSensorDataURL + component.state.key + ".json?gt[timestamp]=now- 1day",
            jsonp: "callback",
            cache: true,
            dataType: "jsonp",
            data:
            {
                page: 1
            },
            success: function(response)
                {
                    if (response && response[10])
                    {
                        for (var i = 0; i < 10; i++) {
                            totalMovment += parseInt(response[i].pp);
                            console.log(response[i].pp);
                        }
                        console.log("tot: " + totalMovment);
                        if (totalMovment > 10000) {
                           
                            console.log("occupied");
                            component.setState({
                                occupied: "occupied"
                            })
                        }else{
                            component.setState({
                                occupied: "empty"
                            })
                        }
                    }
                }
        });
        console.log("empty!");
    },
    render: function() {
        return (
            <div>
                <img width="300px" height="300px" src={this.state.image} />
                <button onClick={this.prevSensor}>Previous sensor</button>
                <button onClick={this.nextSensor}>Next sensor</button>
                <p>This room is {this.state.occupied}</p>
                <p>Pressure: {this.state.pressure}</p>
                <p>Temp: {this.state.temp}</p>
                <p>Lum: {this.state.lum}</p>
                <p>Key: {this.state.key}</p>
            </div>
        );
    }

});

ReactDOM.render(
    <Main />, 
    document.getElementById('root')
);
