package com.xfers.xfers_sdk.view.pay

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.Charge
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import com.xfers.xfers_sdk.view_model.CreateChargeViewModel
import kotlinx.android.synthetic.main.activity_payment_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_emphasis.*
import java.math.BigInteger

class PaymentConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_confirmation)

        title = getString(R.string.payment_confirmation_title)

        paymentConfirmationTitleTextView.text = getString(R.string.payment_confirmation_page_title)
        paymentconfirmationCopyTextView.text = getString(R.string.payment_confirmation_copy)

        val extras = this.intent.extras
        // FIXME: Add null checks if those are empty or not
        val orderId = extras[PaymentConstants.orderId] as String
        val description = extras[PaymentConstants.description] as String
        val amount = extras[PaymentConstants.amount] as String
        var amount_bigint = BigInteger(amount)

        val textRowItems = listOf(
                TextRowItem(
                        getString(R.string.payment_confirmation_payment_to_copy),
                        XfersConfiguration.getMerchantName()
                ),
                TextRowItem(
                        getString(R.string.payment_confirmation_order_id_copy),
                        orderId
                ),
                TextRowItem(
                        getString(R.string.payment_confirmation_description_copy),
                        description
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        summaryEmphasisTopTextView.text = getString(R.string.payment_confirmation_emphasis_title)
        summaryEmphasisBottomTextView.text = amount as String

        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        // FIXME: THIS IS HARDCODED
        val newBalance = "12345678"


        val CreateChargeViewModel = ViewModelProviders.of(this).get(CreateChargeViewModel::class.java)
        CreateChargeViewModel.getCharge(amount_bigint, orderId, "true").observe(this, Observer<Charge> {})


        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            XfersStatusCardService(this).presentPaymentCompletedStatusCard(amount, newBalance)
            CreateChargeViewModel.getCharge(amount_bigint, orderId, "true")
        }
    }
}
