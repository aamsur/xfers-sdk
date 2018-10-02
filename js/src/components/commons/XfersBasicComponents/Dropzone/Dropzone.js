import React from 'react'
import PropTypes from 'prop-types'
import ReactDropzone from 'react-dropzone'

import {AnchorLink, NewModal} from 'XfersBasicComponents'
import {FlexContainer, FlexItem} from 'XfersLayoutComponents'
import errorLogo from 'icons/Error_Logo.png'
import enlargeLogo from 'icons/white_icons/Search_White.png'
import pdfPreviewIcon from 'icons/Preview_PDF_Logo.png'
import cls from './Dropzone.scss'
import cx from 'classnames';

const componentPropTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
  imageFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      preview: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  maxFileNumber: PropTypes.number,
  maxFileSize: PropTypes.number,
  maxHeightWidth: PropTypes.number
}

const componentDefaultProps = {
  customClass: '',
  imageFiles: [],
  maxFileNumber: 1,
  maxFileSize: 3072000, // 3MB
  maxHeightWidth: 1920,
}

class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      files: props.imageFiles,
      showModal: false,
      showImg: "",
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const {maxFileNumber} = this.props;
    const {files: f} = this.state;
    const files = f.slice();

    if (files.length == maxFileNumber) {
      this.onDropRejected(rejectedFiles, `Please only upload a maximum of ${maxFileNumber} files.`);
      return;
    }

    if (rejectedFiles.length) {
      this.onDropRejected(rejectedFiles);
    }
    else if (acceptedFiles.length) {
      this.onDropAccepted(acceptedFiles, files);
    }
  }

  onDropAccepted = (acceptedFiles, existingFiles) => {
    const {onChange} = this.props;
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        file.dataUrl = reader.result;
        existingFiles.push({
          name: file.name,
          dataUrl: file.dataUrl,
          preview: file.preview,
        });
        this.setState({files: existingFiles, error: ""});
        if (onChange) onChange(existingFiles);
      }
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    });
  }

  onDropRejected = (rejectedFiles, customError="") => {
    const file = rejectedFiles[0];
    const {maxFileSize} = this.props;

    if (customError) {
      this.setState({error: customError});
      return;
    }

    if (!"image/jpeg, image/png, image/jpg, application/pdf".includes(file.type)) {
      this.setState({error: "File type is not supported, please only submit PNG, JPG or PDF"});
    }
    else if (file.size > maxFileSize) {
      this.setState({error: "File size is too large, please reduce the size to 3MB."});
    }
    else {
      this.setState({error: "Error uploading file! Please try a different file"});
    }
  }

  removeFile = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const {onChange} = this.props;
    let files = this.state.files.slice();
    window.URL.revokeObjectURL(files[index].preview);
    files.splice(index, 1);
    this.setState({files, error: ''});
    if (onChange) onChange(files);
  }

  enlargeImg = (e, isPdf, imgSrc) => {
    e.preventDefault();
    e.stopPropagation();

    if(isPdf){
       const tab =  window.open(imgSrc, '_blank');
       setTimeout(()=>{
         if(tab.closed)
          alert('Fail to open new tab, this may caused by Adblock. Please disable Adblock and try again');
       }, 500)
    }
    else
      this.setState({showModal: true, showImg: imgSrc});
  }

  closeModal = () => {
    this.setState({showModal: false, showImg: ''});
  }

  renderChildren = () => {
    const {files} = this.state;
    const {children, disabled} = this.props;
    if (files.length) return (<ImageBox files={files} removeFile={this.removeFile} disabled={disabled} enlargeImg={this.enlargeImg}/>);
    if (children) return (<div>children</div>);
    return (
      <div className={cls.defaultTextContainer}>
        { !disabled &&
          <span><strong>Drop files here</strong> <br/>or <AnchorLink>browse for files</AnchorLink></span>
        }
      </div>
    )
  }

  renderError = () => {
    const {error} = this.state;
    if (!error) return null;
    return (<div className={cls.errorTextContainer}><strong>{error}</strong></div>);
  }

  render() {
    const {files, showModal, showImg} = this.state;
    const {children, maxFileSize, customClass, name, disabled} = this.props;
    let dropzoneClass = cx([cls.dropzoneContainer], customClass);

    return (
      <div>
        <ReactDropzone
          accept="image/jpeg, image/png, image/jpg, application/pdf"
          maxSize={maxFileSize}
          className={dropzoneClass}
          activeClassName={cls.activeClass}
          rejectClassName={cls.rejectClass}
          disablePreview={false}
          onDrop={this.onDrop}
          name={name}
          disabled={disabled}
          >
          {this.renderChildren()}
          {this.renderError()}
        </ReactDropzone>
        <EnlargeModal showModal={showModal} closeModal={this.closeModal} imgSrc={showImg}/>
      </div>
    );
  }
}

function ImageBox({files, removeFile, disabled, enlargeImg}) {
  return (
    <FlexContainer>
      { files.map((file, index) => {
        const isPdf = /(\.pdf)$/i.test(file.name);
        const bgImgStyle = {backgroundImage: `url(${isPdf ? pdfPreviewIcon : file.preview})`}
        return (
          <FlexItem key={index} xSize={{xs: 4}}>
            <div className={cls.imageContainer} style={bgImgStyle} onClick={(e) => enlargeImg(e, isPdf, file.preview)}>
              { !disabled && <a className={cls.deleteImageBtn} onClick={(e) => removeFile(e, index)}><img src={errorLogo} /></a> }
              <div className={cls.enlargeOverlay}>
                <img src={enlargeLogo} />
                <div className={cls.fileName}>
                  <strong>{file.name}</strong>
                </div>
              </div>
            </div>
          </FlexItem>
        );
      })}
    </FlexContainer>
  );
}

function compressImage(dataUrl, imageType, limit=1920) {
  return new Promise((resolve, reject) => {
    try {
      let image = new Image();
      image.src = dataUrl;

      image.onload = function(){
        let [height, width] = getResizedDimensions(this.height, this.width, limit);
        let canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        let context = canvas.getContext('2d');
        context.drawImage(this, 0, 0, width, height);
        resolve(canvas.toDataURL(imageType));
      }
    }
    catch (e) {
      reject('Unable to compress');
    }
  })
}

function getResizedDimensions(height, width, limit) {
  if (height > width && height > limit) {
    return [limit, parseInt(limit * width / height)];
  }
  else if (width > limit) {
    return [parseInt(limit * height / width), limit];
  }
  return [height, width];
}

function EnlargeModal({showModal, closeModal, imgSrc}) {
  return (
    <NewModal
      customClass={cls.enlargeModal}
      showModal={showModal}
      closeModal={closeModal}
    ><img src={imgSrc} /></NewModal>
  )
}


Dropzone.propTypes = componentPropTypes;
Dropzone.defaultProps = componentDefaultProps;

export default Dropzone
