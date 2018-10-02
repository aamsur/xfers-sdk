import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import classes from './ImageUploadBox.scss'

import addImageIcon from './images/add_image_icon.png'
import trashIcon from './images/trash_icon.png'
import pdfPreviewIcon from 'icons/Preview_PDF_Logo.png'

class ImageUploadBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: this.props.imageUrl,
      fileName: this.props.filename
    }
  }

  componentWillReceiveProps(nextProps){
    const {imageUrl, filename} = nextProps;
    this.setState({imageUrl, fileName: filename });
  }

  previewCover = (e) => {
    const file = this.refs.fileInput.files[0];
    const reader = new FileReader();
    const {maxHeightWidth, maxFileSize, onChange, allowPdf} = this.props;

    const setFile = (data, fileName) => {
      this.setState({imageUrl: data, fileName});
      if (onChange) onChange({fileData: data, fileName});
    };

    if (!file) return;

    reader.onload = function (e) {
      const data = e.target.result;
      const fileName = file.name;

      if (fileName.match(/png/i) == null &&
        fileName.match(/jpg/i) == null &&
        fileName.match(/jpeg/i) == null) {
          let errorMsg = allowPdf ? 'Only PNG or JPEG images and PDF documents are supported.' :
                                    'Only PNG or JPEG images are supported.';
          if(fileName.match(/pdf/i) == null)
            return alert(errorMsg);
          if(!allowPdf && fileName.match(/pdf/i) != null)
            return alert(errorMsg)
      }

      if (file.size / 1000 > maxFileSize) {
        return alert('File size too large');
      }

      if (file.type.indexOf('image') < 0) {
        return setFile(data, fileName);
      }

      compressImage(data, file.type, maxHeightWidth)
        .then(compressedData => setFile(compressedData, fileName))
        .catch(() => setFile(data, fileName));

    }.bind(this);
    reader.readAsDataURL(file);
  };

  removeCover = (e) => {
    e.preventDefault
    e.stopPropagation();

    const fileInput = this.refs.fileInput;
    const onChange = this.props.onChange;
    try {
      fileInput.value = null;
    } catch(err) {}

    if (fileInput.value) {
      fileInput.parentNode.replaceChild(fileInput.cloneNode(true), fileInput);
    }

    this.setState({imageUrl: ''});
    if (onChange) onChange();
  }

  haveCoverFile = () => {
    if(this.refs.fileInput.files[0]) { return true }
    return;
  }

  getCoverFile = () => {
    return this.refs.fileInput.files[0];
  }

  render() {

    const fileName = this.state.fileName;
    const isPdf = fileName ? fileName.split('.').pop() === 'pdf' : false ;
    const cover = isPdf ? pdfPreviewIcon : this.state.imageUrl;
    const {customClass, maxFileSize, customContent, disabled, name, showRemove, showFileName, ...defaultContentProps} = this.props;
    const bgImgStyle = cover ? {backgroundImage: `url(${cover})`} : {}
    return (
      <div className={classes.imageUploaderWrapper}>
        <div className={cx(customClass, classes.imageUploadContainer)}
             style={bgImgStyle}>

          { !cover ?
            <div className={classes.horizontalCenter}>
              {customContent ? customContent : <DefaultContent {...defaultContentProps} />}
            </div>
            :
            <div>
              { showRemove && !disabled &&
                <a href="#" className={classes.deleteCoverBtn} onClick={this.removeCover}>
                  <img className={classes.controlIcon} src={trashIcon}/>
                </a>
              }
              { showFileName &&
                <span className={classes.coverFilenameBox}>{fileName}</span>
              }
            </div>
          }
          <input disabled={disabled} className={cx(classes.hiddenInput, {[classes.disabled]: disabled})} name={name} type="file" ref="fileInput" onChange={this.previewCover} />
        </div>
      </div>
    )
  }
}

function compressImage(dataUrl, imageType, limit=1920){
  return new Promise(function(resolve, reject) {
    try{
      let image = new Image();
      image.src = dataUrl;

      image.onload = function(){
        let [height, width] = getResizedDimensions(this.height,this.width, limit);
        let canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;
        let context = canvas.getContext('2d');
        context.drawImage(this, 0, 0, width, height);
        resolve(canvas.toDataURL(imageType));
      };
    }
    catch(e){
      reject('Unable to compress');
    }
  });
  function getResizedDimensions(height, width, limit) {
    if (height > width && height > limit) {
      return [limit, parseInt(limit * width / height)]
    }
    else if (width > limit) {
      return [parseInt(limit * height / width), limit]
    }
    return [height,width]
  }
}

const DefaultContent = ({isRequired, hideSizeGuide, optimalHeight, optimalWidth}) => {
  return (
    <div className={classes.imageboxInnerContent}>
      <img src={addImageIcon} alt="" />
      <span className={classes.copytextAddmore}>Add Photo</span>

      { !isRequired &&
        <span className={classes.copytextOptional}>Optional</span>
      }

      { !hideSizeGuide && optimalHeight && optimalWidth &&
        <span className={classes.copytextDimension}>Optimal Size: {optimalHeight}px X {optimalWidth}px</span>
      }
    </div>
  )
};

ImageUploadBox.propTypes = {
  customContent: PropTypes.node,
  customClass: PropTypes.string,
  imageUrl: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  maxFileSize: PropTypes.number,
  optimalHeight: PropTypes.number,
  optimalWidth: PropTypes.number,
  hideSizeGuide: PropTypes.bool,
  disabled: PropTypes.bool,
  allowPdf: PropTypes.bool,
  showRemove: PropTypes.bool,
  showFileName: PropTypes.bool,
}

ImageUploadBox.defaultProps = {
  customClass: '',
  isRequired: false,
  maxFileSize: 3072,
  maxHeightWidth: 1920,
  optimalHeight: 1280,
  optimalWidth: 720,
  hideSizeGuide: false,
  disabled: false,
  allowPdf: true,
  showRemove: true,
  showFileName: true,
};

export default ImageUploadBox
