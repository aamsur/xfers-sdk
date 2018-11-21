package com.xfers.xfers_sdk.view.kyc

import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import com.xfers.xfers_sdk.view_model.RequestKycViewModel
import kotlinx.android.synthetic.main.activity_kyc_documents_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import android.util.Base64
import java.io.ByteArrayOutputStream

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
        val ktpBitmapUri = intent.extras[KycConstants.ktpBitmapUri] as Uri
        val selfieBitmapUri = intent.extras[KycConstants.selfieBitmapUri] as Uri

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

        val requestKycViewModel = ViewModelProviders.of(this).get(RequestKycViewModel::class.java)

        val ktpBitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, ktpBitmapUri)
        val selfieBitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, selfieBitmapUri)

        val ktpBaos = ByteArrayOutputStream()
        ktpBitmap.compress(Bitmap.CompressFormat.PNG, 100, ktpBaos)
        val ktpByteArray = ktpBaos.toByteArray()
        val ktpBase64 = Base64.encodeToString(ktpByteArray, Base64.DEFAULT)

        val selfieBaos = ByteArrayOutputStream()
        selfieBitmap.compress(Bitmap.CompressFormat.PNG, 100, selfieBaos)
        val selfieByteArray = selfieBaos.toByteArray()
        val selfieBase64 = Base64.encodeToString(selfieByteArray, Base64.DEFAULT)

        kycDocumentsConfirmationXfersProgressBar.visibility = View.GONE
        kycDocumentsConfirmationTitleTextView.visibility = View.VISIBLE
        kycDocumentsConfirmationListView.visibility = View.VISIBLE
        kycDocumentsConfirmationPoweredByXfers.visibility = View.VISIBLE
        kycDocumentsConfirmationButton.visibility = View.VISIBLE

        xfersFullWidthButton.text = getString(R.string.submit_button_copy)
        xfersFullWidthButton.setOnClickListener {
            kycDocumentsConfirmationXfersProgressBar.visibility = View.VISIBLE
            kycDocumentsConfirmationTitleTextView.visibility = View.GONE
            kycDocumentsConfirmationListView.visibility = View.GONE
            kycDocumentsConfirmationPoweredByXfers.visibility = View.GONE
            kycDocumentsConfirmationButton.visibility = View.GONE

            requestKycViewModel.updateUserDetails(
                    ktpNumber, fullName, countryOfBirth, dateOfBirth,
                    motherMaidenName, email, ktpBase64, selfieBase64
            ).observe(this, Observer<User> {
                XfersStatusCardService(this).presentKycSubmitSuccessfulStatusCard()
            })
        }
    }
}
