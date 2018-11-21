package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.activity_kyc_confirm_ktp_image.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*

class KycConfirmKtpImageActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_confirm_ktp_image)

        title = getString(R.string.kyc_input_form_title)

        kycConfirmKtpImageConfirmImageTextView.text = getString(R.string.kyc_confirm_ktp_image_confirm_copy)

        val extras = this.intent.extras
        val ktpNumber = extras[KycConstants.ktpNumber] as String
        val fullName = extras[KycConstants.fullName] as String
        val countryOfBirth = extras[KycConstants.countryOfBirth] as String
        val dateOfBirth = extras[KycConstants.dateOfBirth] as String
        val motherMaidenName = extras[KycConstants.motherMaidenName] as String
        val email = extras[KycConstants.email] as String
        val ktpBitmapUri = intent.extras[KycConstants.ktpBitmapUri] as Uri

        kycConfirmKtpImageKtpImageView.setImageURI(ktpBitmapUri)

        xfersDoubleButtonsNegativeButton.text = getString(R.string.retake_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            startActivity(
                    Intent(this, KycPrepareKtpSelfieActivity::class.java).apply {
                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                        this.putExtra(KycConstants.fullName, fullName)
                        this.putExtra(KycConstants.countryOfBirth, countryOfBirth)
                        this.putExtra(KycConstants.dateOfBirth, dateOfBirth)
                        this.putExtra(KycConstants.motherMaidenName, motherMaidenName)
                        this.putExtra(KycConstants.email, email)
                        this.putExtra(KycConstants.ktpBitmapUri, ktpBitmapUri)
                    }
            )
        }
    }
}
