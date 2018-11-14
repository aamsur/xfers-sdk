import React, { Component } from 'react'
import {
  StickyPanel,
  ModalHeader,
  View,
  FooterButtonGroup,
  Button,
  Text,
  TwoColsRowBar,
} from 'XfersComponents'
import documentIcon from 'icons/Document_50.png'

export default class VerificationIndex extends Component {
  render() {
    const {
      closeModal,
      goNext,
    } = this.props;

    return (
      <StickyPanel showBrand>
        <ModalHeader spHeader onClose={closeModal} title="Identity Verification">
          <Text spHeader>Please prepare the following documents</Text>
        </ModalHeader>
        <View spBody>
          <View marginTop="40px">
            <TwoColsRowBar
              leftColProps={{
                size: { sm: 3, md: 2 },
                content: <img src={documentIcon} />
              }}
              rightColProps={{
                content: (
                  <View>
                    <Text type="label">Step 1</Text>
                    <Text type="boldValue">Submit a front and back color image of your NRIC</Text>
                  </View>
                )
              }}
            />
            <TwoColsRowBar
              leftColProps={{
                size: { sm: 3, md: 2 },
                content: <img src={documentIcon} />
              }}
              rightColProps={{
                content: (
                  <View>
                    <Text type="label">Step 2</Text>
                    <Text type="boldValue">Submit proof of address</Text>
                    <View margin="8px 0"><Text fontWeight="500">Acceptable proof of address documents include:</Text></View>

                      <ol style={{paddingLeft: "15px"}}>
                        <li>Bank Statement</li>
                        <li>Utilities Bill</li>
                        <li>Government-issued letter</li>
                      </ol>
                      <View><Text>Please ensure document was issued within the last 3 months.</Text></View>
                  </View>
                )
              }}
            />
          </View>
        </View>
        <FooterButtonGroup spFooter>
          <Button type="primary" onClick={goNext}>Proceed</Button>
        </FooterButtonGroup>
      </StickyPanel>
    )
  }
}
