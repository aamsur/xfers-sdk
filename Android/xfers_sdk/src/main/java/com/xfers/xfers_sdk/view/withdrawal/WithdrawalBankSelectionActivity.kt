package com.xfers.xfers_sdk.view.withdrawal

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.UserBankAccountsViewModel
import kotlinx.android.synthetic.main.activity_withdrawal_bank_selection.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class WithdrawalBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_bank_selection)

        title = getString(R.string.withdrawal_confirmation_title)

        withdrawalBankSelectionPageTitleTextView.text = "Withdraw To"

        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
            val selectionRowItems = it.map {
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${it.bankAbbreviation} ${it.bankAccountNumber}"
                )
            }

            // TODO: To give each row a click -> navigate to next page on click listener
            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })

        // TODO: Make clicking the button go to edit bank accounts page
        withdrawalBankSelectionEditBankAccountsTextView.text = getString(R.string.withdrawal_bank_selection_edit_banks_copy)

    }
}