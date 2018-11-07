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
                        "statusIconImage" to R.drawable.status_wip_60,
                        "extendedTopbarBackgroundColor" to R.color.lightGray,
                        "statusIconImage" to R.drawable.status_wip_60,
                        "statusIconImageColorFilter" to R.color.lightGray,
                        "showMerchantXfersLogos" to false,
                        "cardText" to cardText,
                        "buttonText" to context.getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName())
                )
        )

        context.startActivity(comingSoonIntent)
    }
}
