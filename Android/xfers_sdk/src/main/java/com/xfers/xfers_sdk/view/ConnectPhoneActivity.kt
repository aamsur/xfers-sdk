package com.xfers.xfers_sdk.view

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.xfers.xfers_sdk.R
import android.widget.TextView
import com.xfers.xfers_sdk.utils.XfersConfiguration

class ConnectPhoneActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_phone)

        title = "Link Xfers Account"

        // TODO: To be removed, for proof of concept only
        val merchantTextView = findViewById<TextView>(R.id.phoneNumberMerchantTextView)
        merchantTextView.text = "Connecting to ${XfersConfiguration.getMerchantName()}"
    }

    fun onClickBack(view: View) {
        finish()
    }

    fun onClickNext(view: View) {
        // TODO: Ping merchant's connect phone number API URL

        startActivity(Intent(this, ConnectOTPActivity::class.java))
    }
}
