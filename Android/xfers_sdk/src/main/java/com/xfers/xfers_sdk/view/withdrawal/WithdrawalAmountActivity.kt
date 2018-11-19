package com.xfers.xfers_sdk.view.withdrawal

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view_model.UserDetailsViewModel
import kotlinx.android.synthetic.main.activity_withdrawal_amount.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*
import java.math.BigDecimal

class WithdrawalAmountActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_withdrawal_amount)

        title = getString(R.string.withdrawal_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputEditTextSubtitle.visibility = View.GONE
        val hint = buildSpannedString {
            bold {
                append(getString(R.string.withdrawal_amount_input_text))
            }
            append(" ")
            append(getString(R.string.withdrawal_amount_input_default_value))
        }

        xfersFormInputEditText.hint = hint

        xfersFormInputFieldTitle.text = getString(R.string.withdrawal_confirmation_page_title)

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        withdrawalAmountXfersProgressBar.visibility = View.VISIBLE
        withdrawalAmountFormIncludeLayout.visibility = View.GONE

        val userDetailsViewModel = ViewModelProviders.of(this).get(UserDetailsViewModel::class.java)
        userDetailsViewModel.getUserDetails().observe(this, Observer<User> { user ->
            withdrawalAmountXfersProgressBar.visibility = View.GONE
            withdrawalAmountFormIncludeLayout.visibility = View.VISIBLE

            if (XfersConfiguration.getCurrentCountry() == Xfers.Country.SG) {
                val footnote = buildSpannedString {
                    append(getString(R.string.withdrawal_amount_balance))
                    append(" ")
                    bold {
                        append("${XfersConfiguration.getCurrencyString()} ${user.availableBalance}")
                    }
                    append("\n\n")

                    // TODO: Display withdrawal notes for SG (especially digital wallet)
                    append(getString(R.string.withdrawal_amount_notes))
                }

                xfersFormInputNotesTextView.text = footnote
            } else { // ID
                val footnote = buildSpannedString {
                    append(getString(R.string.withdrawal_amount_balance))
                    append(" ")
                    bold {
                        append("${XfersConfiguration.getCurrencyString()} ${user.availableBalance}")
                    }
                }

                xfersFormInputNotesTextView.text = footnote
            }

            val extras = this.intent.extras

            xfersFullWidthButton.setOnClickListener {
                if (xfersFormInputEditText.text.isNotBlank()) {
                    val enteredAmount = xfersFormInputEditText.text.toString()
                    val availableBalance = user.availableBalance

                    // TODO: Make the checks for the edit text much better, such as alphanumeric only etc.
                    if (BigDecimal(enteredAmount) > BigDecimal(availableBalance)) {
                        Toast.makeText(this, "Please enter an amount lower than or equal to your current balance.", Toast.LENGTH_SHORT).show()
                    } else {
                        startActivity(
                                Intent(this, WithdrawalConfirmationActivity::class.java).apply {
                                    this.putExtra(WithdrawalConstants.amount, enteredAmount)
                                    this.putExtra(WithdrawalConstants.bankAbbreviation, extras[WithdrawalConstants.bankAbbreviation] as String)
                                    this.putExtra(WithdrawalConstants.bankAccountNumber, extras[WithdrawalConstants.bankAccountNumber] as String)
                                    this.putExtra(WithdrawalConstants.bankId, extras[WithdrawalConstants.bankId] as Int)
                                }
                        )
                    }
                }
            }
        })
    }
}
