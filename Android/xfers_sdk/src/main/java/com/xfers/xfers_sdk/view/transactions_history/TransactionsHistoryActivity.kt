package com.xfers.xfers_sdk.view.transactions_history

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersConfiguration
import com.xfers.xfers_sdk.view.shared.TransactionRowItem
import com.xfers.xfers_sdk.view.shared.XfersTransactionRowAdapter
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

        // TODO: Integrate viewModel and appropriate APIs
        val transactionRowItems = listOf(
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.deposit_arrow_18, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_topup_request_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.aquaMarine)) {
                                append(getString(R.string.transaction_history_positive_money_ipsum))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_1))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.deposit_arrow_18, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_topup_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.aquaMarine)) {
                                append(getString(R.string.transaction_history_positive_money_ipsum))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_digital_purchase_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_1))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_digital_purchase_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.deposit_arrow_18, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_topup_request_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.aquaMarine)) {
                                append(getString(R.string.transaction_history_positive_money_ipsum))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_1))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_withdraw_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.deposit_arrow_18, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_topup_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_bank_ipsum))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.aquaMarine)) {
                                append(getString(R.string.transaction_history_positive_money_ipsum))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_digital_purchase_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_from_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_1))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                },
                TransactionRowItem(
                        R.drawable.withdraw_arrow_18, R.color.pastelOrange,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.transaction_history_digital_purchase_title))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_to_merchant_ipsum, XfersConfiguration.getMerchantName()))
                        },
                        buildSpannedString {
                            color(ContextCompat.getColor(context, R.color.pastelOrange)) {
                                append(getString(R.string.transaction_history_negative_money_ipsum_2))
                            }
                            append("\n")
                            append(getString(R.string.transaction_history_date_ipsum))
                        }
                ) {
                    // TODO: Pass activity information through extras into child activity
                    startActivity(Intent(this, TransactionHistoryActivity::class.java))
                }
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTransactionRowAdapter(this, transactionRowItems)
        listViewRecyclerView.adapter = adapter
    }
}
