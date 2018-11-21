package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.CustomTabsIntent
import androidx.core.content.ContextCompat
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import kotlinx.android.synthetic.main.activity_connect_terms_of_service.*
import kotlinx.android.synthetic.main.xfers_button.*

class ConnectTermsOfServiceActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_terms_of_service)

        title = getString(R.string.connect_flow_signup_title)

        connectTermsOfServiceMainCopyTextView.text = getString(R.string.connect_flow_signup_main_copy, XfersConfiguration.getMerchantName(), XfersConfiguration.getMerchantName())

        val context = this

        connectTermsOfServiceSubtitleCopyTextView.text = buildSpannedString {
            append(getString(R.string.connect_flow_signup_subtitle_copy))
            append(" ")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(getString(R.string.connect_flow_signup_subtitle_terms_of_service_copy))
            }
            append(".")
        }

        val builder = CustomTabsIntent.Builder()
        val customTabsIntent = builder.build()

        connectTermsOfServiceSubtitleCopyTextView.setOnClickListener {
            customTabsIntent.launchUrl(this, Uri.parse("https://www.xfers.com/id/en/terms-of-service/"))
        }

        xfersFullWidthButton.text = getString(R.string.proceed_button_copy)
        xfersFullWidthButton.setOnClickListener {
            startActivity(Intent(this, ConnectPhoneActivity::class.java))
        }
    }
}
