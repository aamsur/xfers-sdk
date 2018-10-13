import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Panel, FormTitle, ModalHeader, SectionContainer, SelectionButton, SearchBar } from 'XfersComponents'
import { updateBankAccountDetails, updateSearchFilter } from 'ManageBank/actions'
import { getFilteredBankOptions } from 'ManageBank/selectors'

function mapStateToProps({manageBank}, props) {
  const { bankOptions, filter } = manageBank;
  const filteredBankOptions = getFilteredBankOptions(manageBank);
  return { bankOptions: filteredBankOptions, filter };
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
      updateSearchFilter
    } = this.props;

    return (
      <Panel>
        <ModalHeader title="ADD BANK ACCOUNT" />
        <SectionContainer paddingBtm>
          <FormTitle>Select bank name</FormTitle>
          <SearchBar
            placeholder="Search bank name"
            value={filter}
            onChange={(e) => updateSearchFilter(e.target.value)}
          />
          <View>
            { bankOptions.length > 0 ?
              bankOptions.map((bank, index) =>
                <SelectionButton
                  key={index}
                  image={bank.img_src} title={`${bank.name} (${bank.abbreviation})`}
                  onClick={() => updateForm(bank.abbreviation)}
                  />
                )
              :
              <View>Banks Not Found</View>
            }
          </View>
        </SectionContainer>
      </Panel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTypeList)
