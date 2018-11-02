package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view_model.ConnectPhoneViewModel
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*

class ConnectPhoneActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_phone)

        title = getString(R.string.connect_flow_title)

        xfersFormInputPageTitle.visibility = View.GONE
        xfersFormInputFieldTitle.text = getString(R.string.mobile_phone_number_field_title)
        xfersFormInputEditText.hint = getString(R.string.phone_number_lorem_ipsum)
        xfersFormInputEditTextSubtitle.text = getString(R.string.connect_mobile_phone_number_subtitle)
        xfersFormInputNotesTextView.visibility = View.GONE

        val connectPhoneViewModel = ViewModelProviders.of(this).get(ConnectPhoneViewModel::class.java)

        xfersFullWidthButton.setOnClickListener {
            val phoneNumberTextField = findViewById<EditText>(R.id.xfersFormInputEditText)
            val userPhoneNumber = phoneNumberTextField.text.toString()

            connectPhoneViewModel.connectPhoneNumber(userPhoneNumber).observe(this, Observer<Boolean> {
                if (it) {
                    startActivity(Intent(this, ConnectOTPActivity::class.java))
                }
            })
        }
    }
}
