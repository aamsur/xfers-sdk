package com.xfers.xfers_sdk.view.manage_banks

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.manage_banks.add_bank_account.SelectBankToAddActivity
import kotlinx.android.synthetic.main.activity_manage_bank_accounts.*
import kotlinx.android.synthetic.main.xfers_button.*

class ManageBankAccountsActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manage_bank_accounts)

        title = getString(R.string.manage_bank_accounts_title)

        // TODO: To integrate with viewModel and API to get a real time representation of bank accounts
        val hasBankAccounts = false

        if (hasBankAccounts) {
            // TODO: Show bank accounts list with dustbin
        } else {
            manageBankAccountsListView.visibility = View.GONE
            manageBankAccountsPoweredByXfers.visibility = View.GONE

            xfersFullWidthButton.text = getString(R.string.add_bank_account_button_copy)
            xfersFullWidthButton.setOnClickListener {
                startActivity(Intent(this, SelectBankToAddActivity::class.java))
            }
        }
    }

    // TODO: Add -> When this screen is presented refetch the viewModel as things could have changed
}
