package com.xfers.xfers_sdk.view.topup

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.BankInstructionRowItem
import com.xfers.xfers_sdk.view.shared.XfersBankInstructionRowAdapter
import kotlinx.android.synthetic.main.activity_topup_virtual_account_transfer.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TopupVirtualAccountTransferActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_virtual_account_transfer)

        title = getString(R.string.topup_virtual_account_transfer_title)

        extendedTopbarTextView.text = buildSpannedString {
            bold {
                append(getString(R.string.topup_virtual_account_transfer_topbar_title_part_1))
            }
            append("\n\n")
            append(getString(R.string.topup_virtual_account_transfer_topbar_title_part_2))
        }

        topupVirtualAccountTransferWarningTextView.text = getString(R.string.topup_virtual_account_transfer_warning_copy)

        val context = this

        val bankInstructionRowItems = listOf(
                BankInstructionRowItem(
                        buildSpannedString {
                            append(getString(R.string.topup_virtual_account_transfer_step_1_part_1))
                            append(" ")
                            bold {
                                append(getString(R.string.topup_virtual_account_transfer_step_1_part_2))
                            }
                            append("\n")
                        }
                ),
                BankInstructionRowItem(
                        buildSpannedString {
                            append(getString(R.string.topup_virtual_account_transfer_step_2_part_1))
                            append("\n\n")
                            bold {
                                color(ContextCompat.getColor(context, R.color.clearBlue)) {
                                    append(getString(R.string.topup_virtual_account_transfer_step_2_part_2))
                                }
                            }
                            append("\n")
                            bold {
                                append(getString(R.string.topup_virtual_account_transfer_step_2_part_3))
                            }
                            append("\n\n")
                            bold {
                                color(ContextCompat.getColor(context, R.color.clearBlue)) {
                                    append(getString(R.string.topup_virtual_account_transfer_step_2_part_4))
                                }
                            }
                        },
                        getString(R.string.bank_xxx_ipsum)
                ) {
                    // TODO: Make clicking this really copy account number
                    Toast.makeText(this, "Copy account number feature coming soon", Toast.LENGTH_SHORT).show()
                },
                BankInstructionRowItem(
                        buildSpannedString {
                            append(getString(R.string.topup_virtual_account_transfer_step_3_part_1))
                            append(" ")
                            bold {
                                append(getString(R.string.topup_virtual_account_transfer_step_3_part_2))
                            }
                            append(" ")
                            append(getString(R.string.topup_virtual_account_transfer_step_3_part_3))
                            append(" ")
                            bold {
                                append(getString(R.string.topup_virtual_account_transfer_step_3_part_4))
                            }
                            append(" ")
                            append(getString(R.string.topup_virtual_account_transfer_step_3_part_5))
                            append("\n")
                        }
                )

        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersBankInstructionRowAdapter(this, bankInstructionRowItems)
        listViewRecyclerView.adapter = adapter

        xfersFullWidthButton.text = getString(R.string.i_have_transferred_button_copy)
        xfersFullWidthButton.setOnClickListener {
            XfersStatusCardService(this).presentTopupProcessingStatusCard()
        }
    }
}
