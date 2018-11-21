package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_kyc_form_input.*

class KycEmailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_email)

        title = getString(R.string.kyc_input_form_title)

        xfersKycFormInputStepTitle.text = getString(R.string.kyc_input_form_step_title)
        xfersKycFormInputStepNumber.text = getString(R.string.kyc_email_step_number)
        xfersKycFormInputFieldTitle.text = getString(R.string.kyc_email_page_title)
        xfersKycFormInputEditText.hint = getString(R.string.kyc_email_placeholder)
        xfersKycFormInputEditText.inputType = InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS

        val extras = this.intent.extras
        val ktpNumber = extras[KycConstants.ktpNumber] as String
        val fullName = extras[KycConstants.fullName] as String
        val countryOfBirth = extras[KycConstants.countryOfBirth] as String
        val dateOfBirth = extras[KycConstants.dateOfBirth] as String
        val motherMaidenName = extras[KycConstants.motherMaidenName] as String

        xfersFullWidthButton.setOnClickListener {
            startActivity(
                    Intent(this, KycPersonalDetailsVerificationActivity::class.java).apply {
                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                        this.putExtra(KycConstants.fullName, fullName)
                        this.putExtra(KycConstants.countryOfBirth, countryOfBirth)
                        this.putExtra(KycConstants.dateOfBirth, dateOfBirth)
                        this.putExtra(KycConstants.motherMaidenName, motherMaidenName)
                        this.putExtra(KycConstants.email, xfersKycFormInputEditText.text.toString())
                    }
            )
        }
    }
}
