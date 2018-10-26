package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ComingSoonActivity

class ConnectIdentityVerificationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_identity_verification)

        title = "Identity Verification"

        val extendedTopbarTextView = findViewById<TextView>(R.id.extendedTopbarTextView)
        extendedTopbarTextView.text = getString(R.string.connect_identity_verification_topbar_copy)
    }

    // TODO: To be removed, for development purposes only
    fun onClickBack(view: View) {
        finish()
    }

    fun onClickReject(view: View) {
        startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
    }

    fun onClickProceed(view: View) {
        startActivity(Intent(this, ComingSoonActivity::class.java))
    }
}
