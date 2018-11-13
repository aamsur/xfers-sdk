package com.xfers.xfers_sdk.view.kyc

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import kotlinx.android.synthetic.main.activity_kyc_documents_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class KycDocumentsConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_documents_confirmation)

        title = getString(R.string.kyc_title)

        kycDocumentsConfirmationTitleTextView.text = getString(R.string.kyc_documents_confirmation_page_title)

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        getString(R.string.kyc_documents_confirmation_personal_details_copy)
                ),
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        getString(R.string.kyc_documents_confirmation_ktp_copy)
                ),
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        getString(R.string.kyc_documents_confirmation_selfie_verification_copy)
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter

        xfersFullWidthButton.text = getString(R.string.submit_button_copy)

        // TODO: Add view model to the activity and on submit talk to Xfers API
        XfersStatusCardService(this).presentKycSubmitSuccessfulStatusCard()
    }
}