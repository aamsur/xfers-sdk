import React from 'react'
import {FormSelect} from 'XfersBasicComponents'

import countries_options from 'XfersBasicComponents/FormCountry/countries.js'

function FormCountry({
  onChange,
  value='',
  placeholder='Select Country',
  name='country',
    ...args
}){
  return(
    <FormSelect
      name={name}
      onChange={onChange}
      options={countries_options}
      placeholder={placeholder}
      value={value}
      {...args}
    />
  )
}

export default FormCountry
