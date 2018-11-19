package com.xfers.xfers_sdk.view.withdrawal

import android.content.Intent
import android.os.Bundle
import android.view.View
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

        withdrawalBankSelectionEditBankAccountsTextView.text = getString(R.string.withdrawal_bank_selection_edit_banks_copy)
        withdrawalBankSelectionEditBankAccountsTextView.setOnClickListener {
            startActivity(Intent(this, ManageBankAccountsActivity::class.java))
        }

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        withdrawalBankSelectionXfersProgressBar.visibility = View.VISIBLE
        withdrawalBankSelectionPageTitleTextView.visibility = View.GONE
        withdrawalBankSelectionConstraintLayout.visibility = View.GONE

        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
            withdrawalBankSelectionXfersProgressBar.visibility = View.GONE
            withdrawalBankSelectionPageTitleTextView.visibility = View.VISIBLE
            withdrawalBankSelectionConstraintLayout.visibility = View.VISIBLE

            val selectionRowItems = it.map { userBankAccount ->
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${userBankAccount.bankAbbrev} ${userBankAccount.accountNo}",
                        {
                            startActivity(Intent(this, WithdrawalAmountActivity::class.java).apply {
                                this.putExtra(WithdrawalBankSelectionConstants.bankAbbreviationKey, userBankAccount.bankAbbrev)
                                this.putExtra(WithdrawalBankSelectionConstants.bankAccountNumberKey, userBankAccount.accountNo)
                                this.putExtra(WithdrawalBankSelectionConstants.bankIdKey, userBankAccount.id)
                            })
                        }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })
    }
}
