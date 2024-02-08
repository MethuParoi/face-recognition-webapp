import React from 'react';

const ButtonPrimary = ({lable, onClick}) => {

  return (
    <div>
        <button className="button-primary" onClick={onClick}>{lable}</button>
    </div>
  )
}

export default ButtonPrimary;