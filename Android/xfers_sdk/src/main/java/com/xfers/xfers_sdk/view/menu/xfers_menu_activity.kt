package com.xfers.xfers_sdk.view.menu

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.scale
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view.kyc.KycDocumentPreparationActivity
import com.xfers.xfers_sdk.view.kyc.KycVerificationStatusActivity
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity
import com.xfers.xfers_sdk.view.transactions_history.TransactionsHistoryActivity
import com.xfers.xfers_sdk.view.withdrawal.WithdrawalBankSelectionActivity
import com.xfers.xfers_sdk.view_model.UserDetailsViewModel
import kotlinx.android.synthetic.main.activity_xfers_menu.*
import kotlinx.android.synthetic.main.xfers_button.*

class XfersMenuActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_xfers_menu)

        title = getString(R.string.menu_title)

        xfersFullWidthButton.text = getString(R.string.verify_account_button_copy)
        menuVerificationTextView.text = getString(R.string.menu_verification_copy)

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
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
        startActivity(Intent(this, TransactionsHistoryActivity::class.java))
    }

    private fun observeViewModel() {
        xfersMenuXfersProgressBar.visibility = View.VISIBLE
        menuBalanceTextView.visibility = View.GONE
        menuVerifyButtonView.visibility = View.GONE
        menuVerificationTextView.visibility = View.GONE
        menuCardView1.visibility = View.GONE
        menuCard1TextView.visibility = View.GONE
        menuCardView2.visibility = View.GONE
        menuCard2TextView.visibility = View.GONE
        menuCardView3.visibility = View.GONE
        menuCard3TextView.visibility = View.GONE
        menuCardView4.visibility = View.GONE
        menuCard4TextView.visibility = View.GONE

        val userDetailsViewModel = ViewModelProviders.of(this).get(UserDetailsViewModel::class.java)
        userDetailsViewModel.getUserDetails(this).observe(this, Observer<User> { user ->
            xfersMenuXfersProgressBar.visibility = View.GONE
            menuBalanceTextView.visibility = View.VISIBLE
            menuVerifyButtonView.visibility = View.VISIBLE
            menuVerificationTextView.visibility = View.VISIBLE
            menuCardView1.visibility = View.VISIBLE
            menuCard1TextView.visibility = View.VISIBLE
            menuCardView2.visibility = View.VISIBLE
            menuCard2TextView.visibility = View.VISIBLE
            menuCardView3.visibility = View.VISIBLE
            menuCard3TextView.visibility = View.VISIBLE
            menuCardView4.visibility = View.VISIBLE
            menuCard4TextView.visibility = View.VISIBLE

            menuBalanceTextView.text = buildSpannedString {
                append(getString(R.string.menu_balance_title))
                append("\n")
                bold {
                    scale(1.4f) {
                        append("${XfersConfiguration.getCurrencyString()} ${user.availableBalance}")
                    }
                }
            }

            user.kycVerified?.let {
                if (it) {
                    // TODO: Check with designer how to spruce up this part, the empty gap looks weird
                    xfersFullWidthButton.visibility = View.GONE
                    menuVerificationTextView.visibility = View.GONE
                } else {
                    user.kycNeeded?.let { kycNeeded ->
                        xfersFullWidthButton.setOnClickListener {
                            if (kycNeeded) { // pending verification
                                startActivity(Intent(this, KycVerificationStatusActivity::class.java))
                            } else {
                                startActivity(Intent(this, KycDocumentPreparationActivity::class.java))
                            }
                        }
                    }
                }
            }
        })
    }
}
