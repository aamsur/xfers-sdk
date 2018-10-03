import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './MultipleFileUploadBoxes.scss'

import { Button } from 'XfersBasicComponents'
import { TwoColsRowBar } from 'XfersLayoutComponents'
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/lib/fa'
import { MdCancel } from 'react-icons/lib/md'

class MultipleFileUploadBoxes extends React.Component {
  constructor(props) {
    super(props);
  }

  onFileChange = (file, id, callback) => {
    const reader = new FileReader();

    if (!file) return;

    if( this.props.maxFileSize && file.size > this.props.maxFileSize * 1000){
      alert('File size too large');
      return
    }

    reader.onload = (e) => {
      const data = e.target.result;
      const fileName = file.name;

      if(this.props.uploadFile) {
        this.props.uploadFile({data: {fileData: data, fileName}, id});
      }
      if (callback) callback();
    }
    reader.readAsDataURL(file);
  }

  deleteEntry = (id) => {
    if (this.props.deleteFile) {
      this.props.deleteFile({id});
    }
  }

  render() {
    return (
      <div className={classes.multipleFileUploadBoxes} >
        {
          this.props.files.map((item, index) => {
            return (<FileUploadBoxes
              key={index}
              id={item.id}
              fileName={item.fileName ? item.fileName : null}
              onChange={this.onFileChange}
              deleteEntry={this.deleteEntry}
              uploading={item.uploading}
            />)
          })
        }
        {this.props.files.length !== this.props.maxFiles ? (<UploadButton
          onChange={this.onFileChange}
        />) : null}
      </div>
    )
  }
}

MultipleFileUploadBoxes.propTypes = {
  files: PropTypes.array,
  uploadFile: PropTypes.func,
  deleteFile: PropTypes.func,
  maxFileSize: PropTypes.number,
  maxFiles: PropTypes.number,
}

class FileUploadBoxes extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpload = () => {
    this.refs.fileInput.click();
  }

  uploadFile = () => {
    const file = this.refs.fileInput.files[0];
    if (this.props.onChange) {
      this.props.onChange(file, this.props.id);
    }
  }

  deleteSelf = () => {
    if (this.props.deleteEntry) this.props.deleteEntry(this.props.id)
  }

  render() {
    return (
      <div>
        <input type="file" ref="fileInput" onChange={this.uploadFile} style={{display: 'none'}} />
        <div>
          <TwoColsRowBar
            leftColProps={{
              content: (
                <div>
                  <div className={cx(classes.iconholder)}>
                    {
                      this.props.uploading ?
                        <FaSpinner className={cx(classes.spin)}/> : <FaCheckCircle className={classes.checkGreen} />
                    }
                  </div>
                  <span className={classes.fileNameLabel}>{this.props.fileName}</span>
                </div>
              ),
              alignment: {xs: 'middle'}
            }}
            rightColProps={{
              content:(
                <div>
                  <Button onClick={this.handleUpload} outline>
                    Replace File
                  </Button>
                  <div onClick={this.deleteSelf} className={cx(classes.cancelButton)}>
                    <MdCancel />
                  </div>
                </div>
              )
            }}
          />
        </div>
      </div>
    )
  }
}

FileUploadBoxes.propTypes = {
  fileName: PropTypes.string,
  onChange: PropTypes.func,
  index: PropTypes.number,
}

class UploadButton extends React.Component {
  handleUpload = () => {
    this.refs.fileInput.click();
  }

  addNewFile = () => {
    const file = this.refs.fileInput.files[0];
    this.props.onChange(file);
  }

  render() {
    return (
      <div>
        <input type="file" ref="fileInput" onChange={this.addNewFile} style={{display: 'none'}} />
        <Button className={classes.uploadButton} onClick={this.handleUpload} outline>
          Upload File
        </Button>
      </div>
    );
  }
}

export default MultipleFileUploadBoxes
