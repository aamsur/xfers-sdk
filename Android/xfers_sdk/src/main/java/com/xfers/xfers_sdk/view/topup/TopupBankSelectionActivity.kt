package com.xfers.xfers_sdk.view.topup

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import kotlinx.android.synthetic.main.activity_topup_bank_selection.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TopupBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_bank_selection)

        title = getString(R.string.topup_bank_selection_title)

        topupBankSelectionPageTitleTextView.text = getString(R.string.topup_bank_selection_page_title)

        val selectionRowItems = listOf(
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        getString(R.string.topup_bank_selection_bank_ipsum)
                ),
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        getString(R.string.topup_bank_selection_bank_ipsum)
                )
        )

        // TODO: To give each row a click -> navigate to next page on click listener
        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
        listViewRecyclerView.adapter = adapter

        // TODO: Make clicking the button go to edit bank accounts page
        topupBankSelectionEditBankAccountsTextView.text = getString(R.string.topup_bank_selection_edit_banks_copy)
    }
}
