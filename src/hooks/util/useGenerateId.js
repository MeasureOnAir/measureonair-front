import { useState, useEffect } from 'react';

const useGenerateId = () => {
  const [lastMarkerId, setLastMarkerId] = useState(0);

  useEffect(() => {
    return () => {
      setLastMarkerId(0);
    };
  }, []);

  const generateMarkerId = () => {
    setLastMarkerId(lastMarkerId + 1);
    return `M${lastMarkerId + 1}`;
  }

  return {generateMarkerId, setLastMarkerId}
}

export default useGenerateId
