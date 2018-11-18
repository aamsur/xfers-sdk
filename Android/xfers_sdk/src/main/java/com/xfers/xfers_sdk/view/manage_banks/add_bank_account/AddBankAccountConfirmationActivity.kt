package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.manage_banks.ManageBanksConstants
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_add_bank_account_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class AddBankAccountConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_bank_account_confirmation)

        title = getString(R.string.add_bank_account_title)

        addBankAccountConfirmationTitleTextView.text = getString(R.string.add_bank_account_confirmation_title)

        // TODO: Add view model to this activity

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

        // FIXME: This should be observed on the viewModel level
        val addBankSuccessful = true

        // TODO: Set on click on button to add bank account API through view model
        xfersFullWidthButton.text = getString(R.string.submit_button_copy)
        if (addBankSuccessful) {
            xfersFullWidthButton.setOnClickListener {
                XfersStatusCardService(this).presentAddBankAccountSuccessfulStatusCard()
            }
        } else {
            xfersFullWidthButton.setOnClickListener {
                XfersStatusCardService(this).presentAddBankAccountFailureStatusCard()
            }
        }
    }
}
