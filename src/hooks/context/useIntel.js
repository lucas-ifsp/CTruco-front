import { useContext } from 'react';
import IntelContext from '../../contexts/IntelContext';

const useIntel = () => {
    return useContext(IntelContext)
}

export default useIntel
