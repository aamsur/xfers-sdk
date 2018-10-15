package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.xfers.xfers_sdk.R

class ComingSoonActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_coming_soon)
    }

    fun onButtonClick(view: View) {
        finish()
    }
}
