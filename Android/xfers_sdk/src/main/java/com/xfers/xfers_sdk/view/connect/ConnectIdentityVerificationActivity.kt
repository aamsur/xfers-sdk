package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ComingSoonActivity
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_summary_title.*

class ConnectIdentityVerificationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_identity_verification)

        title = getString(R.string.connect_identity_verification_title)

        extendedTopbarTextView.text = getString(R.string.connect_identity_verification_topbar_copy)
        xfersSummaryTitleTextView.text = getString(R.string.connect_identity_verification_summary_title)

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.status_success_50, R.color.clearBlue,
                        getString(R.string.connect_identity_verification_listview_topup_withdrawal_copy)
                ),
                ItemRowItem(
                        R.drawable.status_success_50, R.color.clearBlue,
                        getString(R.string.connect_identity_verification_listview_increased_holding_copy)
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter

        xfersDoubleButtonsNegativeButton.text = getString(R.string.later_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.proceed_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            startActivity(Intent(this, ComingSoonActivity::class.java))
        }
    }
}
