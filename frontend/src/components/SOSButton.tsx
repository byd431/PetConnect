import { useState } from 'react';
import './SOSButton.scss';

const SOSButton = () => {
  const [active, setActive] = useState(false);

  const handleSOS = () => {
    setActive(true);
    alert('🚨 EMERGENCY ALERT SENT! Calling nearest clinic...');
    setTimeout(() => setActive(false), 3000);
  };

  return (
    <button 
      className={`sos-button ${active ? 'active' : ''}`} 
      onClick={handleSOS}
      title="EMERGENCY CALL"
    >
      🆘
    </button>
  );
};

export default SOSButton;
