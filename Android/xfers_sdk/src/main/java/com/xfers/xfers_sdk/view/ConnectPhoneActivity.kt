package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.xfers.xfers_sdk.R

class ConnectPhoneActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_phone)

        title = "Link Xfers Account"
    }

    fun onClickBack(view: View) {
        finish()
    }

    fun onClickNext(view: View) {
        // TODO: Do nothing for now, to ping merchant's API URL and OTP page
        return
    }
}
