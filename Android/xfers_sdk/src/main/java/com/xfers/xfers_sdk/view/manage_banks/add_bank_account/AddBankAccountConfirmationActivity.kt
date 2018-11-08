package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersStatusCardService
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

        // TODO: Build text row items based on information received from preceeding activities
        val textRowItems = listOf(
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_bank_name_to_copy),
                getString(R.string.add_bank_account_confirmation_bank_name_to_ipsum_copy)
            ),
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_holder_name_id_copy),
                getString(R.string.add_bank_account_confirmation_holder_name_id_ipsum_copy)
            ),
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_account_no_copy),
                getString(R.string.add_bank_account_confirmation_account_no_ipsum_copy)
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
