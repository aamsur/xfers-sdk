package com.xfers.xfers_sdk.view.shared

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import androidx.core.content.ContextCompat
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_card_activity.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_merchant_xfers_logos.*

/**
 * Usage example:
 *   val i = Intent(context, StatusCardActivityBase::class.java)
 *   i.putExtra("statusCardConfig",
 *     hashMapOf(
 *         "cardPageTitle" to "",
 *         "extendedTopbarBackgroundColor" to "",
 *         "statusIconImage" to "",
 *         "statusIconImageColorFilter" to "",
 *         "showMerchantXfersLogos" to "",
 *         "cardText" to "",
 *         "buttonText" to "",
 *         "buttonClick" to ""
 *     )
 *   )
 */
open class StatusCardBaseActivity: AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null

    private var cardPageTitle = "Sample Page Title"

    private var extendedTopbarBackgroundColor = R.color.clearBlue

    private var statusIconImage = R.drawable.status_wip_60
    private var statusIconImageColorFilter: Int? = null // Defaults to no tint

    private var showMerchantXfersLogos = false

    private var cardText: CharSequence = "Sample Card Text"

    private var buttonText: CharSequence = "Sample Button Text"
    private var buttonClickReturnToMerchant = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_status_card_base)

        initFireBase()

        initViewConfig()

        setCardPageTitle()
        setExtendedTopbarColorAndVisibility()
        setCardImageIconAndColor()
        setMerchantXfersLogos()
        setStatusText()
        setButtonText()
        applyButtonClickListener()
    }

    private fun initFireBase() {
        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics = FirebaseAnalytics.getInstance(this)
        firebaseAnalytics?.logEvent("open_status_card", params)
    }

    private fun initViewConfig() {
        val viewConfig = intent.getSerializableExtra("statusCardConfig") as HashMap<*, *>

        (viewConfig["cardPageTitle"] as? String)?.let {
            cardPageTitle = it
        }

        (viewConfig["extendedTopbarBackgroundColor"] as? Int)?.let {
            extendedTopbarBackgroundColor = it
        }

        (viewConfig["statusIconImage"] as? Int)?.let {
            statusIconImage = it
        }

        (viewConfig["statusIconImageColorFilter"] as? Int)?.let {
            statusIconImageColorFilter = it
        }

        (viewConfig["showMerchantXfersLogos"] as? Boolean)?.let {
            showMerchantXfersLogos = it
        }

        (viewConfig["cardText"] as? CharSequence)?.let {
            cardText = it
        }

        (viewConfig["buttonText"] as? CharSequence)?.let {
            buttonText = it
        }

        (viewConfig["buttonClickReturnToMerchant"] as? Boolean)?.let {
            buttonClickReturnToMerchant = it
        }
    }

    private fun setCardPageTitle() {
        title = cardPageTitle
    }

    private fun setExtendedTopbarColorAndVisibility() {
        extendedTopbarBackgroundView.setBackgroundColor(ContextCompat.getColor(this, extendedTopbarBackgroundColor))

        // We are using it purely for Background. No need text and relevant constraints.
        extendedTopbarTextView.visibility = View.GONE
    }

    private fun setCardImageIconAndColor() {
        cardActivityIconImageView.setImageResource(statusIconImage)

        statusIconImageColorFilter?.let {
            cardActivityIconImageView.setColorFilter(ContextCompat.getColor(this, it))
        }
    }

    private fun setMerchantXfersLogos() {
        if (showMerchantXfersLogos) {
            XfersConfiguration.getMerchantLogo()?.let {
                merchantXfersLogoMerchantImageView.setImageResource(it)
            }
            merchantXfersLogoMerchantImageView.setColorFilter(ContextCompat.getColor(this, XfersConfiguration.getMerchantLogoTint()))
        } else {
            merchantXfersLogoMerchantImageView.visibility = View.GONE
            merchantXfersLogoXfersImageView.visibility = View.GONE
        }
    }

    private fun setStatusText() {
        cardActivityTextView.text = cardText
    }

    private fun setButtonText() {
        xfersFullWidthButton.text = buttonText
    }

    private fun applyButtonClickListener() {
        if (buttonClickReturnToMerchant) {
            xfersFullWidthButton.setOnClickListener { this.startActivity(Intent(this, XfersConfiguration.getMerchantFlowStartingContextClass())) }
        } else {
            xfersFullWidthButton.setOnClickListener { finish() }
        }
    }
}
