package com.xfers.xfers_sdk.view.pay

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.Charge
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import com.xfers.xfers_sdk.view_model.CreateChargeViewModel
import com.xfers.xfers_sdk.view_model.UserDetailsViewModel
import kotlinx.android.synthetic.main.activity_payment_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_emphasis.*
import java.math.BigDecimal

class PaymentConfirmationActivity : AppCompatActivity() {

    private var newBalance = BigDecimal("0")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_confirmation)

        title = getString(R.string.payment_confirmation_title)

        paymentConfirmationTitleTextView.text = getString(R.string.payment_confirmation_page_title)
        paymentconfirmationCopyTextView.text = getString(R.string.payment_confirmation_copy)

        val extras = this.intent.extras

        val orderId = extras[PaymentConstants.orderId] as String
        val description = extras[PaymentConstants.description] as String
        val amount = extras[PaymentConstants.amount] as BigDecimal

        val textRowItems = mutableListOf(
                TextRowItem(
                        getString(R.string.payment_confirmation_payment_to_copy),
                        XfersConfiguration.getMerchantName()
                ),
                TextRowItem(
                        getString(R.string.payment_confirmation_order_id_copy),
                        orderId
                )
        )

        if (description.isNotEmpty()) {
            textRowItems.add(
                    TextRowItem(
                            getString(R.string.payment_confirmation_description_copy),
                            description
                    )
            )
        }

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        summaryEmphasisTopTextView.text = getString(R.string.payment_confirmation_emphasis_title)
        summaryEmphasisBottomTextView.text = getString(R.string.payment_confirmation_number, "${XfersConfiguration.getCurrencyString()} $amount")

        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        val createChargeViewModel = ViewModelProviders.of(this).get(CreateChargeViewModel::class.java)
        createChargeViewModel.createChargeSuccess.observe(this, Observer<Charge> {
            XfersStatusCardService(this).presentPaymentCompletedStatusCard(amount, newBalance)
        })

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            createChargeViewModel.createCharge(amount, orderId, description, "true")
        }

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        paymentConfirmationXfersProgressBar.visibility = View.VISIBLE
        paymentConfirmationTitleTextView.visibility = View.GONE
        paymentconfirmationCopyTextView.visibility = View.GONE
        paymentConfirmationListView.visibility = View.GONE
        paymentConfirmationSummaryEmphasis.visibility = View.GONE
        paymentConfirmationDoubleButtons.visibility = View.GONE

        val extras = this.intent.extras
        val amount = extras[PaymentConstants.amount] as BigDecimal

        val userDetailsViewModel = ViewModelProviders.of(this).get(UserDetailsViewModel::class.java)
        userDetailsViewModel.getUserDetails().observe(this, Observer<User> {
            it.availableBalance?.let {
                newBalance = BigDecimal(it) - amount

                if (BigDecimal(it) > amount) {
                    paymentConfirmationXfersProgressBar.visibility = View.GONE
                    paymentConfirmationTitleTextView.visibility = View.VISIBLE
                    paymentconfirmationCopyTextView.visibility = View.VISIBLE
                    paymentConfirmationListView.visibility = View.VISIBLE
                    paymentConfirmationSummaryEmphasis.visibility = View.VISIBLE
                    paymentConfirmationDoubleButtons.visibility = View.VISIBLE
                } else {
                    XfersStatusCardService(this).presentInsufficientFundsStatusCard(it)
                    finish()
                }
            }
        })
    }
}
