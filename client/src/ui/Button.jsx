import React from 'react'
import './Button.scss'

function Button({ text,onclick }) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <button onClick={onclick}
        type="button"
        className="btn btn-outline-dark rounded-pill btn-custom"
      >
        {text}
      </button>
    </div>
  )
}

export default Button