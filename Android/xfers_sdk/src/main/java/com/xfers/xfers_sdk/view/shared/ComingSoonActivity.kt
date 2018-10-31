package com.xfers.xfers_sdk.view.shared

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import androidx.core.content.ContextCompat
import android.text.SpannedString
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
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

        val comingSoonText: SpannedString = buildSpannedString {
            bold {
                append(getString(R.string.coming_soon_subtitle))
            }
            append("\n\n")
            append(getString(R.string.coming_soon_copy))
        }

        cardActivityTextView.text = comingSoonText

        xfersFullWidthButton.text = getString(R.string.return_to_merchant_copy, XfersConfiguration.getMerchantName())
        xfersFullWidthButton.setOnClickListener {
            finish()
        }
    }
}
