package com.xfers.xfers_sdk.view.connect

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.View
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ComingSoonActivity
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter

class ConnectIdentityVerificationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_connect_identity_verification)

        val icons = arrayListOf(R.drawable.status_success_50, R.drawable.status_success_50)
        val copies = arrayListOf("Top-ups & Withdrawals", "An increased holding limit of XXX.XXX")

        val listViewRecyclerView = findViewById<RecyclerView>(R.id.listViewRecyclerView)
        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(icons, copies)
        listViewRecyclerView.adapter = adapter

        title = "Identity Verification"

        val extendedTopbarTextView = findViewById<TextView>(R.id.extendedTopbarTextView)
        extendedTopbarTextView.text = getString(R.string.connect_identity_verification_topbar_copy)
    }

    fun onClickReject(view: View) {
        startActivity(Intent(this, ConnectLinkSuccessfulActivity::class.java))
    }

    fun onClickProceed(view: View) {
        startActivity(Intent(this, ComingSoonActivity::class.java))
    }
}
