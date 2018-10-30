package com.xfers.xfers_sdk.view.connect

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.task.ConnectOTPTask

class ConnectOTPActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_otp)

        title = getString(R.string.connect_flow_title)

        val xfersFullWidthButton = findViewById<Button>(R.id.xfersFullWidthButton)
        xfersFullWidthButton.setOnClickListener {
            val OTPTextField = findViewById<EditText>(R.id.enterOTPTextField)
            val OTP = OTPTextField.text.toString()

            ConnectOTPTask(this, OTP).execute()
        }

        // TODO: Make Resend OTP text view clickable and actually resend OTP
    }
}
