package com.xfers.xfers_sdk.view.manage_banks.add_bank_account

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.BanksViewModel
import kotlinx.android.synthetic.main.activity_manage_banks_add_bank_account_select_bank_to_add.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_search_bar.*
import kotlinx.android.synthetic.main.xfers_summary_title.*

class SelectBankToAddActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_manage_banks_add_bank_account_select_bank_to_add)
        title = getString(R.string.add_bank_account_title)
        xfersSummaryTitleTextView.text = getString(R.string.add_bank_account_select_bank_summary_title)
        // TODO: Make search bar actually search and be useful!
        xfersSearchBarEditText.hint = getString(R.string.add_bank_account_select_bank_search_hint)
        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        selectBankToAddXfersProgressBar.visibility = View.VISIBLE
        addBankAccountBankSelectionPageTitleTextView.visibility = View.GONE
        addBankAccountBankSelectionPageSearchBar.visibility = View.GONE
        addBankAccountBankSelectionPageSelectionListView.visibility = View.GONE

        val banksViewModel = ViewModelProviders.of(this).get(BanksViewModel::class.java)
        banksViewModel.getAvailableBanks().observe(this, Observer<List<Bank>> {
            selectBankToAddXfersProgressBar.visibility = View.GONE
            addBankAccountBankSelectionPageTitleTextView.visibility = View.VISIBLE
            addBankAccountBankSelectionPageSearchBar.visibility = View.VISIBLE
            addBankAccountBankSelectionPageSelectionListView.visibility = View.VISIBLE

            val selectionRowItems = it.map {
                SelectionRowItem(
                        iconUrl = it.img_src,
                        isIconUrl = true,
                        copy = "${it.name}",
                        onClick = {
                            // TODO: Pass information into intent on which bank was chosen
                            startActivity(Intent(this, EnterNameActivity::class.java))
                        }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })
    }
}
