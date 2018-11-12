package com.xfers.xfers_sdk.view.menu

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.scale
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.kyc.KycDocumentPreparationActivity
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
            val isPendingVerification = false

            xfersFullWidthButton.text = getString(R.string.verify_account_button_copy)
            xfersFullWidthButton.setOnClickListener {
                if (isPendingVerification) {
                    // TODO: Start verification status activity through an intent
                } else {
                    startActivity(Intent(this, KycDocumentPreparationActivity::class.java))
                }
            }

            menuVerificationTextView.text = getString(R.string.menu_verification_copy)
        }

        // TODO: Do up the 4 buttons with some coming soon toasts and relevant activities
    }
}
