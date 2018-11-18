package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.manage_banks.ManageBanksConstants
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import com.xfers.xfers_sdk.view_model.AddBankAccountViewModel
import kotlinx.android.synthetic.main.activity_add_bank_account_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class AddBankAccountConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_bank_account_confirmation)

        title = getString(R.string.add_bank_account_title)

        addBankAccountConfirmationTitleTextView.text = getString(R.string.add_bank_account_confirmation_title)

        val extras = this.intent.extras
        val bankName = extras[ManageBanksConstants.bankAbbreviation] as String
        val bankUserName = extras[ManageBanksConstants.bankUserName] as String
        val bankAccountNumber = extras[ManageBanksConstants.bankAccountNumber] as String

        val textRowItems = listOf(
            TextRowItem(
                    getString(R.string.add_bank_account_confirmation_bank_name_to_copy),
                    bankName
            ),
            TextRowItem(
                    getString(R.string.add_bank_account_confirmation_holder_name_id_copy),
                    bankUserName
            ),
            TextRowItem(
                    getString(R.string.add_bank_account_confirmation_account_no_copy),
                    bankAccountNumber
            )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        val addBankAccountViewModel = ViewModelProviders.of(this).get(AddBankAccountViewModel::class.java)

        addBankAccountViewModel.userBankAccountSuccess.observe(this, Observer<UserBankAccount> {
            if (it != null) {
                XfersStatusCardService(this).presentAddBankAccountSuccessfulStatusCard()
            }
        })

        addBankAccountViewModel.userBankAccountFailure.observe(this, Observer<Boolean> {
            if (it) {
                XfersStatusCardService(this).presentAddBankAccountFailureStatusCard()
            }
        })

        xfersFullWidthButton.text = getString(R.string.submit_button_copy)

        addBankAccountConfirmationXfersProgressBar.visibility = View.GONE
        xfersFullWidthButton.setOnClickListener {
            addBankAccountConfirmationXfersProgressBar.visibility = View.VISIBLE
            addBankAccountConfirmationTitleTextView.visibility = View.GONE
            addBankAccountConfirmationListView.visibility = View.GONE
            addBankAccountConfirmationButtonView.visibility = View.GONE

            addBankAccountViewModel.addUserBankAccount(bankName, bankUserName, bankAccountNumber)
        }
    }
}
