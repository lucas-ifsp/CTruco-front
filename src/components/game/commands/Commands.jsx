import './Commands.css'

const Commands = ({ raiseDisabled, raiseLabel, acceptDisabled, quitDisabled, quitLabel, handlePointsChange }) => {
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
                onClick={() => handlePointsChange(action['raise'])}
            >
                {`${raiseLabel}`}
            </button>
            <button
                type='button'
                className='btn btn-secondary'
                disabled={acceptDisabled}
                onClick={() => handlePointsChange(action['accept'])}
            >
                Aceitar
            </button>
            <button
                type='button'
                className='btn btn-secondary'
                disabled={quitDisabled}
                onClick={() => handlePointsChange(action['quit'])}
            >
                {`${quitLabel}`}
            </button>
        </div>
    )
}
export default Commands
