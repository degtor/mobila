//Main, Parent
var Main = React.createClass({
    render: function() {
        return (
            <div>
                <Video />
            </div>
        );
    }
});

// Video counter
var n = 0;
var pressed = false;

// Child
var Video = React.createClass({
    getInitialState: function() {
        return {
            title: videos[n].title, //Kan nog optimeras för att slippa upprepning i next & prev-video-funktionerna.
            video: videos[n].url,
            rating: videos[n].rating,
            thumbnail: videos[n].thumbnail,
            category: videos[n].category,
            comments: videos[n].comments
        }
    },

    nextVideo: function() {
        if (n == videos.length - 1 ) {
            n = 0;
        } else {
            n++;
        }

        this.setState({
            video: videos[n].url,
            title: videos[n].title,
            rating: videos[n].rating,
            thumbnail: videos[n].thumbnail,
            category:videos[n].category,
            comments: videos[n].comments
        });
    },

    prevVideo: function() {
        if (n == 0 ) {
            n = videos.length - 1;
        } else {
            n--;
        }

        this.setState({
            video: videos[n].url,
            title: videos[n].title,
            rating: videos[n].rating,
            thumbnail: videos[n].thumbnail,
            category:videos[n].category,
            comments: videos[n].comments
        });
    },
    allVideo: function () {
        if (pressed) {
            pressed = false;
        }else {
            pressed = true;
            ShowAllVideos;
        }
    },
    render: function() {
        return (
            <div>
                <div id="nav">
                    <button onClick={this.prevVideo}>Previous</button>
                    <button onClink={this.allVideo}>All</button>
                    <button onClick={this.nextVideo}>Next</button>
                </div>

                <ViewVideo activeVideo={this.state} />
                <addComment activeVideo={this.state} />

            </div>
        );
    }
});

// Child-child
var ViewVideo = React.createClass({
    render: function() {
        return (
            <div>
                <h2 id="videoTitle">{this.props.activeVideo.title}</h2>
                <a id="videoPlayer" href={this.props.activeVideo.video}><div id="video"><img id="thumbnail" src={this.props.activeVideo.thumbnail} alt="" /></div></a>
                <div id="rating">
                    <span>Rating: {this.props.activeVideo.rating}</span>
                </div>
                <div id="category">
                    <span>Category: {this.props.activeVideo.category}</span>
                </div>
                <div id="comments">{this.props.activeVideo.comments}</div>
            </div>
        )
    }
});

var ShowAllVideos = React.createClass({
    if (pressed) {

    },
    render: function() {
        return (<div>HELLO</div>)
    }
});
// Under konstruktion
var addComment = React.createClass({
    render: function () {
        return (
            <div>
                <h2>HELLO</h2>
            </div>
        )
    }
});

// DB
var videos = [{
        title: 'Winter Barn',
        id: '_xkn0ceDreo',
        url: 'https://m.youtube.com/watch?v=_xkn0ceDreo', //OBS KRÄVS SPECIELL EMBED URL /Den funkar inte på mobila eneheter, utan då försöker den tvinga en öppning av appen i stället
        rating: '3',
        thumbnail: 'http://img.youtube.com/vi/_xkn0ceDreo/0.jpg',
        category: 'Painting',
        comments: ['A winterbarn comment', 'fan händer nu']
    },
    {
        title: 'Sunset Oval',
        id: '9xG6IzcGotI',
        url: 'https://m.youtube.com/watch?v=9xG6IzcGotI',
        rating: '5',
        thumbnail: 'http://img.youtube.com/vi/9xG6IzcGotI/0.jpg',
        category: '',
        comments: ['A sunsetoval comment']
    },
    {
        title: 'Lakeside Path',
        id: '1yjGoJokbZg',
        url: 'https://m.youtube.com/watch?v=1yjGoJokbZg',
        rating: '2',
        thumbnail: 'http://img.youtube.com/vi/1yjGoJokbZg/0.jpg',
        category: '',
        comments: ['A lakesidepath comment']
    }
];

ReactDOM.render(<Main />, document.getElementById('root'));
