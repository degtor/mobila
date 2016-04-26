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
            comments: videos[n].comments,
            text: ''
        }
    },

    nextVideo: function() {
        videos[n]=this.state;
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
            comments: videos[n].comments,
            text: ''
        });
    },

    prevVideo: function() {
        //console.log(this.state);
        //console.log(videos[n]);
        videos[n]=this.state;
       /* videos[n]={
            this.state.title,
            this.state.video,
            this.state.rating,
            this.state.category,
            this.state.comments};
        */
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
            comments: videos[n].comments,
            text: ''
        });
    },
    allVideo: function () {
        console.log("Hej");
        if (pressed) {
            pressed = false;
        }else {
            pressed = true;
            <div>Hej</div>;
            ShowAllVideos;
        }
    },
    newComment: function (e) {
        e.preventDefault();
        if (this.state.text !== "") {
            var nextItems = this.state.comments.concat([this.state.text]);
            //console.log(nextItems);
            console.log(this.state.text);
            var nextText = '';
            this.setState({comments: nextItems, text: nextText}); 
        }
    },
    onChange: function (e) {
         this.setState({text: e.target.value});
         //console.log(e.target.value);
    },
    increaseRating: function(){
        //console.log(this.state.rating+=1);
        //console.log(this.state);
        this.setState({rating: this.state.rating+=1});
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
                <div>
                    <form onSubmit={this.newComment}>
                        <input id="commentInput" onChange={this.onChange} value={this.state.text}/>
                        <button id="commentButton">Comment</button>
                    </form>
                    <button onClick={this.increaseRating}>+</button>
                </div>
                <ViewComment comment={this.state}/>
            </div>
        );
    }
});

var ViewComment = React.createClass({
    render: function() {
        var rows = [];
        for (var i = 0; i < this.props.comment.comments.length; i++) {
            rows.push(<li>{this.props.comment.comments[i]}</li>);
        }
        return (
            <div> 
                <ul id="comments">{rows}</ul>
            </div>
        );
    }
    });
/*
var Comment = React.createClass({
    getInitialState: function() {

        return {items: videos[n].comments, text: ''};
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },
    render: function() {
        return (
            <div id="comments">
                <p>Comments</p>
                <Comments items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>Comment</button>
                </form>
            </div>
        );
    }
});
*/

// Child-child
var ViewVideo = React.createClass({
    render: function() {
        return (
            <div>
                <h2 id="videoTitle">{this.props.activeVideo.title}</h2>
                <a id="videoPlayer" href={this.props.activeVideo.video}><div id="video"><img id="thumbnail" src={this.props.activeVideo.thumbnail} alt="" /></div></a>
                <div id="videoInformation">
                    <div id="rating">
                        <span>Rating: {this.props.activeVideo.rating}</span>
                    </div>
                    <div id="category">
                        <span>Category: {this.props.activeVideo.category}</span>
                    </div>
                </div>              
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
/*
// Under konstruktion
var Comments = React.createClass({
    render: function() {
        var createItem = function(item) {
            return <li>{item}</li>;
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
});
*/
// DB
var videos = [{
        title: 'Winter Barn',
        url: 'https://m.youtube.com/watch?v=_xkn0ceDreo', //OBS KRÄVS SPECIELL EMBED URL /Den funkar inte på mobila eneheter, utan då försöker den tvinga en öppning av appen i stället
        rating: 3,
        thumbnail: 'http://img.youtube.com/vi/_xkn0ceDreo/0.jpg',
        category: 'Painting',
        comments: ['A winterbarn comment', 'fan händer nu']
    },
    {
        title: 'Sunset Oval',
        url: 'https://m.youtube.com/watch?v=9xG6IzcGotI',
        rating: 5,
        thumbnail: 'http://img.youtube.com/vi/9xG6IzcGotI/0.jpg',
        category: 'Painting',
        comments: ['A sunsetoval comment']
    },
    {
        title: 'Lakeside Path',
        url: 'https://m.youtube.com/watch?v=1yjGoJokbZg',
        rating: 2,
        thumbnail: 'http://img.youtube.com/vi/1yjGoJokbZg/0.jpg',
        category: 'Painting',
        comments: ['A lakesidepath comment']
    }
];

ReactDOM.render(<Main />, document.getElementById('root'));
