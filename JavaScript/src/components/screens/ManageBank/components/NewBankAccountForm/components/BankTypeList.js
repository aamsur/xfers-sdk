import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StickyPanel,
  View,
  Text,
  ModalHeader,
  SelectionButton,
  SearchBar
} from 'XfersComponents'

import { updateBankAccountDetails, updateSearchFilter } from 'ManageBank/actions'
import { getFilteredBankOptions } from 'ManageBank/selectors'

function mapStateToProps({manageBank}, props) {
  const { bankOptions, filter } = manageBank;
  const filteredBankOptions = getFilteredBankOptions(manageBank);
  return { bankOptions: filteredBankOptions, filter, ...props };
}

function mapDispatchToProps(dispatch) {
  return {
    updateForm: (v) => dispatch(updateBankAccountDetails("bank", v)),
    updateSearchFilter: (v) => dispatch(updateSearchFilter(v))
  }
}

class BankTypeList extends Component {
  render() {
    const {
      bankOptions,
      filter,
      updateForm,
      updateSearchFilter,

      // Stepper Fn:
      goNext,
      goBack,
    } = this.props;

    const onSelect = (bankAbbreviation) => {
      updateForm(bankAbbreviation);
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
            { bankOptions.length > 0 ?
              bankOptions.map((bank, index) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(BankTypeList)
