import {Field} from 'redux-form'
import {
  Checkbox,
  Dropzone,
  FormInput,
  FormSelect,
  FormCountry,
  FormDateInput,
  FormInputGroup,
  FormNationality,
} from 'XfersComponents';
import {
  ImageUploadBox,
} from 'XfersAdvancedComponents'

const rfDate = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormDateInput
    {...input}
    {...props}
    value={input.value && new Date(input.value)}
    onChange={(date)=>{input.onChange(date && date.toISOString())}}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const rfCheck = ({input, meta, ...props}) => {
  return (<Checkbox
      {...input}
      {...props}
      checked={input.value}
      onChange={(e)=>{input.onChange(e.target.checked)}}
  />)
}

const rfInput = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormInput
    {...input}
    {...props}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const rfSelect = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormSelect
    {...input}
    {...props}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const rfCountry = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormCountry
    {...input}
    {...props}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const rfDropzone = ({input, meta, ...props}) => {
  return (<Dropzone
    {...input}
    {...props}
  />)
}

const rfInputGroup = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormInputGroup
    {...input}
    {...props}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const rfImageUploadBox = ({input, meta, inputRef, ...props}) => {
  return (<ImageUploadBox
    {...input}
    {...props}
    imageUrl={input.value.fileName ? input.value.fileData : ''}
    filename={input.value.fileName || ''}
    ref={inputRef}
  />)
}

const rfNationality = ({input, meta, ...props}) => {
  const {touched, active, error, submitFailed} = meta;
  return (<FormNationality
    {...input}
    {...props}
    errorMessage={!active && (touched || submitFailed) ? error : undefined}
  />)
}

const date = props => (<Field {...props} component={rfDate} />)
const check = props => (<Field {...props} component={rfCheck} />)
const input = props => (<Field {...props} component={rfInput} />)
const select = props => (<Field {...props} component={rfSelect} />)
const country = props => (<Field {...props} component={rfCountry} />)
const dropzone = props => (<Field {...props} component={rfDropzone}/>)
const inputGroup = props => (<Field {...props} component={rfInputGroup} />)
const imageUpload = props => (<Field {...props} component={rfImageUploadBox} />)
const nationality = props => (<Field {...props} component={rfNationality} />)

export default {
  date,
  check,
  input,
  select,
  country,
  dropzone,
  inputGroup,
  imageUpload,
  nationality,
}
