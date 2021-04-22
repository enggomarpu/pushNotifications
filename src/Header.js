import React, { useState } from 'react';
import Pushy from 'pushy-sdk-web';


const Header = () => {
    const [count, setCount] = useState(0);
    // Handle push notifications (only when web page is open)
    
    return (
        <div>
            <h2>Notification{count}</h2>
            <h1>Hello</h1>
        </div>
    );
}
export default Header;