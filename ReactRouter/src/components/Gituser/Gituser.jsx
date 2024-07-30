import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Gituser()
{   
    const {username} = useParams();
    const [data, setData] = useState({});

    useEffect( () => {
        fetch(`https://api.github.com/users/pinkwoofie`)
        .then( (res) => res.json())
        .then( (res) => setData(res));

    }, [])

    return (
        <div className="w-[800px] h-[600px] bg-gray-400 ml-[450px]">
            <h1 className="text-center text-3xl m-[30px] ">{data.name}</h1>
            <h1 className="text-center text-3xl m-[30px]">Number of followers : {data.followers}</h1>
            <img src={data.avatar_url} className="w-[300px] h-[300px] ml-[270px]" alt={`${data.name}'s avatar`}></img>

        </div>
    )

}