package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.manage_banks.ManageBanksConstants
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*

class ReEnterBankAccountNumberActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_bank_account_field)

        title = getString(R.string.add_bank_account_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputFieldTitle.text = getString(R.string.reenter_bank_account_number_title)
        xfersFormInputEditText.hint = getString(R.string.enter_bank_account_number_hint)
        xfersFormInputEditTextSubtitle.text = getString(R.string.enter_bank_account_number_subtitle)
        xfersFormInputNotesTextView.visibility = View.GONE

        val extras = this.intent.extras
        val context = this

        xfersFullWidthButton.setOnClickListener {
            if (isBankAccountNumberSame()) {
                startActivity(
                        Intent(this, AddBankAccountConfirmationActivity::class.java).apply {
                            this.putExtra(ManageBanksConstants.bankAbbreviation, extras[ManageBanksConstants.bankAbbreviation] as String)
                            this.putExtra(ManageBanksConstants.bankUserName, extras[ManageBanksConstants.bankUserName] as String)
                            this.putExtra(ManageBanksConstants.bankAccountNumber, extras[ManageBanksConstants.bankAccountNumber] as String)
                        }
                )
            } else {
                // TODO: Check with designer if UI should show something rather than a toast
                Toast.makeText(context, "Your re-entered bank account number is not the same - please make sure it is the same", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun isBankAccountNumberSame(): Boolean {
        val bankAccountNumber = this.intent.extras[ManageBanksConstants.bankAccountNumber] as String
        val reEnteredBankAccountNumber = xfersFormInputEditText.text.toString()

        return bankAccountNumber == reEnteredBankAccountNumber
    }
}
