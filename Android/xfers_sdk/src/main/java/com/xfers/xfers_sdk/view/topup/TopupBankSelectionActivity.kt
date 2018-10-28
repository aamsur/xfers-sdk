package com.xfers.xfers_sdk.view.topup

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.TextView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter

class TopupBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_bank_selection)

        title = getString(R.string.topup_bank_selection_title)

        val topupBankSelectionPageTitleTextView = findViewById<TextView>(R.id.topupBankSelectionPageTitleTextView)
        topupBankSelectionPageTitleTextView.text = getString(R.string.topup_bank_selection_page_title)

        val icons = arrayListOf(
                R.drawable.bank_acc_28,
                R.drawable.bank_acc_28
        )
        val iconTints = arrayListOf(
                R.color.black,
                R.color.black
        )
        val copies = arrayListOf(
                getString(R.string.topup_bank_selection_bank_ipsum),
                getString(R.string.topup_bank_selection_bank_ipsum)
        )

        // TODO: To give each row a click -> navigate to next page on click listener
        val listViewRecyclerView = findViewById<RecyclerView>(R.id.listViewRecyclerView)
        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersSelectionRowAdapter(this, icons, iconTints, copies)
        listViewRecyclerView.adapter = adapter

        // TODO: Make clicking the button go to edit bank accounts page
        val topupBankSelectionEditBankAccountsTextView = findViewById<TextView>(R.id.topupBankSelectionEditBankAccountsTextView)
        topupBankSelectionEditBankAccountsTextView.text = getString(R.string.topup_bank_selection_edit_banks_copy)
    }
}
