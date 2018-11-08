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

        // TODO: To integrate with API through viewModel to get a real time representation of bank accounts
        val hasBankAccounts = true

        if (hasBankAccounts) {
            manageBankAccountsXfersButton.visibility = View.GONE

            val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
            model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
                val selectionRowItems = it.map {
                    SelectionRowItem(
                            R.drawable.bank_acc_28, R.color.black,
                            "${it.bankAbbreviation} ${it.bankAccountNumber}",
                            onClick = {
                                // TODO: When click on individual bank account, go into specific bank account page
                                Toast.makeText(this, "Coming soon", Toast.LENGTH_SHORT).show()
                            },
                            rightIcon = R.drawable.trash_23,
                            rightIconTint = R.color.negativeRed,
                            rightIconOnClick = {
                                // TODO: Pass in the account to be deleted through intent extras
                                startActivity(Intent(this, DeleteBankAccountConfirmationActivity::class.java))
                            }
                    )
                }

                listViewRecyclerView.layoutManager = LinearLayoutManager(this)
                val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
                listViewRecyclerView.adapter = adapter
            })

            manageBankAccountsAddBankAccountTextView.text = getString(R.string.manage_bank_accounts_add_bank_account_copy)
            manageBankAccountsAddBankAccountTextView.setOnClickListener {
                startActivity(Intent(this, SelectBankToAddActivity::class.java))
            }
        } else {
            manageBankAccountsListViewConstraintLayout.visibility = View.GONE

            xfersFullWidthButton.text = getString(R.string.add_bank_account_button_copy)
            xfersFullWidthButton.setOnClickListener {
                startActivity(Intent(this, SelectBankToAddActivity::class.java))
            }
        }
    }

    // TODO: Add -> When this screen is presented refetch the viewModel as things could have changed
}
