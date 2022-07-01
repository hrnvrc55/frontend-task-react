import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
    let params = useParams()
    const [detail, setDetail] = useState(null);
    useEffect(() => {
        axios.get(`/discovery/v2/events/${params.id}`).then(resp => {
            setDetail(resp.data)
        })
    },[params.id])
    return (
        <div className="container py-2">
            {detail && (
                <>
                    <h1>{detail.name}</h1>
                    {(detail.place?.city?.name && detail.place?.country?.name) && (
                        <p>{detail.place?.city?.name} / {detail.place?.country?.name}</p>
                    )}
                    <p>{detail.dates?.start?.localDate} {detail.dates?.start?.localTime}</p>
                    {detail.images && (
                        <div className="image-area">
                            {detail.images.filter(x => x.height > 100).map((item, idx) => (
                                <img src={item.url} className="img-thumbnail" />
                            ))}
                        </div>
                    )}
                    <p>{detail.description} <a href={detail.url} target="_blank"><strong>Daha fazla...</strong></a></p>
                </>
            )}
        </div>
    )
}

export default EventDetail