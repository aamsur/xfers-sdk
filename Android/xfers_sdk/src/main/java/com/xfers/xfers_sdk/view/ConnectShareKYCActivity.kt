package com.xfers.xfers_sdk.view

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration

class ConnectShareKYCActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_share_kyc)

        title = "Link Xfers Account"

        // TODO: Add Xfers logo to placeholder
        // TODO: Populate Merchant logo placeholder

        val merchantAccessTextView = findViewById<TextView>(R.id.shareKYCMerchantAccessTextView)
        merchantAccessTextView.text = "${XfersConfiguration.getMerchantName()} would like to access your personal information from your Xfers account"

        val sharedInformationTextView = findViewById<TextView>(R.id.shareKYCSharedInformationTextView)
        sharedInformationTextView.text = listOf("Name", "Birthdate", "Nationality", "Location", "KTP", "Proof of Address").joinToString(separator = "\n")
    }

    // TODO: To be replaced with Android "Back" and "Up"
    fun onClickBack(view: View) {
        finish()
    }

    fun onClickReject(view: View) {
        // TODO: Does not do anything at the moment, pending backend API to remember reject
        // and restrict data shared upon rejection

        startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
    }

    fun onClickAccept(view: View) {
        // TODO: Share KYC information with Merchant through piping data to their API

        startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
    }
}
