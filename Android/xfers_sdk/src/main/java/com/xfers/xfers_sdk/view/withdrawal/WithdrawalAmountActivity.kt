package com.xfers.xfers_sdk.view.withdrawal

import android.content.Intent
import android.os.Bundle
import android.text.SpannedString
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.R.string.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*

class WithdrawalAmountActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_amount)

        title = getString(withdrawal_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputEditTextSubtitle.visibility = View.GONE
        val hint: SpannedString = buildSpannedString {
            bold {
                append(getString(withdrawal_amount_input_text))
            }
            append(" ")
            append(getString(withdrawal_amount_input_default_value))
        }

        xfersFormInputEditText.hint = hint


        xfersFormInputFieldTitle.text = getString(withdrawal_confirmation_page_title)

        val footnote: SpannedString = buildSpannedString {
            bold {
                append(getString(withdrawal_amount_balance))
            }
            append("\n\n")
            append(getString(withdrawal_amount_notes))
        }


        xfersFormInputNotesTextView.text = footnote

        xfersFullWidthButton.setOnClickListener {
            startActivity(Intent(this, WithdrawalBankSelectionActivity::class.java))
        }
    }

}