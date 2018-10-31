package com.xfers.xfers_sdk.view.pay

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_payment_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_emphasis.*

class PaymentConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_confirmation)

        title = getString(R.string.payment_confirmation_title)

        paymentConfirmationTitleTextView.text = getString(R.string.payment_confirmation_page_title)
        paymentconfirmationCopyTextView.text = getString(R.string.payment_confirmation_copy)

        val textRowItems = listOf(
                TextRowItem(
                        getString(R.string.payment_confirmation_payment_to_copy),
                        getString(R.string.payment_confirmation_payment_to_ipsum_copy)
                ),
                TextRowItem(
                        getString(R.string.payment_confirmation_order_id_copy),
                        getString(R.string.payment_confirmation_order_id_ipsum_copy)
                ),
                TextRowItem(
                        getString(R.string.payment_confirmation_description_copy),
                        getString(R.string.payment_confirmation_description_ipsum_copy)
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        summaryEmphasisTopTextView.text = getString(R.string.payment_confirmation_emphasis_title)
        summaryEmphasisBottomTextView.text = getString(R.string.payment_confirmation_number_ipsum)

        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Make it navigate to the correct screen, said screen not built yet
            finish()
        }
    }
}
