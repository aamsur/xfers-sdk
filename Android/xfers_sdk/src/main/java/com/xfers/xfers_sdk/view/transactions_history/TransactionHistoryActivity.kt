package com.xfers.xfers_sdk.view.transactions_history

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_transaction_history.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TransactionHistoryActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_transaction_history)

        title = getString(R.string.transaction_history_title)

        transactionHistoryTitleTextView.text = getString(R.string.transaction_history_title_copy)

        val extras = this.intent.extras

        val type = extras[TransactionHistoryConstants.type] as String?
        val description = extras[TransactionHistoryConstants.description] as String?
        val amount = extras[TransactionHistoryConstants.amount] as String?
        val status = extras[TransactionHistoryConstants.status] as String?

        val textRowItems = mutableListOf(
                TextRowItem(
                        getString(R.string.transaction_history_row_1_title),
                        buildSpannedString {
                            bold {
                                append(type)
                            }
                        }
                )
        )

        description?.let {
            if (description.isNotBlank()) {
                textRowItems.add(
                        TextRowItem(
                                getString(R.string.transaction_history_row_3_title),
                                buildSpannedString {
                                    bold {
                                        append(description)
                                    }
                                }
                        )
                )
            }
        }

        textRowItems.addAll(listOf(
                TextRowItem(
                        getString(R.string.transaction_history_row_4_title),
                        buildSpannedString {
                            bold {
                                append("${XfersConfiguration.getCurrencyString()} $amount")
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.transaction_history_row_5_title),
                        buildSpannedString {
                            bold {
                                append(status)
                            }
                        }
                )
        ))

        // TODO: Add this back when appropriate, currently Indonesia only no such thing as wallet type

        // TextRowItem(
        //        getString(R.string.transaction_history_row_2_title),
        //        buildSpannedString {
        //            bold {
        //                append(getString(R.string.transaction_history_row_2_ipsum))
        //            }
        //        }
        // ),

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter
    }
}
