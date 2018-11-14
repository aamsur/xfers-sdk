package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_kyc_form_input.*

class KycFullNameActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_full_name)

        title = getString(R.string.kyc_input_form_title)

        xfersKycFormInputStepTitle.text = getString(R.string.kyc_input_form_step_title)
        xfersKycFormInputStepNumber.text = getString(R.string.kyc_full_name_step_number)
        xfersKycFormInputFieldTitle.text = getString(R.string.kyc_full_name_page_title)
        xfersKycFormInputEditText.hint = getString(R.string.kyc_full_name_placeholder)
        xfersKycFormInputEditText.inputType = InputType.TYPE_CLASS_TEXT

        xfersFullWidthButton.setOnClickListener {
            // TODO: Push full name information to following activities

            // TODO: Change to proper country of birth (slot in between this and next)
            startActivity(Intent(this, KycCountryOfBirthActivity::class.java))
        }
    }
}
