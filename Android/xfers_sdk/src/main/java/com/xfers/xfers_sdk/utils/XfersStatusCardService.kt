package com.xfers.xfers_sdk.utils

import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.StatusCardBaseActivity

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

        comingSoonIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.coming_soon_title),
                        "extendedTopbarBackgroundColor" to R.color.lightGray,
                        "statusIconImage" to R.drawable.status_wip_60,
                        "statusIconImageColorFilter" to R.color.lightGray,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        "buttonClickReturnToMerchant" to false
                )
        )

        context.startActivity(comingSoonIntent)
    }

    fun presentConnectLinkSuccessfulStatusCard() {
        val connectLinkSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.connect_link_successful_card_text, XfersConfiguration.getMerchantName()))
        }

        connectLinkSuccessfulIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.connect_flow_title),
                        "extendedTopbarBackgroundColor" to R.color.aquaMarine,
                        "statusIconImage" to R.drawable.status_success_50,
                        "statusIconImageColorFilter" to R.color.aquaMarine,
                        "showMerchantXfersLogos" to true,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(connectLinkSuccessfulIntent)
    }

    fun presentKycSubmitSuccessfulStatusCard() {
        val kycSubmitSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.kyc_submit_successful_card_text))
        }

        kycSubmitSuccessfulIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.connect_identity_verification_title),
                        "extendedTopbarBackgroundColor" to R.color.pastelOrange,
                        "statusIconImage" to R.drawable.status_pending_50,
                        "statusIconImageColorFilter" to R.color.pastelOrange,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.got_it_button_copy),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(kycSubmitSuccessfulIntent)
    }

    fun presentAddBankAccountSuccessfulStatusCard() {
        val addBankAccountSuccessfulIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.add_bank_account_successful_card_text))
        }

        addBankAccountSuccessfulIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.add_bank_account_title),
                        "extendedTopbarBackgroundColor" to R.color.aquaMarine,
                        "statusIconImage" to R.drawable.status_success_50,
                        "statusIconImageColorFilter" to R.color.aquaMarine,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.okay_button_copy),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(addBankAccountSuccessfulIntent)
    }

    fun presentAddBankAccountFailureStatusCard() {
        val addBankAccountFailureIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.add_bank_account_failure_card_text))
        }

        addBankAccountFailureIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.add_bank_account_title),
                        "extendedTopbarBackgroundColor" to R.color.pastelOrange,
                        "statusIconImage" to R.drawable.status_alert_60,
                        "statusIconImageColorFilter" to R.color.pastelOrange,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.try_again_button_copy),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(addBankAccountFailureIntent)
    }

    fun presentPaymentCompletedStatusCard() {
        val paymentCompletedIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.payment_completed_card_text))
            append("\n\n\n\n")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(context.getString(R.string.payment_completed_card_subtitle))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.payment_completed_card_amount, "Rp 20.000"))
            }
            append("\n\n")
            bold {
                append(context.getString(R.string.payment_completed_card_balance, "Rp 90.000"))
            }
        }

        paymentCompletedIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.payment_confirmation_title),
                        "extendedTopbarBackgroundColor" to R.color.aquaMarine,
                        "statusIconImage" to R.drawable.status_success_50,
                        "statusIconImageColorFilter" to R.color.aquaMarine,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(paymentCompletedIntent)
    }

    fun presentTopupProcessingStatusCard() {
        val topupProcessingIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.topup_transfer_funds_processing_card_text))
        }

        topupProcessingIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.topup_transfer_funds_title),
                        "extendedTopbarBackgroundColor" to R.color.pastelOrange,
                        "statusIconImage" to R.drawable.status_pending_50,
                        "statusIconImageColorFilter" to R.color.pastelOrange,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(topupProcessingIntent)
    }

    fun presentAddBankAccountRejectionStatusCard() {
        val addBankAccountRejectionIntent = Intent(context, StatusCardBaseActivity::class.java)

        val cardText = buildSpannedString {
            append(context.getString(R.string.add_bank_account_rejection_card_text_part_1))
            append("\n")
            bold {
                append(context.getString(R.string.bank_ipsum))
            }
            append("\n")
            append(context.getString(R.string.add_bank_account_rejection_card_text_part_2, "[reason]"))
        }

        addBankAccountRejectionIntent.putExtra("statusCardConfig",
                hashMapOf(
                        "cardPageTitle" to context.getString(R.string.topup_transfer_funds_title),
                        "extendedTopbarBackgroundColor" to R.color.pastelOrange,
                        "statusIconImage" to R.drawable.status_alert_60,
                        "statusIconImageColorFilter" to R.color.pastelOrange,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName()),
                        "buttonClickReturnToMerchant" to true
                )
        )

        context.startActivity(addBankAccountRejectionIntent)
    }
}
