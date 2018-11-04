package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view_model.ConnectOTPViewModel
import kotlinx.android.synthetic.main.xfers_button.*

class ConnectOTPActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_otp)

        title = getString(R.string.connect_flow_title)

        val connectOTPViewModel = ViewModelProviders.of(this).get(ConnectOTPViewModel::class.java)

        xfersFullWidthButton.setOnClickListener {
            val OTPTextField = findViewById<EditText>(R.id.enterOTPTextField)
            val OTP = OTPTextField.text.toString()

            // Create the observer which updates the UI.
            val connectSuccessObserver = Observer<Boolean> { connectStatus ->
                if (connectStatus) {
                    startActivity(Intent(this, ConnectShareKYCActivity::class.java))
                }
            }

            // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
            connectOTPViewModel.connectOTP(OTP).observe(this, connectSuccessObserver)
        }

        // TODO: Make Resend OTP text view clickable and actually resend OTP
    }
}
