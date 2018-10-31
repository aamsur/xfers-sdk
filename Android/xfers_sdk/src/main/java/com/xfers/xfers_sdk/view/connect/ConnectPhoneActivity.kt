package com.xfers.xfers_sdk.view.connect

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.task.ConnectPhoneTask
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

        xfersFullWidthButton.setOnClickListener {
            val phoneNumberTextField = findViewById<EditText>(R.id.xfersFormInputEditText)
            val userPhoneNumber = phoneNumberTextField.text.toString()

            ConnectPhoneTask(this, userPhoneNumber).execute()
        }
    }
}
