import { useEffect, useState } from 'react';
import { API } from '../components/API';

const axios = require('axios')

const TestConnectivity = () => {
    const [response, setResponse] = useState('')

    useEffect(() => {
       retrieveBackEndResponse().then(resp => {
           setResponse(resp)
           console.log('Data', resp)
       })
      }, []
    );

    const retrieveBackEndResponse = async() => {
        try {
            const resp = await axios.get(`${API}/test`);
            console.log(resp);
            return resp
        } catch (err) {
            // Handle Error Here
            console.error(err);
            return "Something failed"
        }
    }

    return(
        <div>
            <p>This page is used to test connectivity with back-end</p>
            <br></br>
            <p>{JSON.stringify(response)}</p>
        </div>
    )

}

export default TestConnectivity