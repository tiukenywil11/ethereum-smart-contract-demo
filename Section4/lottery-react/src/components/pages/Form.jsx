import { useState } from 'react'

function Form() {

    const [ text, setText ] = useState('')

    const onChange = e => {
        setText(e.target.value);
    }

    return (
        <>
        <form>
            <h4> Want to try your luck? </h4>
            <div>
                <label> Amount of ether to enter </label>
                <input
                    type='text'
                    value={text}
                    onChange={onChange}
                />
            </div>
        </form>
        <button>Enter</button>
        </>
    )
}

export default Form