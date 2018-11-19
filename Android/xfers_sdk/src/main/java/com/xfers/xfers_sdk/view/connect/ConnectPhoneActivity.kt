package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view_model.ConnectPhoneViewModel
import kotlinx.android.synthetic.main.activity_connect_otp.*
import kotlinx.android.synthetic.main.activity_connect_phone.*
import kotlinx.android.synthetic.main.xfers_button.*

class ConnectPhoneActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_phone)

        title = getString(R.string.connect_flow_title)

        connectPhoneTextView.text = getString(R.string.connect_mobile_phone_number_field_title)
        connectPhoneEditTextField.hint = getString(R.string.phone_number_lorem_ipsum)

        val context = this

        connectPhoneSubtitleTextView.text = buildSpannedString {
            append(getString(R.string.connect_mobile_phone_number_subtitle_part_1, XfersConfiguration.getMerchantName(), XfersConfiguration.getMerchantName()))
            append(" ")
            color(ContextCompat.getColor(context, R.color.clearBlue)) {
                append(getString(R.string.connect_mobile_phone_number_subtitle_privacy_policy_copy))
            }
            append(getString(R.string.connect_mobile_phone_number_subtitle_part_2))
        }
        connectPhoneSubtitleTextView.setOnClickListener {
            Toast.makeText(this, "Privacy policy coming soon.", Toast.LENGTH_SHORT).show()
        }

        val connectPhoneViewModel = ViewModelProviders.of(this).get(ConnectPhoneViewModel::class.java)

        connectPhoneXfersProgressBar.visibility = View.GONE
        connectPhoneTextView.visibility = View.VISIBLE
        connectPhoneEditTextField.visibility = View.VISIBLE
        connectPhoneSubtitleTextView.visibility = View.VISIBLE
        connectPhoneButtonView.visibility = View.VISIBLE
        connectPhonePoweredByXfersView.visibility = View.VISIBLE

        // Create the observer which updates the UI.
        val connectSuccessObserver = Observer<Boolean> { connectStatus ->
            if (connectStatus) {
                startActivity(Intent(this, ConnectOTPActivity::class.java))
            }
        }

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        connectPhoneViewModel.connectPhoneSuccess.observe(this, connectSuccessObserver)

        xfersFullWidthButton.setOnClickListener {
            connectPhoneXfersProgressBar.visibility = View.VISIBLE
            connectPhoneTextView.visibility = View.GONE
            connectPhoneEditTextField.visibility = View.GONE
            connectPhoneSubtitleTextView.visibility = View.GONE
            connectPhoneButtonView.visibility = View.GONE
            connectPhonePoweredByXfersView.visibility = View.GONE

            val userPhoneNumber = connectPhoneEditTextField.text.toString()

            connectPhoneViewModel.connectPhoneNumber(userPhoneNumber)
        }
    }
}
