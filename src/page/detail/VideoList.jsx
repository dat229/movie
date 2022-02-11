import React, { useEffect, useRef, useState } from 'react'
import tmdbApi from '../../api/tmdbApi';

import './detail.scss';

const VideoList = (props) => {

    const[videos,setVideos] = useState([]);

    useEffect(()=>{
        const getViedeos = async() =>{
            const videoList = await tmdbApi.getVideos(props.category, props.id);
            console.log(videoList.results.slice(0,5));
            setVideos(videoList.results.slice(0,5));
        }

        getViedeos();
    },[])

  return (
    <div className='video-list mb-3'>
        {
            videos.map((item,i) =>(
                <Video item={item} key={i} />
            ))
        }
    </div>
  )
}

export default VideoList;

const Video = props =>{
    const item =props.item;
    const iframe = useRef(null);

    useEffect(()=>{
        const width = iframe.current.offsetWidth;
        const height = width/16*9;
        iframe.current.setAttribute('height',height+'px');
    },[])

    return (
        <iframe
            ref={iframe}
            src={`https://www.youtube.com/embed/${item.key}`}
            title='Youtube video player'
            width='100%'
        ></iframe>
    )
}