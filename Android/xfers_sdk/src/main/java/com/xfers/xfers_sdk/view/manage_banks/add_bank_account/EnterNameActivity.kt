package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.os.Bundle
import android.text.InputType
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.xfers_form_input.*

class EnterNameActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manage_banks_add_bank_account_enter_name)

        title = getString(R.string.add_bank_account_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputFieldTitle.text = getString(R.string.add_bank_account_enter_name_field_title)
        xfersFormInputEditText.hint = getString(R.string.add_bank_account_enter_name_edit_text_hint)
        xfersFormInputEditText.inputType = InputType.TYPE_CLASS_TEXT
        xfersFormInputEditTextSubtitle.text = getString(R.string.add_bank_account_enter_name_edit_text_subtitle)
        xfersFormInputNotesTextView.visibility = View.GONE
    }
}
