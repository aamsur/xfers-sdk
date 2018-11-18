package com.xfers.xfers_sdk.view.topup

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserBankAccount
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import com.xfers.xfers_sdk.view_model.UserBankAccountsViewModel
import kotlinx.android.synthetic.main.activity_topup_bank_selection.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TopupBankSelectionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_bank_selection)

        val disableVa = false

        title = getString(R.string.topup_bank_selection_title)

        topupBankSelectionPageTitleTextView.text = getString(R.string.topup_bank_selection_page_title)

        val model = ViewModelProviders.of(this).get(UserBankAccountsViewModel::class.java)
        model.getUserBankAccounts().observe(this, Observer<List<UserBankAccount>> {
            val selectionRowItems = it.map { userBankAccount ->
                SelectionRowItem(
                        R.drawable.bank_acc_28, R.color.black,
                        "${userBankAccount.bankAbbrev} ${userBankAccount.accountNo}",
                        onClick = {
                            // TODO: Pass what bank was selected into the child activity
                            startActivity(Intent(this, TopupVirtualAccountTransferActivity::class.java).apply {
                                this.putExtra("bankAbbrev", userBankAccount.bankAbbrev)
                            })
                        }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
            listViewRecyclerView.adapter = adapter
        })

        // TODO: Make clicking the button go to edit bank accounts page
        topupBankSelectionEditBankAccountsTextView.text = getString(R.string.topup_bank_selection_edit_banks_copy)
    }
}
