import logo from './logo.svg';
import './App.css';
import Pushy from 'pushy-sdk-web';

function App() {

  //const deviceToken = '379d424b0cf1fe9c81a3e4';

  Pushy.register({ appId: '607d3e9ebe50e00f1b8f55ab' }).then(function (deviceToken) {
    // Print device token to console
    console.log('Pushy device token: ' + deviceToken);

    // Send the token to your backend server via an HTTP GET request
    //fetch('https://localhost:3000/register/device?token=' + deviceToken);

    // Succeeded, optionally do something to alert the user
  }).catch(function (err) {
    // Handle registration errors
    console.error(err);
  });

  const data = {
    "title": "Test Notificationjjjjjjjjjjjjjjjjjjjjjj", // Notification title
    "url": "https://pushy.me/", // Opens when tapped
    "message": "Hello World!", // Notification body text
    "image": "https://example.com/image.png" // Optional image
}
  // Handle push notifications (only when web page is open)
  Pushy.setNotificationListener(function (data) {
    // Print notification payload data
    console.log('Received notification: ' + JSON.stringify(data));

    // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
    let message = data.message || 'Test notification';

    // Display an alert with message sent from 
    alert('Received notification: ' + message);
  });

  
  return (
    <div className="App">
      <h1>Hello World</h1>
     

    </div>
  );
}

export default App;
