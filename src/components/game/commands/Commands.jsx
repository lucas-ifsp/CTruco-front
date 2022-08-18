import usePoints from '../../../hooks/api/usePoints'
import './Commands.css'

const Commands = ({ raiseDisabled, raiseLabel, acceptDisabled, quitDisabled, quitLabel, handlePointsChange }) => {
    const decideTo = usePoints()
    
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
        </div>
    )
}
export default Commands
