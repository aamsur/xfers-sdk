package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import com.google.firebase.analytics.FirebaseAnalytics
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration

// TODO: To be removed, only for initial integration purposes
class ComingSoonActivity : AppCompatActivity() {

    private var firebaseAnalytics: FirebaseAnalytics? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_coming_soon)

        firebaseAnalytics = FirebaseAnalytics.getInstance(this)

        val params = Bundle()
        params.putString("merchant_name", XfersConfiguration.getMerchantName())
        firebaseAnalytics?.logEvent("open_coming_soon", params)

        title = getString(R.string.coming_soon_title)

        val comingSoonBackButton = findViewById<Button>(R.id.comingSoonBackButton)
        comingSoonBackButton.text = getString(R.string.coming_soon_return_copy, XfersConfiguration.getMerchantName())
    }

    fun onButtonClick(view: View) {
        finish()
    }
}
