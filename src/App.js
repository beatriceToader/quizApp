import React from 'react';
import { useEffect, useState } from 'react';
import {Amplify} from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Quiz from './Quiz';
import Results from './Results';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

Amplify.configure(awsExports); //include the AWS service configurations

function App() {
  const [resetQuizFlag, setResetQuizFlag] = useState(false);

  useEffect(() => {
    document.title = "Stress Detector Quiz";
  });

  const handleSignOut = (signOut) => {
    setResetQuizFlag(true); 
    signOut(); 
  };

  return (
    <div className="App">
      <Authenticator>  
        {({ signOut }) => (
          <Router>
            <main>
            <header className='App-header'>
                <Routes>
                  <Route path="/" element={<Quiz resetQuizFlag={resetQuizFlag} setResetQuizFlag={setResetQuizFlag}/>} />
                  {resetQuizFlag ? (
                   <Route path="/results" element={<Navigate to="/" />} />) :(
                    <Route path="/results" element={<Results />} />
                   )}
                  <Route path="*" element={<Navigate to="/" />} /> 
                </Routes>

                {/* Sign Out Button */}
                <button 
                  onClick={() => handleSignOut(signOut)} 
                  style={{ 
                    margin: '-1px', 
                    fontSize: '0.8rem', 
                    padding: '5px 10px',
                    borderRadius: '10px', 
                    marginTop: '25px',
                  }}
                >
                  Sign Out
                </button>
              </header>
            </main>  
          </Router>
        )}
      </Authenticator>
    </div>
  );
}



export default withAuthenticator(App);