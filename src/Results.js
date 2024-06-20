import React from 'react'
import {useState, useEffect} from 'react'
import { listScores }from './graphql/queries'
import { generateClient } from '@aws-amplify/api'
import { fetchUserAttributes } from 'aws-amplify/auth'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement} from 'chart.js'

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);


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
                let allScores = [];
                let nextToken = null;

                do {
                    const result = await client.graphql({
                        query: listScores,
                        variables: {
                            filter: {
                                email: { eq: email },
                            },
                            limit: 7,
                            sortDirection: 'DESC',
                            nextToken: nextToken,
                        }
                    });

                    allScores = allScores.concat(result.data.listScores.items);
                    nextToken = result.data.listScores.nextToken;
                } while (allScores.length < 7 && nextToken);

                const last7Scores = allScores.slice(-7);

                setUserScores(last7Scores);
            }
        }
        getUserScores()
    }, [email])

    const printDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString(undefined, options);
    };

    const formattedDates = userScores.map(score => printDate(score.time));
    const scoresData = userScores.map(score => score.score);
    console.log(scoresData)

    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                    callback: function(value, index, values) {
                        if ([0, 1, 2].includes(value)) {
                            return value;
                        } else {
                            return '';
                        }
                    }
                }
            }
        }
    }
    
    const barData = {
        labels: formattedDates,
        datasets: [
            {
                label: 'Previous Scores', 
                data: scoresData,
                backgroundColor: scoresData.map(score => {
                    if (score === 0) {
                        return 'rgba(37, 255, 0, 0.8)'
                    } else if (score === 1) {
                        return 'rgba(255, 250, 0, 0.8)'
                    } else if (score === 2) {
                        return 'rgba(255, 0, 0, 0.8)'
                    } else {
                        return 'rgba(54, 162, 235, 0.2)' 
                    }
                }),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    }

    return (
        <div>
            <div>
            {userScores.length > 0 ? (
                <Bar options={options} data={barData} style={{ height: '400px', width: '600px' }}/>
            ):(
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}

export default Results;