package com.xfers.xfers_sdk.view.manage_banks.add_banks

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_form_input.*

class AddBankAccountNumberActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_bank_account_number)

        title = getString(R.string.add_bank_account_title)

        xfersFormInputPageTitle.visibility = View.GONE

        xfersFormInputFieldTitle.text = getString(R.string.add_bank_account_number_title)

        xfersFormInputEditText.hint = getString(R.string.add_bank_account_number_hint)

        xfersFormInputEditTextSubtitle.text = getString(R.string.add_bank_account_number_subtitle)

        xfersFormInputNotesTextView.visibility = View.GONE
    }
}
