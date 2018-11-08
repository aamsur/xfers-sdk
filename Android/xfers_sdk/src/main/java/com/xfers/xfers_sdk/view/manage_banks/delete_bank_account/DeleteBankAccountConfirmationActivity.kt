package com.xfers.xfers_sdk.view.manage_banks.delete_bank_account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.scale
import com.xfers.xfers_sdk.R
import kotlinx.android.synthetic.main.activity_delete_bank_account_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*

class DeleteBankAccountConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_delete_bank_account_confirmation)

        title = getString(R.string.delete_bank_account_title)

        val deleteBankAccountConfirmationText = buildSpannedString {
            bold {
                scale(1.3f) {
                    append(getString(R.string.delete_bank_account_delete_bank_copy))
                    append("\n")
                    // TODO: To integrate this with previous screen's information on what is being deleted
                    append(getString(R.string.bank_xxx_ipsum))
                    append("?")
                }
            }
            append("\n\n\n")
            append(getString(R.string.delete_bank_account_no_reversal_copy))
        }

        deleteBankAccountConfirmationTextView.text = deleteBankAccountConfirmationText

        xfersDoubleButtonsNegativeButton.text = getString(R.string.go_back_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.delete_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Integrate API to delete bank account properly before finishing back to manage bank accounts page

            finish()
        }
    }
}
