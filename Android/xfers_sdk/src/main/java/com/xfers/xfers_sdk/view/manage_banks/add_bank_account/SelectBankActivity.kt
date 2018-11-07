package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.BanksViewModel
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_search_bar.*
import kotlinx.android.synthetic.main.xfers_summary_title.*

class SelectBankActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manage_banks_add_bank_account_select_bank)

        title = getString(R.string.add_bank_account_title)

        xfersSummaryTitleTextView.text = getString(R.string.add_bank_account_select_bank_summary_title)
        xfersSearchBarEditText.hint = getString(R.string.add_bank_account_select_bank_search_hint)

        val model = ViewModelProviders.of(this).get(BanksViewModel::class.java)
        model.getBanks().observe(this, Observer<List<Bank>> {
            val selectionRowItems = it.map {
                SelectionRowItem(
                        // FIXME: Use the correct image here
                        R.drawable.bank_acc_28,
                        copy = it.name
                )
            }

            // TODO: To give each row a click -> navigate to next page on click listener
            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })
    }
}
