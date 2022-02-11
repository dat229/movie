import React, { useEffect, useState } from 'react'

import './detail.scss';

import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

const CastList = (props) => {
    
    const item = props.item;

    const [castList,setCastList] = useState([]);
    
    useEffect(()=>{
        const getCast = async()=>{
            const reponse = await tmdbApi.credits(props.category,props.id);
            setCastList(reponse.cast.slice(0,5));
        }

        getCast();
    },[])

    const imageItem = (imgae) => apiConfig.w500Image(imgae);

    return (
    <div className='cast-list'>
        {
            castList.map((item,i)=>(
                <div key={i} className='cast-list__item'>
                    <img src={`${imageItem(item.profile_path)}`} />
                    <h6>{item.name}</h6>
                </div>
            ))
        }
    </div>
  )
}

export default CastList