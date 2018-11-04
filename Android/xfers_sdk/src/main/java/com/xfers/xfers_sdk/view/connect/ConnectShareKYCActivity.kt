package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.content.res.ColorStateList
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import kotlinx.android.synthetic.main.activity_connect_share_kyc.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_merchant_xfers_logos.*

class ConnectShareKYCActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_share_kyc)

        title = getString(R.string.connect_flow_title)

        shareKYCMerchantAccessTextView.text = getString(R.string.connect_share_kyc_page_title_copy, XfersConfiguration.getMerchantName())

        XfersConfiguration.getMerchantLogo()?.let {
            merchantXfersLogoMerchantImageView.setImageResource(it)
        }
        merchantXfersLogoMerchantImageView.setColorFilter(ContextCompat.getColor(this, XfersConfiguration.getMerchantLogoTint()))

        xfersDoubleButtonsNegativeButton.text = getString(R.string.not_accept_button_copy)
        ViewCompat.setBackgroundTintList(xfersDoubleButtonsNegativeButton, ColorStateList.valueOf(ContextCompat.getColor(this, R.color.aquaMarine)))
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            // TODO: Does not do anything at the moment, pending backend API to remember reject
            // and restrict data shared upon rejection

             startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.accept_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Share KYC information with Merchant through piping data to their API

             startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }
    }
}
