package com.xfers.xfers_sdk.view.withdrawal

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.view.manage_banks.ManageBankAccountsActivity
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.UserBankAccountsViewModel
import kotlinx.android.synthetic.main.activity_withdrawal_bank_selection.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class WithdrawalBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_bank_selection)

        title = getString(R.string.withdrawal_title)

        withdrawalBankSelectionPageTitleTextView.text = getString(R.string.withdrawal_bank_selection_page_title)

        // TODO: Integrate with API to give a proper list of bank accounts
        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
            val selectionRowItems = it.map {
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${it.bankAbbreviation} ${it.bankAccountNumber}"
                ) {
                    // TODO: Pass into child activity amount and bank chosen through intent extras
                    startActivity(Intent(this, WithdrawalConfirmationActivity::class.java))
                }
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })

        withdrawalBankSelectionEditBankAccountsTextView.text = getString(R.string.withdrawal_bank_selection_edit_banks_copy)
        withdrawalBankSelectionEditBankAccountsTextView.setOnClickListener {
            startActivity(Intent(this, ManageBankAccountsActivity::class.java))
        }
    }
}