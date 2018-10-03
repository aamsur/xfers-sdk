import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './FileUploadBox.scss'

import { Button } from 'XfersBasicComponents'
import { TwoColsRowBar } from 'XfersLayoutComponents'
import { FaSpinner, FaCheckCircle } from 'react-icons/lib/fa'

class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: this.props.filename
    }
  }

  handleUpload = () => {
    this.refs.fileInput.click();
  }

  previewFileName = () => {
    const file = this.refs.fileInput.files[0];
    const reader = new FileReader();
    const onChange = this.props.onChange;

    if (!file) return;

    if( this.props.maxFileSize && file.size > this.props.maxFileSize * 1000){
      alert('File size too large');
      return
    }

    reader.onload = function (e) {
      const data = e.target.result;
      const fileName = file.name;
      this.setState({ fileName });
      if(onChange) onChange({fileData: data, fileName});
    }.bind(this);
    reader.readAsDataURL(file);
  }

  render() {
    const fileName = this.state.fileName;

    return (
      <div className={classes.fileUploadContainer}>
        <input type="file" ref="fileInput" onChange={this.previewFileName} style={{display: 'none'}} />

        {fileName ?
          <div>
            <TwoColsRowBar
              leftColProps={{
                content: (
                  <div>
                    <div className={cx(classes.iconholder)}>
                      {
                      this.props.dataUpLoading ?
                      <FaSpinner className={cx(classes.spin)}/> :
                        <FaCheckCircle className={classes.checkGreen} />
                      }
                    </div>
                    <span className={classes.fileNameLabel}>{fileName}</span>
                  </div>
                ),
                alignment: {xs: 'middle'}
              }}
              rightColProps={{
                content:(
                  <Button onClick={this.handleUpload} outline>
                    Replace File
                  </Button>
                )
              }}
            />
          </div>
          :
          <Button  onClick={this.handleUpload} outline>
            Upload File
          </Button>
        }
      </div>
    )
  }
}

FileUploadBox.propTypes = {
  fileName: PropTypes.string
}

FileUploadBox.defaultProps = {

}

export default FileUploadBox
