import React, { Component } from 'react'

import {
   View,
   StickyPanel,
   ModalHeader,
   FormInput,
   Button,
   AnchorLink,
   Text,
   FooterButtonGroup
} from 'XfersComponents'

export default class BankStatement extends Component {

  previewCover = (e) => {
    const file = this.refs.fileInput.files[0];
    const reader = new FileReader();
    const {maxFileSize, onChange, allowPdf} = this.props;

    const setFile = (data, fileName) => {
      this.props.updateForm('bankStatementFile', { fileData: data, fileName });
      this.props.goNext();
    };

    if (!file) return;

    reader.onload = function (e) {
      const data = e.target.result;
      const fileName = file.name;

      if (
        fileName.match(/png/i) == null &&
        fileName.match(/jpg/i) == null &&
        fileName.match(/jpeg/i) == null &&
        fileName.match(/pdf/i) == null
      ) {
        return alert('Only PNG or JPEG images and PDF documents are supported.');
      }

      if (file.size / 1000 > maxFileSize) {
        return alert('File size too large');
      }

      if (file.type.indexOf('image') < 0) {
        return setFile(data, fileName);
      }

      setFile(data, fileName);

    }.bind(this);
    reader.readAsDataURL(file);
  };

  proceedToUpload = () => {
    this.refs.fileInput.click()
  }

  render() {
    const {
      newBankAccountDetails: { bankStatementFile },
      goBack,
      goNext,
    } = this.props;

    return (
      <StickyPanel blueBg showBrand>
        <ModalHeader onBack={goBack} spHeader title="ADD BANK ACCOUNT" />
        <View spBody>
          <View><Text {...titleStyle}>Upload Bank Statement</Text></View>
          <View><Text {...textStyle}>To verify your bank account, please submit a recent bank statement issued within the past 3 months.</Text></View>
          <br/>
          <View borderBottom="1px solid #fff" marginBottom="20px"></View>
          <View>
            <Text {...textStyle} fontWeight="400" fontSize="16px" display="block">A Valid Bank Statement includes:</Text>
            <ol style={{paddingLeft: "15px", ...textStyle}}>
              <li>Bank Logo</li>
              <li>Statement of Account</li>
              <li>Date</li>
              <li>Name and Address</li>
              <li>Account Number</li>
              <li>Footer</li>
            </ol>
            <Text {...textStyle}>You may hide or blur out any optional information but cropping of document is not allowed.</Text>
          </View>
          <br/>
          <View>
            <AnchorLink style={{color: "#fff"}} href="https://xfershelp.zendesk.com/hc/en-us/articles/360002335071" target>Don't have a bank statement?</AnchorLink>
          </View>
          <input style={fileStyle} type="file" ref="fileInput" onChange={this.previewCover} />
        </View>
        <FooterButtonGroup spFooter>
          <Button type="secondary" onClick={this.proceedToUpload}>Proceed to upload</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}

const titleStyle = {
  color: "#fff",
  fontWeight: "500",
  fontSize: "18px",
  letterSpacing: "0.4px",
  textAlign: "center",
  display: "block",
  margin: "20px",
}

const textStyle = {
  color: "#fff",
  letterSpacing: "0.4px",
  fontWeight: "300",
  lineHeight: "24px",
  fontSize: "15px",
}

const fileStyle = {
  visibility: "collapse"
}
