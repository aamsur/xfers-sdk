package com.xfers.xfers_sdk.view.manage_banks.delete_bank_account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.scale
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view_model.DeleteUserBankAccountViewModel
import kotlinx.android.synthetic.main.activity_delete_bank_account_confirmation.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*

class DeleteBankAccountConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_delete_bank_account_confirmation)

        title = getString(R.string.delete_bank_account_title)

        val extras = this.intent.extras

        val bankAbbreviation = extras[DeleteBankAccountConfirmationConstants.bankAbbreviationKey]
        val bankAccountNumber = extras[DeleteBankAccountConfirmationConstants.bankAccountNumberKey]
        val bankId = extras[DeleteBankAccountConfirmationConstants.bankIdKey] as Int?

        val deleteBankAccountConfirmationText = buildSpannedString {
            bold {
                scale(1.3f) {
                    append(getString(R.string.delete_bank_account_delete_bank_copy))
                    append("\n")
                    append("$bankAbbreviation $bankAccountNumber")
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

        val deleteBankAccountViewModel = ViewModelProviders.of(this).get(DeleteUserBankAccountViewModel::class.java)

        val deleteSuccessObserver = Observer<Boolean> { deleteBankAccountSuccess ->
            if (deleteBankAccountSuccess) {
                finish()
            }
        }

        deleteBankAccountViewModel.deleteBankAccountSuccess.observe(this, deleteSuccessObserver)

        xfersDoubleButtonsPositiveButton.setOnClickListener {
            bankId?.let {
                deleteBankAccountViewModel.deleteUserBankAccount(this, it)
            }
        }
    }
}

object DeleteBankAccountConfirmationConstants {
    const val bankAbbreviationKey = "bankAbbreviationKey"
    const val bankAccountNumberKey = "bankAccountNumberKey"
    const val bankIdKey = "bankIdKey"
}
