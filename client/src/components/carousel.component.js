import React, {Component} from 'react';
import '../styles/carousel.scss';

export default class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            media: this.props.media.sort((a,b) => a.mimeType.includes("video") ? -1 : 1),
            selected: 0
        };
    }

    selectImage(index) {
        this.setState({selected:index});
    }

    render() {
        var {media,selected} = this.state;

        var focusedMedia;
        var rowAmt = Math.ceil(media.length / 4);
        if(media[selected].mimeType.includes("image")) {
            focusedMedia = <img src={media[selected].webContentLink} className="carousel-image" />
        }
        else if(media[selected].mimeType.includes("video")) {
            focusedMedia = 
            <iframe src={`https://drive.google.com/file/d/${media[selected].id}/preview`}></iframe>
        }

        var carouselThumbStyle = {
            gridTemplateRows: `repeat(${rowAmt}, 100%)`
        };

        return(
            <div>
                <div className="carousel-focused-wrapper">
                    <div className="carousel-focused">
                        {focusedMedia}
                    </div>
                </div>
                <div className="carousel-thumbs-wrapper">
                   <div className="carousel-thumbs" style={carouselThumbStyle}>
                    {
                        media.map((m,i) => {
                            var style = {
                                background: `url('${m.thumbnailLink}') center/contain no-repeat`
                            }
                            return(
                                <div className={"carousel-thumb-image"+(i==selected?" selected":"")} style={style} onClick={() => {this.selectImage(i);}}>
                                    {
                                        m.mimeType.includes("video")
                                        ?
                                        <p className="carousel-thumbs-descriptor">Video</p>
                                        :
                                        null
                                    }
                                </div>
                            );
                        })
                    }
                    </div> 
                </div>
            </div>
        );
    }
}