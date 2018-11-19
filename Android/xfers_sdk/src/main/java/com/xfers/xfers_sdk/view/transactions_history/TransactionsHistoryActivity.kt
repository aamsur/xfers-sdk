package com.xfers.xfers_sdk.view.transactions_history

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
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
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
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

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        transactionsHistoryProgressBar.visibility = View.VISIBLE
        transactionsHistoryListView.visibility = View.GONE

        val context = this

        val transactionHistoriesViewModel = ViewModelProviders.of(this).get(TransactionsHistoryViewModel::class.java)
        transactionHistoriesViewModel.getTransactionHistories().observe(this, Observer<List<UserActivity>> {
            transactionsHistoryProgressBar.visibility = View.GONE
            transactionsHistoryListView.visibility = View.VISIBLE

            if (it.isNotEmpty()) {
                val transactionRowItems = it.map { transaction ->
                    val icon: Int?
                    val color: Int?

                    if (transaction.amount?.substring(0, 1) == "-") {
                        icon = R.drawable.withdraw_arrow_18
                        color = R.color.pastelOrange
                    } else {
                        icon = R.drawable.deposit_arrow_18
                        color = R.color.aquaMarine
                    }

                    TransactionRowItem(
                            icon,
                            color,
                            buildSpannedString {
                                bold {
                                    append(transaction.type)
                                }
                                append("\n")
                                append(transaction.metadata?.description)
                            },
                            buildSpannedString {
                                color(ContextCompat.getColor(context, color)) {
                                    // TODO: Do a proper currency formatter so this doesn't look weird
                                    append("${XfersConfiguration.getCurrencyString()} ${transaction.amount}")
                                }
                                append("\n")
                                // TODO: Do a date time formatter so this doesn't look crappy
                                append(transaction.createdAt)
                            },
                            onClick = {
                                startActivity(
                                        Intent(this, TransactionHistoryActivity::class.java).apply {
                                            this.putExtra(TransactionHistoryConstants.type, transaction.type)
                                            this.putExtra(TransactionHistoryConstants.description, transaction.metadata?.description)
                                            this.putExtra(TransactionHistoryConstants.amount, transaction.amount)
                                            this.putExtra(TransactionHistoryConstants.status, transaction.status)
                                        }
                                )
                            }
                    )
                }

                listViewRecyclerView.layoutManager = LinearLayoutManager(this)
                val adapter = XfersTransactionRowAdapter(this, transactionRowItems)
                listViewRecyclerView.adapter = adapter
            } else {
                // TODO: Display something cute when there isn't any transaction at all?
                Toast.makeText(this, "You have not yet made any transactions!", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
