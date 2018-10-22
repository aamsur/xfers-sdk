package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration

class ConnectLinkSuccessfulActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_link_successful)

        val merchantTextView = findViewById<TextView>(R.id.linkSuccessfulMerchantTextView)
        merchantTextView.text = "Your Xfers account has now been successfully linked to ${XfersConfiguration.getMerchantName()}."

        val returnButton = findViewById<TextView>(R.id.linkSuccessfulReturnButton)
        returnButton.text = "Return to ${XfersConfiguration.getMerchantName()}"

        val merchantLogoImageView = findViewById<ImageView>(R.id.linkSuccessfulMerchantLogoImageView)
        merchantLogoImageView.setColorFilter(XfersConfiguration.getMerchantLogoTint())
    }

    fun onClickReturn(view: View) {
        // TODO: Pop back to Merchant's context, finish() for now
        finish()
    }
}
