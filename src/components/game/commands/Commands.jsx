import useDecidePoints from '../../../hooks/api/useDecidePoints'
import useDeleteGame from '../../../hooks/api/useDeleteGame'
import { useNavigate } from 'react-router-dom'
import './Commands.css'

const Commands = ({ raiseDisabled, raiseLabel, acceptDisabled, quitDisabled, quitLabel }) => {
    const decideTo = useDecidePoints()
    const deleteConcludedGame = useDeleteGame()
    const navigate = useNavigate();

    const action = {
        raise: 'raised-points',
        accept: 'accepted-bet',
        quit: 'quit-hand',
    }

    return (
        <div className='commands'>
            <button
                type='button'
                className='btn btn-secondary'
                disabled={raiseDisabled}
                onClick={() => decideTo(action['raise'])}
            >
                {`${raiseLabel}`}
            </button>
            <button
                type='button'
                className='btn btn-secondary'
                disabled={acceptDisabled}
                onClick={() => decideTo(action['accept'])}
            >
                Aceitar
            </button>
            <button
                type='button'
                className='btn btn-secondary'
                disabled={quitDisabled}
                onClick={() => decideTo(action['quit'])}
            >
                {`${quitLabel}`}
            </button>
            <button
                type='button'
                className='btn btn-danger'
                onClick={() =>{ 
                    deleteConcludedGame()
                    navigate("/")
                }}
            >
                Abandonar
            </button>
        </div>
    )
}
export default Commands
