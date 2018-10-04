package com.xfers.xfers_sdk

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    private val apiKey = "PLACE YOUR API KEY HERE"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        XfersConfiguration.apiKey = apiKey

        // POC with open API
        UpdateTextWithAdviceTask(this.text).execute()
    }
}
