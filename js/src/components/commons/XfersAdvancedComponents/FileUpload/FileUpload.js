import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import _ from 'lodash';

import classes from './FileUpload.scss'

const XfersPropTypes = {
  file: PropTypes.object, // {data: dataurl, name: filename}
  onChange: PropTypes.func,
  maxFileSize: PropTypes.number,
};

const XfersDefaultProps = {
  onChange: () => {},
  maxFileSize: 3072,
};

class FileUpload extends React.Component {
  onDrop(files) {
		const {onChange} = this.props;

    const file = files[0];
    const reader = new FileReader();

    if( this.props.maxFileSize && file.size > this.props.maxFileSize * 1000){
      alert('Image file size too large');
      return
    }

    reader.onload = function (e) {
      this.setState({ file });
      if(onChange) onChange({data: e.target.result, name: file.name});
    }.bind(this);

    reader.readAsDataURL(file);
  }

  render() {
    const {file} = this.props;

    const uploadBtnText = file ? 'Replace File' : 'Upload';

    let fileNameComponent = '';
    if (file) {
      fileNameComponent = (<a>{_.truncate( file.name, {length: 25} )}</a>);
    }

    return (
      <Dropzone className={classes.fileInput} onDrop={this.onDrop.bind(this)}>
        {fileNameComponent}
        <label>{uploadBtnText}</label>
      </Dropzone>
    )
  }
}

FileUpload.propTypes = XfersPropTypes;
FileUpload.defaultProps = XfersDefaultProps;

export default FileUpload;
