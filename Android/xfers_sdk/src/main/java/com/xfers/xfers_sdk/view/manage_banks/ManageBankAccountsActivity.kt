package com.xfers.xfers_sdk.view.manage_banks

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R

class ManageBankAccountsActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_delete_bank_account_confirmation)

        title = getString(R.string.delete_bank_account_title)

        // TODO: To integrate with viewModel and API to get a real time representation of banks
        val hasBankAccounts = true

        if (hasBankAccounts) {
            // TODO: Show bank accounts list with dustbin
        } else {
            // TODO: Show "Add bank account" button
        }
    }
}
