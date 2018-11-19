package com.xfers.xfers_sdk.view.withdrawal

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.model.response.WithdrawalRequestResponse
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import com.xfers.xfers_sdk.view_model.CreateWithdrawalViewModel
import kotlinx.android.synthetic.main.activity_withdrawal_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_emphasis.*
import java.math.BigInteger

class WithdrawalConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_confirmation)

        title = getString(R.string.withdrawal_title)

        val extras = this.intent.extras
        val bankAbbreviation = extras[WithdrawalConstants.bankAbbreviation] as String
        val bankAccountNumber = extras[WithdrawalConstants.bankAccountNumber] as String
        val bankId = extras[WithdrawalConstants.bankId] as Int
        val amount = extras[WithdrawalConstants.amount] as String

        withdrawalConfirmationXfersProgressBar.visibility = View.GONE
        withdrawalConfirmationTitleTextView.text = getString(R.string.withdrawal_confirmation_page_title)

        val textRowItems = when(XfersConfiguration.getCurrentCountry()) {
            Xfers.Country.SG -> listOf(
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_withdraw_from_copy),
                            // TODO: For SG need to really check what wallet, ipsum for now
                            getString(R.string.withdrawal_confirmation_withdraw_from_ipsum)
                    ),
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_to_bank_account_copy).toUpperCase(),
                            "$bankAbbreviation $bankAccountNumber"
                    ),
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_amount_copy).toUpperCase(),
                            "${XfersConfiguration.getCurrencyString()} $amount"
                    ),
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_processing_type_copy),
                            // TODO: If need to check what kind of processing, do check, now only normal processing so leave as ipsum
                            getString(R.string.withdrawal_confirmation_processing_type_ipsum)
                    )
            )
            Xfers.Country.ID -> listOf(
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_to_bank_account_copy).toUpperCase(),
                            "$bankAbbreviation $bankAccountNumber"
                    ),
                    TextRowItem(
                            getString(R.string.withdrawal_confirmation_amount_copy).toUpperCase(),
                            "${XfersConfiguration.getCurrencyString()} $amount"
                    )
            )
        }

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        summaryEmphasisTopTextView.text = getString(R.string.withdrawal_cofnirmation_emphasis_title)
        summaryEmphasisBottomTextView.text = getString(R.string.withdrawal_confirmation_emphasis_amount_copy, "${XfersConfiguration.getCurrencyString()} $amount")

        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            createWithdrawal(bankId, BigInteger(amount))
        }
    }

    override fun onResume() {
        super.onResume()
        withdrawalConfirmationXfersProgressBar.visibility = View.GONE
        withdrawalConfirmationTitleTextView.visibility = View.VISIBLE
        withdrawalConfirmationListView.visibility = View.VISIBLE
        withdrawalConfirmationSummaryEmphasis.visibility = View.VISIBLE
        withdrawalConfirmationDoubleButtons.visibility = View.VISIBLE
    }

    private fun createWithdrawal(bankId: Int, amount: BigInteger) {
        withdrawalConfirmationXfersProgressBar.visibility = View.VISIBLE
        withdrawalConfirmationTitleTextView.visibility = View.GONE
        withdrawalConfirmationListView.visibility = View.GONE
        withdrawalConfirmationSummaryEmphasis.visibility = View.GONE
        withdrawalConfirmationDoubleButtons.visibility = View.GONE

        val createWithdrawalViewModel = ViewModelProviders.of(this).get(CreateWithdrawalViewModel::class.java)
        createWithdrawalViewModel.submitWithdrawalRequest(bankId, amount).observe(this, Observer<WithdrawalRequestResponse> {
            XfersStatusCardService(this).presentWithdrawalProcessingStatusCard(amount, it.availableBalance)
        })
    }
}
