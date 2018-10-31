package com.xfers.xfers_sdk.view.shared

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import android.text.Spannable
import android.graphics.Typeface
import android.support.v4.content.ContextCompat
import android.text.style.StyleSpan
import android.text.SpannableString
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_card_activity.*

// TODO: To be removed, only for initial integration purposes
class ComingSoonActivity : AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_coming_soon)

        firebaseAnalytics = FirebaseAnalytics.getInstance(this)

        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics?.logEvent("open_coming_soon", params)

        title = getString(R.string.coming_soon_title)

        cardActivityIconImageView.setImageResource(R.drawable.status_wip_60)
        cardActivityIconImageView.setColorFilter(ContextCompat.getColor(this, R.color.lightGray))

        val boldText = getString(R.string.coming_soon_subtitle)
        val normalText = getString(R.string.coming_soon_copy)
        val combinedText = SpannableString("$boldText\n\n$normalText")
        combinedText.setSpan(StyleSpan(Typeface.BOLD), 0, boldText.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)

        cardActivityTextView.text = combinedText

        xfersFullWidthButton.text = getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName())
        xfersFullWidthButton.setOnClickListener {
            finish()
        }
    }
}
