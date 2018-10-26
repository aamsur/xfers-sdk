import React, { Component } from 'react'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  SelectionButton,
  SearchBar
} from 'XfersComponents'

export default class BankTypeList extends Component {
  render() {
    const {
      filteredBankOptions,
      filter,
      updateForm,
      updateSearchFilter,

      // Stepper Fn:
      goNext,
      goBack,
    } = this.props;

    const onSelect = (bankAbbreviation) => {
      updateForm('bank', bankAbbreviation);
      goNext();
    }

    return (
      <StickyPanel showBrand>
        <ModalHeader onBack={goBack} spHeader title="Add Bank Account" />
        <View spBody>
          <Text type="panelTitle">Select bank name</Text>
          <SearchBar
            placeholder="Search bank name"
            value={filter}
            onChange={(e) => updateSearchFilter(e.target.value)}
          />
          <View background="#fff" overflow="auto" height="340px" padding="20px" boxShadow="inset 0px 1px 4px #ccc">
            { filteredBankOptions.length > 0 ?
              filteredBankOptions.map((bank, index) =>
                <SelectionButton
                  key={index}
                  image={bank.img_src}
                  title={`${bank.name} (${bank.abbreviation})`}
                  onClick={() => onSelect(bank.abbreviation)}
                  />
                )
              :
              <View>Banks Not Found</View>
            }
          </View>
        </View>
      </StickyPanel>
    )
  }
}
