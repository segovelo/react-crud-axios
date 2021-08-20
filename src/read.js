import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import useAxios from './useAxios';
import axios from 'axios';
import './read.css';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const { response, loading, error } =  useAxios({
        method: 'get',
        url: '/fakeData',
        //headers: JSON.stringify({ accept: '*/*' }),
        // body: JSON.stringify({
        //     firstName: 'Carlos',
        //     lastName: 'Fernandez',
        //     checkbox: false, 
        // }),
    });


    useEffect(() => {
        setAPIData(response);         
    }, [response])

    const setData = (data) => {
        console.log(data);
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }
    const onDelete = (id) => {
        axios.delete(`https://61004cc6bca46600171cf84a.mockapi.io/api-crud/v1/fakeData/${id}`)
            .then(() => {
                getData();
            })
    }
    const getData = () => {
        axios.get(`https://xxxxxxxxxxxxxxx.mockapi.io/api-crud/v1/fakeData`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }


    return (        
        <div className="main-read">            
            <h1 className='userH1'>Users</h1>
                {loading ? (
            <h1 className='userH1'>loading...</h1>
    ) : (
            <div>
                {error && 
                (<div>
                  < p>Error Message: {error.message}</p>
                </div>
                )}   
            <div className="div-table">
              <Table fixed unstackable>
                <Table.Header>
                    <Table.Row className="read-row">
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Link to='/index.html/update'>
                                    <Table.Cell> <Button className="button-update" onClick={() => setData(data)}>Update</Button></Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button className="button-delete" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <div className="nav-div">
                <Link to="/index.html"><Button className="nav-button" >New User</Button> </Link>
            </div>
        </div>
        </div>
        )}
        </div>  
     );
  }
