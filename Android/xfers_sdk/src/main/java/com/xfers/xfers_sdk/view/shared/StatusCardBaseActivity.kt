package com.xfers.xfers_sdk.view.shared

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

/**
 * Usage example:
 *   val i = Intent(context, StatusCardActivityBase::class.java)
 *   i.putExtra("statusCardConfig",
 *     hashMapOf(
 *         "cardPageTitle" to "",
 *         "statusIconImage" to "",
 *         "statusIconImageColorFilter" to "",
 *         "cardText" to "",
 *         "buttonText" to "",
 *         "buttonClick" to ""
 *     )
 *   )
 */
open class StatusCardBaseActivity: AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null

    private var cardPageTitle: String = "Sample Page Title"

    private var statusIconImage: Int = R.drawable.status_wip_60
    private var statusIconImageColorFilter: Int? = null // Defaults to no tint

    private var cardText: CharSequence = "Sample Card Text"

    private var buttonText: CharSequence = "Sample Button Text"
    private var buttonClick: (View) -> Unit = { finish() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_status_card_base)

        // We are using it purely for Background. No need text and relevant constraints.
        extendedTopbarTextView.visibility = View.GONE

        initFireBase()

        initViewConfig()

        setCardPageTitle()
        setCardImageIcon()
        setStatusText()
        setButtonText()
        applyButtonClickListener()
    }

    private fun initFireBase() {
        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics = FirebaseAnalytics.getInstance(this)
        firebaseAnalytics?.logEvent("open_coming_soon", params)
    }

    private fun initViewConfig() {
        val viewConfig = intent.getSerializableExtra("statusCardConfig") as HashMap<*, *>

        (viewConfig["cardPageTitle"] as? String)?.let {
            cardPageTitle = it
        }

        (viewConfig["statusIconImage"] as? Int)?.let {
            statusIconImage = it
        }

        (viewConfig["statusIconImageColorFilter"] as? Int)?.let {
            statusIconImageColorFilter = it
        }

        (viewConfig["cardText"] as? CharSequence)?.let {
            cardText = it
        }

        (viewConfig["buttonText"] as? CharSequence)?.let {
            buttonText = it
        }

        (viewConfig["buttonClick"] as? (View) -> Unit)?.let {
            buttonClick = it
        }
    }

    private fun setCardPageTitle() {
        title = cardPageTitle
    }

    private fun applyButtonClickListener() {
        xfersFullWidthButton.setOnClickListener { buttonClick(it) }
    }

    private fun setButtonText() {
        xfersFullWidthButton.text = buttonText
    }

    private fun setStatusText() {
        cardActivityTextView.text = cardText
    }

    private fun setCardImageIcon() {
        cardActivityIconImageView.setImageResource(statusIconImage)

        statusIconImageColorFilter?.let {
            cardActivityIconImageView.setColorFilter(ContextCompat.getColor(this, it))
        }
    }
}
