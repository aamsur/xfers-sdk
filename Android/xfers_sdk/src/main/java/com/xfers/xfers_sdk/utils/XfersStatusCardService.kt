package com.xfers.xfers_sdk.utils

import android.content.Context
import android.content.Intent
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
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
}
