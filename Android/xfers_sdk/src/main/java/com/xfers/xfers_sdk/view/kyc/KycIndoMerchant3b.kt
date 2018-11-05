package com.xfers.xfers_sdk.view.kyc

import android.os.Bundle
import android.text.InputType
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_form_input.*

class KycIndoMerchant3b : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mother_maiden_name)

        title = getString(R.string.kyc_indo_merchant_verification_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputFieldTitle.text = getString(R.string.kyc_indo_merchant_3b_input_field_title)
        xfersFormInputEditText.inputType = InputType.TYPE_CLASS_TEXT
        xfersFormInputEditText.hint = getString(R.string.kyc_indo_merchant_3b_email_placeholder)
        xfersFormInputEditTextSubtitle.text = getString(R.string.kyc_indo_merchant_3b_subtitle)
        xfersFormInputNotesTextView.visibility = View.GONE
    }
}
