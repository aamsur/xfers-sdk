package com.xfers.xfers_sdk.view

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import com.xfers.xfers_sdk.R
import android.widget.TextView
import com.xfers.xfers_sdk.task.ConnectPhoneTask
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

    // TODO: To be replaced with Android "Back" and "Up"
    fun onClickBack(view: View) {
        finish()
    }

    fun onClickNext(view: View) {
        val phoneNumberTextField = findViewById<EditText>(R.id.editPhoneNumberTextField)
        val userPhoneNumber = phoneNumberTextField.text.toString()

        ConnectPhoneTask(this, userPhoneNumber).execute()
    }
}
