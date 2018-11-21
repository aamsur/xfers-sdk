package com.xfers.xfers_sdk.view.kyc

import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
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

        val extras = this.intent.extras
        val ktpNumber = extras[KycConstants.ktpNumber] as String
        val fullName = extras[KycConstants.fullName] as String
        val countryOfBirth = extras[KycConstants.countryOfBirth] as String
        val dateOfBirth = extras[KycConstants.dateOfBirth] as String
        val motherMaidenName = extras[KycConstants.motherMaidenName] as String
        val email = extras[KycConstants.email] as String
        val ktpBitmap = intent.extras[KycConstants.ktpBitmap] as? Bitmap
        val ktpBitmapUri = intent.extras[KycConstants.ktpBitmapUri] as? Uri
        val selfieBitmap = intent.extras[KycConstants.selfieBitmap] as? Bitmap
        val selfieBitmapUri = intent.extras[KycConstants.selfieBitmapUri] as? Uri

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
        xfersFullWidthButton.setOnClickListener {
            // TODO: Add view model to the activity and on submit talk to Xfers API
            XfersStatusCardService(this).presentKycSubmitSuccessfulStatusCard()
        }
    }
}
