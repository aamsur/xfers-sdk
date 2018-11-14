package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
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

        // TODO: Populate image view with KTP data from previous activity
        // kycConfirmKtpImageKtpImageView

        xfersDoubleButtonsNegativeButton.text = getString(R.string.retake_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.confirm_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Keep passing on the image to child activities
            startActivity(Intent(this, KycPrepareKtpSelfieActivity::class.java))
        }
    }
}
