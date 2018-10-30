package com.xfers.xfers_sdk.view.connect

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import com.xfers.xfers_sdk.R
import android.widget.TextView
import com.xfers.xfers_sdk.task.ConnectPhoneTask

class ConnectPhoneActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_phone)

        title = getString(R.string.connect_flow_title)

        val formInputPageTitle = findViewById<TextView>(R.id.xfersFormInputPageTitle)
        formInputPageTitle.visibility = View.GONE

        val formInputFieldTitle = findViewById<TextView>(R.id.xfersFormInputFieldTitle)
        formInputFieldTitle.text = getString(R.string.mobile_phone_number_field_title)

        val formInputEditText = findViewById<EditText>(R.id.xfersFormInputEditText)
        formInputEditText.hint = getString(R.string.phone_number_lorem_ipsum)

        val formInputEditTextSubtitle = findViewById<TextView>(R.id.xfersFormInputEditTextSubtitle)
        formInputEditTextSubtitle.text = getString(R.string.connect_mobile_phone_number_subtitle)

        val formInputNotesTextView = findViewById<TextView>(R.id.xfersFormInputNotesTextView)
        formInputNotesTextView.visibility = View.GONE

        val xfersFullWidthButton = findViewById<Button>(R.id.xfersFullWidthButton)
        xfersFullWidthButton.setOnClickListener {
            val phoneNumberTextField = findViewById<EditText>(R.id.xfersFormInputEditText)
            val userPhoneNumber = phoneNumberTextField.text.toString()

            ConnectPhoneTask(this, userPhoneNumber).execute()
        }
    }
}
