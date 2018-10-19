package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration

// TODO: To be removed, only for initial integration purposes
class ComingSoonActivity : AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_coming_soon)

        title = "COMING SOON"

        firebaseAnalytics = FirebaseAnalytics.getInstance(this)

        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics?.logEvent("open_coming_soon", params)
    }

    fun onButtonClick(view: View) {
        finish()
    }
}
