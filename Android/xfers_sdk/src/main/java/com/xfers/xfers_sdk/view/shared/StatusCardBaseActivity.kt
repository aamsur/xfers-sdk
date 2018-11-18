package com.xfers.xfers_sdk.view.shared

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import androidx.core.content.ContextCompat
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view.manage_banks.ManageBankAccountsActivity
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity
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
    private var buttonClickGoToTopup = false
    private var buttonClickGoToManageBanks = false

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
        val viewConfig = intent.getSerializableExtra(StatusCardBaseActivityConstants.statusCardConfig) as HashMap<*, *>

        (viewConfig[StatusCardBaseActivityConstants.cardPageTitle] as? String)?.let {
            cardPageTitle = it
        }

        (viewConfig[StatusCardBaseActivityConstants.extendedTopbarBackgroundColor] as? Int)?.let {
            extendedTopbarBackgroundColor = it
        }

        (viewConfig[StatusCardBaseActivityConstants.statusIconImage] as? Int)?.let {
            statusIconImage = it
        }

        (viewConfig[StatusCardBaseActivityConstants.statusIconImageColorFilter] as? Int)?.let {
            statusIconImageColorFilter = it
        }

        (viewConfig[StatusCardBaseActivityConstants.showMerchantXfersLogos] as? Boolean)?.let {
            showMerchantXfersLogos = it
        }

        (viewConfig[StatusCardBaseActivityConstants.cardText] as? CharSequence)?.let {
            cardText = it
        }

        (viewConfig[StatusCardBaseActivityConstants.buttonText] as? CharSequence)?.let {
            buttonText = it
        }

        (viewConfig[StatusCardBaseActivityConstants.buttonClickReturnToMerchant] as? Boolean)?.let {
            buttonClickReturnToMerchant = it
        }

        (viewConfig[StatusCardBaseActivityConstants.buttonClickGoToTopup] as? Boolean)?.let {
            buttonClickGoToTopup = it
        }

        (viewConfig[StatusCardBaseActivityConstants.buttonClickGoToManageBanks] as? Boolean)?.let {
            buttonClickGoToManageBanks = it
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
        // FIXME: Design a better way for status card buttons to know where to navgiate to when clicked
        if (buttonClickGoToTopup) {
            xfersFullWidthButton.setOnClickListener { this.startActivity(Intent(this, TopupBankSelectionActivity::class.java)) }
            return
        }

        if (buttonClickGoToManageBanks) {
            xfersFullWidthButton.setOnClickListener { this.startActivity(Intent(this, ManageBankAccountsActivity::class.java)) }
            return
        }

        if (buttonClickReturnToMerchant) {
            xfersFullWidthButton.setOnClickListener { this.startActivity(Intent(this, XfersConfiguration.getMerchantFlowStartingContextClass())) }
        } else {
            xfersFullWidthButton.setOnClickListener { finish() }
        }
    }
}

object StatusCardBaseActivityConstants {
    const val statusCardConfig = "statusCardConfig"
    const val cardPageTitle = "cardPageTitle"
    const val extendedTopbarBackgroundColor = "extendedTopbarBackgroundColor"
    const val statusIconImage = "statusIconImage"
    const val statusIconImageColorFilter = "statusIconImageColorFilter"
    const val showMerchantXfersLogos = "showMerchantXfersLogos"
    const val cardText = "cardText"
    const val buttonText = "buttonText"
    const val buttonClickReturnToMerchant = "buttonClickReturnToMerchant"
    const val buttonClickGoToTopup = "buttonClickGoToTopup"
    const val buttonClickGoToManageBanks = "buttonClickGoToManageBanks"
}
