package com.xfers.xfers_sdk.view

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.task.UpdateTextWithUserDetails
import com.xfers.xfers_sdk.utils.XfersConfiguration
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Xfers(this).config.setSGSandbox()

        // TODO: Build on top of sample code, deactivated for now
        // UpdateTextWithUserDetails(this.text, this).execute()
    }

    fun onButtonClick(view: View) {
        Xfers(this).ui.startComingSoonActivity()
    }
}
