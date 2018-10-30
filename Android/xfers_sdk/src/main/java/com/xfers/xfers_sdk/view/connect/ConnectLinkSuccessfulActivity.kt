package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.view.View
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import kotlinx.android.synthetic.main.activity_connect_link_successful.*
import kotlinx.android.synthetic.main.xfers_merchant_xfers_logos.*

class ConnectLinkSuccessfulActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_link_successful)

        linkSuccessfulMerchantTextView.text = "Your Xfers account has now been successfully linked to ${XfersConfiguration.getMerchantName()}."
        linkSuccessfulReturnButton.text = "Return to ${XfersConfiguration.getMerchantName()}"

        XfersConfiguration.getMerchantLogo()?.let {
            merchantXfersLogoMerchantImageView.setImageResource(it)
        }
        merchantXfersLogoMerchantImageView.setColorFilter(ContextCompat.getColor(this, XfersConfiguration.getMerchantLogoTint()))
    }

    fun onClickReturn(view: View) {
        startActivity(Intent(this, XfersConfiguration.getMerchantFlowStartingContextClass()))
    }
}
