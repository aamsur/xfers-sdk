package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_kyc_form_input.*

class KycKtpActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_ktp)

        title = getString(R.string.kyc_input_form_title)

        xfersKycFormInputStepTitle.text = getString(R.string.kyc_input_form_step_title)
        xfersKycFormInputStepNumber.text = getString(R.string.kyc_ktp_step_number)
        xfersKycFormInputFieldTitle.text = getString(R.string.kyc_ktp_page_title)
        xfersKycFormInputEditText.hint = getString(R.string.kyc_ktp_placeholder)
        xfersKycFormInputEditText.inputType = InputType.TYPE_CLASS_TEXT

        xfersFullWidthButton.setOnClickListener {
            // TODO: Push KTP information to following activities

            startActivity(Intent(this, KycFullNameActivity::class.java))
        }
    }
}
