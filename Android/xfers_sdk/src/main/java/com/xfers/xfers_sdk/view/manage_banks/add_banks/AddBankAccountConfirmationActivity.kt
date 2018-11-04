package com.xfers.xfers_sdk.view.manage_banks.add_banks

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_add_bank_account_confirmation.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_form_input.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class AddBankAccountConfirmationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_bank_account_confirmation)

        title = getString(R.string.add_bank_account_title)

        addBankAccountConfirmationTitleTextView.text = getString(R.string.add_bank_account_confirmation_title)

        val textRowItems = listOf(
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_bank_name_to_copy),
                getString(R.string.add_bank_account_confirmation_bank_name_to_ipsum_copy)
            ),
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_holder_name_id_copy),
                getString(R.string.add_bank_account_confirmation_holder_name_id_ipsum_copy)
            ),
            TextRowItem(
                getString(R.string.add_bank_account_confirmation_account_no_copy),
                getString(R.string.add_bank_account_confirmation_account_no_ipsum_copy)
            )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        xfersFullWidthButton.text = getString(R.string.submit_button_copy)
        // xfersFullWidthButton.setOnClickListener {
        //     startActivity(Intent(this, ::class.java))
        // }
    }
}
