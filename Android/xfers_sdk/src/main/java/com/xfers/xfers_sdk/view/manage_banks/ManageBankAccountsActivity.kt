package com.xfers.xfers_sdk.view.manage_banks

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.view.manage_banks.add_bank_account.SelectBankToAddActivity
import com.xfers.xfers_sdk.view.manage_banks.delete_bank_account.DeleteBankAccountConfirmationActivity
import com.xfers.xfers_sdk.view.manage_banks.delete_bank_account.DeleteBankAccountConfirmationConstants
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.UserBankAccountsViewModel
import kotlinx.android.synthetic.main.activity_manage_bank_accounts.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class ManageBankAccountsActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manage_bank_accounts)

        title = getString(R.string.manage_bank_accounts_title)

        manageBankAccountsAddBankAccountTextView.text = getString(R.string.manage_bank_accounts_add_bank_account_copy)
        manageBankAccountsAddBankAccountTextView.setOnClickListener {
            startActivity(Intent(this, SelectBankToAddActivity::class.java))
        }

        xfersFullWidthButton.text = getString(R.string.add_bank_account_button_copy)
        xfersFullWidthButton.setOnClickListener {
            startActivity(Intent(this, SelectBankToAddActivity::class.java))
        }

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        manageBankAccountsXfersProgressBar.visibility = View.VISIBLE
        manageBankAccountsAddBankAccountTextView.visibility = View.GONE
        manageBankAccountsListViewConstraintLayout.visibility = View.GONE
        manageBankAccountsXfersButton.visibility = View.GONE

        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
            manageBankAccountsXfersProgressBar.visibility = View.GONE

            val hasBankAccounts = it.isNotEmpty()

            if (hasBankAccounts) {
                manageBankAccountsListViewConstraintLayout.visibility = View.VISIBLE
                manageBankAccountsAddBankAccountTextView.visibility = View.VISIBLE
            } else {
                manageBankAccountsXfersButton.visibility = View.VISIBLE
            }

            val selectionRowItems = it.map { userBankAccount ->
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${userBankAccount.bankAbbrev} ${userBankAccount.accountNo}",
                        onClick = {
                            Toast.makeText(this, "Bank account summary page feature coming soon", Toast.LENGTH_SHORT).show()
                        },
                        rightIcon = R.drawable.trash_23,
                        rightIconTint = R.color.negativeRed,
                        rightIconOnClick = {
                            startActivity(
                                    Intent(this, DeleteBankAccountConfirmationActivity::class.java).apply {
                                        this.putExtra(DeleteBankAccountConfirmationConstants.bankAbbreviationKey, userBankAccount.bankAbbrev)
                                        this.putExtra(DeleteBankAccountConfirmationConstants.bankAccountNumberKey, userBankAccount.accountNo)
                                        this.putExtra(DeleteBankAccountConfirmationConstants.bankIdKey, userBankAccount.id)
                                    }
                            )
                        }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })
    }
}
