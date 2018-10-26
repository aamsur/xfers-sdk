package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.Button
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ComingSoonActivity
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter

class ConnectIdentityVerificationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_identity_verification)

        title = getString(R.string.connect_identity_verification_title)

        val extendedTopbarTextView = findViewById<TextView>(R.id.extendedTopbarTextView)
        extendedTopbarTextView.text = getString(R.string.connect_identity_verification_topbar_copy)

        val xfersSummaryTitleTextView = findViewById<TextView>(R.id.xfersSummaryTitleTextView)
        xfersSummaryTitleTextView.text = getString(R.string.connect_identity_verification_summary_title)

        val icons = arrayListOf(
                R.drawable.status_success_50,
                R.drawable.status_success_50
        )
        val iconTints = arrayListOf(
                R.color.clearBlue,
                R.color.clearBlue
        )
        val copies = arrayListOf(
                getString(R.string.connect_identity_verification_listview_topup_withdrawal_copy),
                getString(R.string.connect_identity_verification_listview_increased_holding_copy)
        )

        val listViewRecyclerView = findViewById<RecyclerView>(R.id.listViewRecyclerView)
        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, icons, iconTints, copies)
        listViewRecyclerView.adapter = adapter

        val xfersDoubleButtonsNegativeButton = findViewById<Button>(R.id.xfersDoubleButtonsNegativeButton)
        xfersDoubleButtonsNegativeButton.text = getString(R.string.later_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
        }

        val xfersDoubleButtonsPositiveButton = findViewById<Button>(R.id.xfersDoubleButtonsPositiveButton)
        xfersDoubleButtonsPositiveButton.text = getString(R.string.proceed_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            startActivity(Intent(this, ComingSoonActivity::class.java))
        }
    }
}
