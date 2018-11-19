package com.xfers.xfers_sdk.view.connect

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view_model.ConnectOTPViewModel
import kotlinx.android.synthetic.main.activity_connect_otp.*
import kotlinx.android.synthetic.main.xfers_button.*

class ConnectOTPActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_otp)

        title = getString(R.string.connect_flow_title)

        val connectOTPViewModel = ViewModelProviders.of(this).get(ConnectOTPViewModel::class.java)

        // Create the observer which updates the UI.
        val connectSuccessObserver = Observer<Boolean> { connectStatus ->
            if (connectStatus) {
                XfersStatusCardService(this).presentConnectLinkSuccessfulStatusCard()
            }
        }

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        connectOTPViewModel.connectOTPSuccess.observe(this, connectSuccessObserver)

        connectOTPXfersProgressBar.visibility = View.GONE
        enterOTPTextView.visibility = View.VISIBLE
        enterOTPTextField.visibility = View.VISIBLE
        connectOTPButtonView.visibility = View.VISIBLE
        connectOTPResentOTPTextView.visibility = View.VISIBLE
        connectOTPPoweredByXfersView.visibility = View.VISIBLE

        xfersFullWidthButton.setOnClickListener {
            connectOTPXfersProgressBar.visibility = View.VISIBLE
            enterOTPTextView.visibility = View.GONE
            enterOTPTextField.visibility = View.GONE
            connectOTPButtonView.visibility = View.GONE
            connectOTPResentOTPTextView.visibility = View.GONE
            connectOTPPoweredByXfersView.visibility = View.GONE

            val OTP = enterOTPTextField.text.toString()

            connectOTPViewModel.connectOTP(OTP)
        }

        connectOTPResentOTPTextView.setOnClickListener {
            // TODO: Make Resend OTP text view actually resend OTP
            Toast.makeText(this, "Resend OTP feature coming soon", Toast.LENGTH_SHORT).show()
        }
    }
}
