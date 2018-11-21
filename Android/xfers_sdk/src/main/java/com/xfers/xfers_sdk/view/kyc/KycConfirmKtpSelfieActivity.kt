package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.activity_kyc_confirm_ktp_image.*
import kotlinx.android.synthetic.main.activity_kyc_confirm_ktp_selfie.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*

class KycConfirmKtpSelfieActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_confirm_ktp_selfie)

        title = getString(R.string.kyc_input_form_title)

        kycConfirmKtpSelfieConfirmSelfieTextView.text = getString(R.string.kyc_confirm_ktp_selfie_confirm_copy)

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

        selfieBitmap?.let {
            kycConfirmKtpSelfieKtpSelfieImageView.setImageBitmap(it)
        }

        selfieBitmapUri?.let {
            kycConfirmKtpSelfieKtpSelfieImageView.setImageURI(it)
        }

        xfersDoubleButtonsNegativeButton.text = getString(R.string.retake_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            startActivity(
                    Intent(this, KycDocumentsConfirmationActivity::class.java).apply {
                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                        this.putExtra(KycConstants.fullName, fullName)
                        this.putExtra(KycConstants.countryOfBirth, countryOfBirth)
                        this.putExtra(KycConstants.dateOfBirth, dateOfBirth)
                        this.putExtra(KycConstants.motherMaidenName, motherMaidenName)
                        this.putExtra(KycConstants.email, email)

                        ktpBitmap?.let {
                            this.putExtra(KycConstants.ktpBitmap, it)
                        }
                        ktpBitmapUri?.let {
                            this.putExtra(KycConstants.ktpBitmapUri, it)
                        }

                        selfieBitmap?.let {
                            this.putExtra(KycConstants.selfieBitmap, it)
                        }
                        selfieBitmapUri.let {
                            this.putExtra(KycConstants.selfieBitmapUri, it)
                        }
                    }
            )
        }
    }
}
