import React from 'react'
import {useState, useEffect} from 'react'
import { listScores }from './graphql/queries'
import { generateClient } from '@aws-amplify/api'
import { fetchUserAttributes } from 'aws-amplify/auth'
import './Results.css'


function Results() {
    const [email, setEmail] = useState('')
    const [userScores, setUserScores] = useState([])

    useEffect(()=>{

        async function getEmailFromUser() {
            try {
              const userAttributes = await fetchUserAttributes()
              setEmail(userAttributes?.email)
              console.log(email)
            } catch (error) {
              console.log(error)
            }
        }

        getEmailFromUser();
    })

    useEffect(()=>{
        async function getUserScores() {
            if(email){
                const client = generateClient();
                const result = await client.graphql({
                    query : listScores,
                    variables : {
                        filter : {
                            email: {eq:email},
                        },
                    }
                })

                setUserScores(result.data.listScores.items)

            }
        }
        getUserScores()
    }, [email])

    const printDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString(undefined, options);
    };

    return (
        <div>
            <h2>Previous Scores</h2>
            <div style={{ maxHeight: '606px', overflowY: 'auto' }}>
            {userScores.length > 0 ? (
                <table style={{ borderCollapse: 'collapse', width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Score</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userScores.map((score) => (
                            <tr key={score.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{score.email}</td>
                                <td style={{ border: '1px solid black', padding: '10px' }}>{score.score}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{printDate(score.time)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):(
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}

export default Results;