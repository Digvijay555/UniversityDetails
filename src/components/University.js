import React, { useState, useMemo, useEffect } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import './University.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios';

const University = () => {
    const [value, setValue] = useState('')
    const [country, setCountry] = useState('')
    const [collegeList, setCollegeList] = useState([{}])
    const [searchUniversity, setSearchUniversity] = useState();
    const [filterCollegeList, setfilterCollegeList] = useState([{}])
    const [isSearch, setSearch] = useState(false);
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        let val = value.label.split(" ")
        let name = ""

        val.map((ele, idx) => {
            if (idx < val.length - 1) {
                name = ele + "+" + name;
            }
            else {
                name += ele;
            }
        })

        setCountry(name)
        setValue(value)

    }

    const getUniversity = () => {
        axios.get(`http://universities.hipolabs.com/search?country=${country}`)
            .then(res => {
                // console.log(typeof(res.data))
                const data = res.data;
                setCollegeList(data)
                 setSearch(false)   

            }).catch(err => {
                console.log(err)
            })
    }


    const change = () => {
        setSearch(true);
        let filterData = collegeList.filter((ele) => {
            if (searchUniversity === ele.name) {

                return ele;
            }

        })
        setfilterCollegeList(filterData)

    }

    return (
        <>
            <div>
                <h1>University Details</h1>
            </div>
            <div className='dropdown'>
                <Select options={options} value={value} onChange={changeHandler} />
            </div>
            <div className='input'>
                <div>
                    <TextField id="outlined-basic" label="Search By Name" variant="outlined" onChange={(e) => {
                        setSearchUniversity(e.target.value)
                    }} />
                    <Button variant="contained" style={{ marginTop: "3%", marginLeft: "3px" }} onClick={change}>Search</Button>
                </div>
                <Button variant="contained" onClick={getUniversity}>Get University Details</Button>
            </div>


            {
                isSearch ? (<>

                    <div className='dropdown report'>
                        {
                            filterCollegeList.map((ele) => {
                                return (

                                    <div className='data'>
                                        <TextField id="filled-basic" variant="filled" value={ele.name} disabled={true} multiline={true}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                        />
                                        <Link href={ele.web_pages}>{ele.web_pages}</Link>
                                        <TextField id="filled-basic" variant="filled" disabled={true} value={Object.values(ele)[3] == null ? "Not Defined" : Object.values(ele)[3]}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                                        />
                                    </div>
                                )
                            })

                        }
                    </div>

                </>) : (<>
                    <div className='dropdown report'>
                        {
                            collegeList.map((ele) => {
                                return (

                                    <div className='data'>
                                        <TextField id="filled-basic" variant="filled" value={ele.name} disabled={true} multiline={true}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                        />
                                        <Link href={ele.web_pages}>{ele.web_pages}</Link>
                                        <TextField id="filled-basic" variant="filled" disabled={true} value={Object.values(ele)[3] == null ? "Not Defined" : Object.values(ele)[3]}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                                        />
                                    </div>
                                )
                            })

                        }
                    </div>


                </>)
            }








            {/* <div className='dropdown report'>
                {
                    collegeList.map((ele) => {
                        return (

                            <div className='data'>
                                <TextField id="filled-basic" variant="filled" value={ele.name} disabled={true} multiline={true}
                                    inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                />
                                <Link href={ele.web_pages}>{ele.web_pages}</Link>
                                <TextField id="filled-basic" variant="filled" value={Object.values(ele)[3] == null ? "Not Defined" : Object.values(ele)[3]}
                                    inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                                />
                            </div>
                        )
                    })

                }
            </div> */}





            {/* <div className='dropdown report'>
                {
                    filterCollegeList.map((ele) => {
                        return (

                            <div className='data'>
                                <TextField id="filled-basic" variant="filled" value={ele.name} disabled={true} multiline={true}
                                    inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                />
                                <Link href={ele.web_pages}>{ele.web_pages}</Link>
                                <TextField id="filled-basic" variant="filled" value={Object.values(ele)[3] == null ? "Not Defined" : Object.values(ele)[3]}
                                    inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                                />
                            </div>
                        )
                    })

                }
            </div> */}


        </>
    )
}

export default University;