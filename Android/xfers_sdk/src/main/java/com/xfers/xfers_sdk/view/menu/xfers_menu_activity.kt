package com.xfers.xfers_sdk.view.menu

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.scale
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.kyc.KycDocumentPreparationActivity
import com.xfers.xfers_sdk.view.kyc.KycVerificationStatusActivity
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity
import com.xfers.xfers_sdk.view.withdrawal.WithdrawalBankSelectionActivity
import kotlinx.android.synthetic.main.activity_xfers_menu.*
import kotlinx.android.synthetic.main.xfers_button.*

class XfersMenuActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_xfers_menu)

        title = getString(R.string.menu_title)

        val isVerified = false

        menuBalanceTextView.text = buildSpannedString {
            append(getString(R.string.menu_balance_title))
            append("\n")
            bold {
                scale(1.4f) {
                    append(getString(R.string.menu_balance_ipsum))
                }
            }
        }

        // TODO: Check if verified or not through a proper viewModel
        if (isVerified) {
            xfersFullWidthButton.visibility = View.GONE
            menuVerificationTextView.visibility = View.GONE
        } else {
            // TODO: Check if pending verification or not through a proper viewModel
            val isPendingVerification = true

            xfersFullWidthButton.text = getString(R.string.verify_account_button_copy)
            xfersFullWidthButton.setOnClickListener {
                if (isPendingVerification) {
                    startActivity(Intent(this, KycVerificationStatusActivity::class.java))
                } else {
                    startActivity(Intent(this, KycDocumentPreparationActivity::class.java))
                }
            }

            menuVerificationTextView.text = getString(R.string.menu_verification_copy)
        }
    }

    fun topupOnClick(view: View) {
        startActivity(Intent(this, TopupBankSelectionActivity::class.java))
    }

    fun accountSettingsOnClick(view: View) {
        Toast.makeText(this, "Account Settings coming soon", Toast.LENGTH_SHORT).show()
    }

    fun withdrawOnClick(view: View) {
        startActivity(Intent(this, WithdrawalBankSelectionActivity::class.java))
    }

    fun transactionHistoryOnClick(view: View) {
        Toast.makeText(this, "Transactions History coming soon", Toast.LENGTH_SHORT).show()
    }
}
