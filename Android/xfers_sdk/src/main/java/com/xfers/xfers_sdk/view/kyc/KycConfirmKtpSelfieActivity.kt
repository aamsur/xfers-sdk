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

        val bitmap = intent.extras["selfieBitmap"] as? Bitmap

        bitmap?.let {
            kycConfirmKtpSelfieKtpSelfieImageView.setImageBitmap(it)
        }

        val bitmapUri = intent.extras["selfieBitmapUri"] as? Uri

        bitmapUri.let {
            kycConfirmKtpSelfieKtpSelfieImageView.setImageURI(it)
        }

        xfersDoubleButtonsNegativeButton.text = getString(R.string.retake_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Keep passing on the image to child activities

            startActivity(Intent(this, KycDocumentsConfirmationActivity::class.java))
        }
    }
}
