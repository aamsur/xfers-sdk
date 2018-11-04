package com.xfers.xfers_sdk.view.shared

import android.content.Context
import android.graphics.Typeface
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.text.Spannable
import android.text.SpannableString
import android.text.style.StyleSpan
import android.util.Log
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.gson.Gson
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration


/**
 * This class is meant to be subclassed.
 * Each subclass will change the background color + icon image.
 * The rest of the text should be customisable.
 */
open class StatusCardBase: AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null
    open var statusIconImage: Int = R.drawable.status_wip_60
    open var statusIconImageColorFilter: Int = R.color.lightGray
    open var boldText: String = "Base Text"
    open var normalText: String = "Base Text"
    open var buttonText: String = "Base Text"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_status_card_base)

        val extendedTopbarTextView = findViewById<TextView>(R.id.extendedTopbarTextView)
        extendedTopbarTextView.text = "" // we are using it purely for Background. No need text.

        initFireBase()

        title = getString(R.string.status_card_base_title)
        setCardImageIcon()
        setStatusText()
        setButtonText()
        applyButtonClickListener()
    }

    private fun applyButtonClickListener() {
        val xfersFullWidthButton = findViewById<Button>(R.id.xfersFullWidthButton)
        xfersFullWidthButton.setOnClickListener { finish() }
    }

    private fun setButtonText() {
        val xfersFullWidthButton = findViewById<Button>(R.id.xfersFullWidthButton)
        xfersFullWidthButton.text = this.buttonText
    }

    private fun setStatusText() {
        // Set Content
        val combinedText = SpannableString("${this.boldText}\n\n${this.normalText}")
        combinedText.setSpan(StyleSpan(Typeface.BOLD), 0, boldText.length,
                Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
        // Apply to view
        val comingSoonTextView = findViewById<TextView>(R.id.cardActivityTextView)
        comingSoonTextView.text = combinedText
    }

    private fun setCardImageIcon() {
        val imageViewIcon = findViewById<ImageView>(R.id.cardActivityIconImageView)
        imageViewIcon.setImageResource(this.statusIconImage)
        imageViewIcon.setColorFilter(ContextCompat.getColor(this, statusIconImageColorFilter))
    }

    private fun initFireBase() {
        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics = FirebaseAnalytics.getInstance(this)
        firebaseAnalytics?.logEvent("open_coming_soon", params)
    }

}
