import React from 'react'
import axios from 'axios';

const Demo = () => {

    const getData = () => {
        axios.get('http://universities.hipolabs.com/search?country=India')
            .then(res => {
                // console.log(typeof(res.data))
                const data = res.data;
                console.log(typeof(data))
                 data.map((ele)=>{
                    
                    console.log(ele.name,"  ", ele.web_pages,"  ", Object.values(ele)[3])
                })
                
            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <div>
                <button onClick={getData}>getData</button>
            </div>
        </>
    )
}

export default Demo;