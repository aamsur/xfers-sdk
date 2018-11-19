package com.xfers.xfers_sdk.utils.services.ui

import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view.shared.StatusCardBaseActivity
import com.xfers.xfers_sdk.view.shared.StatusCardBaseActivityConstants
import java.math.BigDecimal

class XfersStatusCardService(private val context: Context) {

    fun presentComingSoonStatusCard() {
        val comingSoonIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            bold {
                append(context.getString(R.string.coming_soon_subtitle))
            }
            append("\n\n")
            append(context.getString(R.string.coming_soon_copy))
        }

        comingSoonIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.coming_soon_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.lightGray,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_wip_60,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.lightGray,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to false
                )
        )

        context.startActivity(comingSoonIntent)
    }

    fun presentConnectLinkSuccessfulStatusCard() {
        val connectLinkSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.connect_link_successful_card_text, XfersConfiguration.getMerchantName()))
        }

        connectLinkSuccessfulIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.connect_flow_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_success_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to true,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to true
                )
        )

        context.startActivity(connectLinkSuccessfulIntent)
    }

    fun presentKycSubmitSuccessfulStatusCard() {
        val kycSubmitSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.kyc_submit_successful_card_text))
        }

        kycSubmitSuccessfulIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.connect_identity_verification_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_pending_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.got_it_button_copy),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to true
                )
        )

        context.startActivity(kycSubmitSuccessfulIntent)
    }

    fun presentAddBankAccountSuccessfulStatusCard() {
        val addBankAccountSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.add_bank_account_successful_card_text))
        }

        addBankAccountSuccessfulIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.add_bank_account_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_success_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.okay_button_copy),
                        StatusCardBaseActivityConstants.buttonClickGoToManageBanks to true
                )
        )

        context.startActivity(addBankAccountSuccessfulIntent)
    }

    fun presentAddBankAccountFailureStatusCard() {
        val addBankAccountFailureIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.add_bank_account_failure_card_text))
        }

        addBankAccountFailureIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.add_bank_account_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_alert_60,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.try_again_button_copy),
                        StatusCardBaseActivityConstants.buttonClickGoToManageBanks to true
                )
        )

        context.startActivity(addBankAccountFailureIntent)
    }

    fun presentPaymentCompletedStatusCard(amount: BigDecimal, newBalance: BigDecimal) {
        val paymentCompletedIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.payment_completed_card_text))
            append("\n\n\n\n")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(context.getString(R.string.payment_completed_card_subtitle))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.payment_completed_card_amount, "${XfersConfiguration.getCurrencyString()} $amount"))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.payment_completed_card_balance, "${XfersConfiguration.getCurrencyString()} $newBalance"))
            }
        }

        paymentCompletedIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.payment_confirmation_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_success_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to true
                )
        )

        context.startActivity(paymentCompletedIntent)
    }

    fun presentTopupProcessingStatusCard() {
        val topupProcessingIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.topup_transfer_funds_processing_card_text))
        }

        topupProcessingIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.topup_transfer_funds_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_pending_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to true
                )
        )

        context.startActivity(topupProcessingIntent)
    }

    fun presentWithdrawalProcessingStatusCard(amount: BigDecimal, newAvailableBalance: String?) {
        val withdrawalProcessingIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.withdrawal_processing_card_text))
            append("\n\n\n")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(context.getString(R.string.withdrawal_processing_card_subtitle))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.withdrawal_processing_card_amount, "${XfersConfiguration.getCurrencyString()} $amount"))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.withdrawal_processing_card_balance, "${XfersConfiguration.getCurrencyString()} $newAvailableBalance"))
            }
        }

        withdrawalProcessingIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.withdrawal_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_success_50,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.aquaMarine,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        StatusCardBaseActivityConstants.buttonClickReturnToMerchant to true
                )
        )

        context.startActivity(withdrawalProcessingIntent)
    }

    fun presentInsufficientFundsStatusCard() {
        val insufficientFundsIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.payment_insufficient_funds_card_text))
            append("\n\n\n\n")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(context.getString(R.string.payment_insufficient_funds_card_subtitle))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.withdrawal_processing_card_balance, "Rp 90.000"))
            }
        }

        insufficientFundsIntent.putExtra(StatusCardBaseActivityConstants.statusCardConfig,
                hashMapOf(
                        StatusCardBaseActivityConstants.cardPageTitle to context.getString(R.string.payment_confirmation_title),
                        StatusCardBaseActivityConstants.extendedTopbarBackgroundColor to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.statusIconImage to R.drawable.status_alert_60,
                        StatusCardBaseActivityConstants.statusIconImageColorFilter to R.color.pastelOrange,
                        StatusCardBaseActivityConstants.showMerchantXfersLogos to false,
                        StatusCardBaseActivityConstants.cardText to cardText,
                        StatusCardBaseActivityConstants.buttonText to context.getString(R.string.make_topup_button_copy),
                        StatusCardBaseActivityConstants.buttonClickGoToTopup to true
                )
        )

        context.startActivity(insufficientFundsIntent)
    }
}
