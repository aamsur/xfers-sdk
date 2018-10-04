package com.xfers.xfers_sdk.view

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.task.UpdateTextWithUserDetails
import com.xfers.xfers_sdk.utils.XfersConfiguration
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    private val apiKey = "PLACE YOUR API KEY HERE"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        XfersConfiguration.setSGSandbox()
        XfersConfiguration.apiKey = apiKey

        UpdateTextWithUserDetails(this.text, this).execute()
    }
}
