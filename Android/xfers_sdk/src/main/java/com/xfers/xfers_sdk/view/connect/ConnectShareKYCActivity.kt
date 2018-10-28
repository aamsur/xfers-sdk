package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.content.res.ColorStateList
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v4.view.ViewCompat
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration

class ConnectShareKYCActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_share_kyc)

        title = getString(R.string.connect_flow_title)

        val merchantAccessTextView = findViewById<TextView>(R.id.shareKYCMerchantAccessTextView)
        merchantAccessTextView.text = getString(R.string.connect_share_kyc_page_title_copy, XfersConfiguration.getMerchantName())

        val merchantLogoImageView = findViewById<ImageView>(R.id.merchantXfersLogoMerchantImageView)
        XfersConfiguration.getMerchantLogo()?.let {
            merchantLogoImageView.setImageResource(it)
        }
        merchantLogoImageView.setColorFilter(ContextCompat.getColor(this, XfersConfiguration.getMerchantLogoTint()))

        val xfersDoubleButtonsNegativeButton = findViewById<Button>(R.id.xfersDoubleButtonsNegativeButton)
        xfersDoubleButtonsNegativeButton.text = getString(R.string.not_accept_button_copy)
        ViewCompat.setBackgroundTintList(xfersDoubleButtonsNegativeButton, ColorStateList.valueOf(ContextCompat.getColor(this, R.color.aquaMarine)))
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            // TODO: Does not do anything at the moment, pending backend API to remember reject
            // and restrict data shared upon rejection

             startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }

        val xfersDoubleButtonsPositiveButton = findViewById<Button>(R.id.xfersDoubleButtonsPositiveButton)
        xfersDoubleButtonsPositiveButton.text = getString(R.string.accept_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Share KYC information with Merchant through piping data to their API

             startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }
    }
}
