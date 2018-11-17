package com.xfers.xfers_sdk.view.withdrawal

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_withdrawal_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_emphasis.*

class WithdrawalConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_confirmation)

        title = getString(R.string.withdrawal_title)

        // TODO: Integrate with extras information coming from chain of parent activities

        withdrawalConfirmationTitleTextView.text = getString(R.string.withdrawal_confirmation_page_title)

        val textRowItems = listOf(
                TextRowItem(
                        getString(R.string.withdrawal_confirmation_withdraw_from_copy),
                        getString(R.string.withdrawal_confirmation_withdraw_from_ipsum)
                ),
                TextRowItem(
                        getString(R.string.withdrawal_confirmation_to_bank_account_copy),
                        getString(R.string.withdrawal_confirmation_to_bank_account_ipsum)
                ),
                TextRowItem(
                        getString(R.string.withdrawal_confirmation_amount_copy),
                        getString(R.string.withdrawal_confirmation_amount_ipsum)
                ),
                TextRowItem(
                        getString(R.string.withdrawal_confirmation_processing_type_copy),
                        getString(R.string.withdrawal_confirmation_processing_type_ipsum)
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        summaryEmphasisTopTextView.text = getString(R.string.withdrawal_cofnirmation_emphasis_title)
        summaryEmphasisBottomTextView.text = getString(R.string.withdrawal_confirmation_number_ipsum)

        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        // TODO: Integrate with viewModel and API to fire to our withdrawal API
        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            XfersStatusCardService(this).presentWithdrawalProcessingStatusCard()
        }
    }
}
