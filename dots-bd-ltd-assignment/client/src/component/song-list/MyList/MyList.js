import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Nav from '../../layout/nav/Nav';
import EmptySongList from '../EmptySongList/EmptySongList';
import SongList from '../SongList/SongList';

//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const MyList = () => {
    const [message, setMessage] = useState();

    const history = useHistory();
    const [allData, setAllData] = useState([]);

    $(document).ready(function () {
        $('.example').DataTable();
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/')
            .then(res => {
                console.log(res);
                setAllData(res.data);
            })
            .catch(err => {
                console.log(err);
                setMessage(err);
            })
    }, [allData]);
    console.log(allData);
    console.log(allData.length);

    const getAllData = (data) => {
        setAllData(data);
    }

    return (
        <section id="my-list">
            <Nav />

            <div className="container">
                <div className="clearfix"></div>
                <div className="row">
                    <table className="example">
                        <thead>
                            <tr><th>Table</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {
                                        allData.length > 0 ? allData.map(data => { return (<SongList key={data._id} data={data} getAllData={getAllData} />) }) : <EmptySongList />
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default MyList;
