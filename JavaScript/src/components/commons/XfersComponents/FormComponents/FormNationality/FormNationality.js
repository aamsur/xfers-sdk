import React from 'react'
import {FormSelect} from 'XfersComponents'

import nationality from './nationalities.json'

const nationality_options = nationality.map(v => ({value: v, label: v}));

function FormNationality({
  onChange,
  value='',
  placeholder='',
  name='nationality',
  ...args
}){
  return(
    <FormSelect
      name={name}
      onChange={onChange}
      options={nationality_options}
      placeholder={placeholder}
      value={value}
      {...args}
    />
  )
}

export default FormNationality
