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
            category:videos[n].category,
            comments: videos[n].comments
        });
    },

    render: function() {
        return (
            <div>
                <button onClick={this.prevVideo}>Previous</button>
                <ViewVideo activeVideo={this.state} />
                <button onClick={this.nextVideo}>Next</button>
            </div>
        );
    }
});

// Child-child
var ViewVideo = React.createClass({
    render: function() {
        return (
            <div>
                <h2>{this.props.activeVideo.title}</h2>
                <iframe width="420" height="315" src={this.props.activeVideo.video} frameBorder="0" allowFullScreen></iframe>
                <span>Rating: {this.props.activeVideo.rating}</span>
                <span>Category: {this.props.activeVideo.category}</span>
                <div id="comments">{this.props.activeVideo.comments}</div>
            </div>
        )
    }
});

// Under konstruktion
var addComment = React.createClass({
    render: function () {
        return (<div></div>)
    }
});

// DB
var videos = [{
        title: 'Winter Barn',
        url: 'https://www.youtube.com/embed/_xkn0ceDreo', //OBS KRÄVS SPECIELL EMBED URL
        rating: '3',
        thumbnail: '',
        category: 'Painting',
        comments: ['A winterbarn comment', 'fan händer nu']
    },
    {
        title: 'Sunset Oval',
        url: 'https://www.youtube.com/embed/9xG6IzcGotI',
        rating: '5',
        thumbnail: '',
        category: '',
        comments: ['A sunsetoval comment']
    },
    {
        title: 'Lakeside Path',
        url: 'https://www.youtube.com/embed/1yjGoJokbZg',
        rating: '2',
        thumbnail: '',
        category: '',
        comments: ['A lakesidepath comment']
    }
];

ReactDOM.render(<Main />, document.getElementById('root'));