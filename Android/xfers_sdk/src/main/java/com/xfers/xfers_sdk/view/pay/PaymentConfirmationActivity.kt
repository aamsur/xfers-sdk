package com.xfers.xfers_sdk.view.pay

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.Button
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter

class PaymentConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_confirmation)

        title = getString(R.string.payment_confirmation_title)

        val paymentConfirmationTitleTextView = findViewById<TextView>(R.id.paymentConfirmationTitleTextView)
        paymentConfirmationTitleTextView.text = getString(R.string.payment_confirmation_page_title)

        val paymentconfirmationCopyTextView = findViewById<TextView>(R.id.paymentconfirmationCopyTextView)
        paymentconfirmationCopyTextView.text = getString(R.string.payment_confirmation_copy)

        val titles = arrayListOf(
                getString(R.string.payment_confirmation_payment_to_copy),
                getString(R.string.payment_confirmation_order_id_copy),
                getString(R.string.payment_confirmation_description_copy)
        )
        val copies = arrayListOf(
                getString(R.string.payment_confirmation_payment_to_ipsum_copy),
                getString(R.string.payment_confirmation_order_id_ipsum_copy),
                getString(R.string.payment_confirmation_description_ipsum_copy)
        )

        val listViewRecyclerView = findViewById<RecyclerView>(R.id.listViewRecyclerView)
        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(titles, copies)
        listViewRecyclerView.adapter = adapter

        val summaryEmphasisTopTextView = findViewById<TextView>(R.id.summaryEmphasisTopTextView)
        summaryEmphasisTopTextView.text = getString(R.string.payment_confirmation_emphasis_title)

        val summaryEmphasisBottomTextView = findViewById<TextView>(R.id.summaryEmphasisBottomTextView)
        summaryEmphasisBottomTextView.text = getString(R.string.payment_confirmation_number_ipsum)

        val xfersDoubleButtonsNegativeButton = findViewById<Button>(R.id.xfersDoubleButtonsNegativeButton)
        xfersDoubleButtonsNegativeButton.text = getString(R.string.cancel_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        val xfersDoubleButtonsPositiveButton = findViewById<Button>(R.id.xfersDoubleButtonsPositiveButton)
        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Make it navigate to the correct screen, said screen not built yet
            finish()
        }
    }
}
