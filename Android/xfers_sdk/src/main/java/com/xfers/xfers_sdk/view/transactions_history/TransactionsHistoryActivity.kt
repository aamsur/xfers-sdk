package com.xfers.xfers_sdk.view.transactions_history

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.UserActivity
import com.xfers.xfers_sdk.view.shared.TransactionRowItem
import com.xfers.xfers_sdk.view.shared.XfersTransactionRowAdapter
import com.xfers.xfers_sdk.view_model.TransactionsHistoryViewModel
import kotlinx.android.synthetic.main.activity_transactions_history.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TransactionsHistoryActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_transactions_history)

        title = getString(R.string.transactions_history_title)

        transactionsHistoryTitleTextView.text = getString(R.string.transactions_history_title_copy)

        val context = this

        // TODO: Display something cute when there isn't any transaction at all?

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        transactionsHistoryProgressBar.visibility = View.VISIBLE
        transactionsHistoryListView.visibility = View.GONE

        val transactionHistoriesViewModel = ViewModelProviders.of(this).get(TransactionsHistoryViewModel::class.java)
        transactionHistoriesViewModel.getTransactionHistories().observe(this, Observer<List<UserActivity>> {
            transactionsHistoryProgressBar.visibility = View.GONE
            transactionsHistoryListView.visibility = View.VISIBLE

            val transactionRowItems = it.map { transactionHistory ->
                TransactionRowItem(
                    R.drawable.withdraw_arrow_18,
                    R.color.pastelOrange,
                    buildSpannedString {
                        bold {
                            append(transactionHistory.type)
                        }
                    },
                    buildSpannedString {
                        color(ContextCompat.getColor(this@TransactionsHistoryActivity, R.color.pastelOrange)) {
                            append(transactionHistory.amount)
                        }
                        append("\n")
                        append(transactionHistory.createdAt)
                    },
                    onClick = {
                        // TODO: Pass activity information through extras into child activity
                        startActivity(Intent(this, TransactionHistoryActivity::class.java))
                    }
                )
            }

            listViewRecyclerView.layoutManager = LinearLayoutManager(this)
            val adapter = XfersTransactionRowAdapter(this, transactionRowItems)
            listViewRecyclerView.adapter = adapter

        })
    }

}
