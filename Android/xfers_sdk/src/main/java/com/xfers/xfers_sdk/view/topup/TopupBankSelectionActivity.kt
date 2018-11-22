package com.xfers.xfers_sdk.view.topup

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.view.manage_banks.ManageBankAccountsActivity
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.UserBankAccountsViewModel
import kotlinx.android.synthetic.main.activity_topup_bank_selection.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TopupBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_bank_selection)

        title = getString(R.string.topup_bank_selection_title)

        topupBankSelectionPageTitleTextView.text = getString(R.string.topup_bank_selection_page_title)

        topupBankSelectionEditBankAccountsTextView.text = getString(R.string.topup_bank_selection_edit_banks_copy)
        topupBankSelectionEditBankAccountsTextView.setOnClickListener {
            startActivity(Intent(this, ManageBankAccountsActivity::class.java))
        }

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        topupBankSelectionXfersProgressBar.visibility = View.VISIBLE
        topupBankSelectionPageTitleTextView.visibility = View.GONE
        topupBankSelectionPageConstraintLayout.visibility = View.GONE

        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts(this).observe(this, Observer<List<UserBankAccount>> {
            topupBankSelectionXfersProgressBar.visibility = View.GONE
            topupBankSelectionPageTitleTextView.visibility = View.VISIBLE
            topupBankSelectionPageConstraintLayout.visibility = View.VISIBLE

            val selectionRowItems = it.map { userBankAccount ->
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${userBankAccount.bankAbbrev} ${userBankAccount.accountNo}",
                        onClick = {
                            startActivity(
                                    Intent(this, TopupVirtualAccountTransferActivity::class.java).apply {
                                        this.putExtra(TopupConstants.bankAbbreviation, userBankAccount.bankAbbrev)
                                    }
                            )
                        }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })
    }
}
