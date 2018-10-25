package com.xfers.xfers_sdk.view.connect

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.task.ConnectOTPTask

class ConnectOTPActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_otp)

        title = "Link Xfers Account"
    }

    // TODO: To be replaced with Android "Back" and "Up"
    fun onClickBack(view: View) {
        finish()
    }

    fun onClickNext(view: View) {
        val OTPTextField = findViewById<EditText>(R.id.enterOTPTextField)
        val OTP = OTPTextField.text.toString()

        ConnectOTPTask(this, OTP).execute()
    }
}
