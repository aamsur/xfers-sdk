package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.content.ContextCompat
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

        val merchantLogoImageView = findViewById<ImageView>(R.id.merchantXfersLogoMerchantImageView)
        XfersConfiguration.getMerchantLogo()?.let {
            merchantLogoImageView.setImageResource(it)
        }
        merchantLogoImageView.setColorFilter(ContextCompat.getColor(this, XfersConfiguration.getMerchantLogoTint()))
    }

    fun onClickReturn(view: View) {
        startActivity(Intent(this, XfersConfiguration.getMerchantFlowStartingContextClass()))
    }
}
