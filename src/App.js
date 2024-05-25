import React from 'react';
import { useEffect } from 'react';
import {Amplify} from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Quiz from './Quiz';

Amplify.configure(awsExports); //include the AWS service configurations

function App() {

  useEffect(() => {
    document.title = "Stress Detector Quiz";
  }, []);

  return (
    <div className="App">
      <Authenticator>  
        {({ signOut }) => (
          <main>
            <header className='App-header'>
              {/* Quiz Component */}
              <Quiz />
              {/* Sign Out Button */}
              <button 
                onClick={signOut} 
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
        )}
      </Authenticator>
    </div>
  );
}



export default withAuthenticator(App);