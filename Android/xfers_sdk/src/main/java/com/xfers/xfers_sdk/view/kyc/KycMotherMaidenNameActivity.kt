package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*

class KycMotherMaidenNameActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mother_maiden_name)

        title = getString(R.string.kyc_title)

        xfersFormInputPageTitle.text = getString(R.string.kyc_mother_maiden_name_step_copy)
        xfersFormInputFieldTitle.text = getString(R.string.kyc_mother_maiden_name_page_title)
        xfersFormInputEditText.hint = getString(R.string.kyc_mother_maiden_name_placeholder)
        xfersFormInputEditText.inputType = InputType.TYPE_CLASS_TEXT
        xfersFormInputEditTextSubtitle.visibility = View.GONE
        xfersFormInputNotesTextView.visibility = View.GONE

        xfersFullWidthButton.setOnClickListener {
            startActivity(Intent(this, KycDocumentsConfirmationActivity::class.java))
        }
    }
}