package com.xfers.xfers_sdk.view.topup

import android.os.Bundle
import android.util.Log
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
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.model.response.TransferInfoResponse
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.ui.XfersStatusCardService
import com.xfers.xfers_sdk.view.shared.BankInstructionRowItem
import com.xfers.xfers_sdk.view.shared.XfersBankInstructionRowAdapter
import com.xfers.xfers_sdk.view_model.TopupInstructionViewModel
import kotlinx.android.synthetic.main.activity_topup_virtual_account_transfer.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class TopupVirtualAccountTransferActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_topup_virtual_account_transfer)

        val extras = this.intent.extras
        val bankAbbrev = extras["bankAbbrev"] as String
        val disableVa = false

        title = getString(R.string.topup_virtual_account_transfer_title)

        val transferInfoModel = ViewModelProviders.of(this).get(TopupInstructionViewModel::class.java)
        transferInfoModel.getTransferInfo(bankAbbrev, disableVa).observe(this, Observer<TransferInfoResponse> { transferInfo ->
            val context = this
            val country = XfersConfiguration.getCurrentCountry()
            val bankNameFull: String?
            val bankAccountNo: String?
            if (country == Xfers.Country.SG) {
                bankNameFull = transferInfo.transferInfoArray!![0].bankNameFull
                bankAccountNo = transferInfo.transferInfoArray[0].bankAccountNo
            } else {
                bankNameFull = transferInfo.bankNameFull
                bankAccountNo = transferInfo.bankAccountNo
            }
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
                                    append(bankNameFull)
                                }
                                append("\n\n")
                                bold {
                                    color(ContextCompat.getColor(context, R.color.clearBlue)) {
                                        append(getString(R.string.topup_virtual_account_transfer_step_2_part_4))
                                    }
                                }
                            },
                            buildSpannedString {
                                append(bankAccountNo)
                            }
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
        })

        extendedTopbarTextView.text = buildSpannedString {
            bold {
                append(getString(R.string.topup_virtual_account_transfer_topbar_title_part_1))
            }
            append("\n\n")
            append(getString(R.string.topup_virtual_account_transfer_topbar_title_part_2))
        }

        topupVirtualAccountTransferWarningTextView.text = getString(R.string.topup_virtual_account_transfer_warning_copy)

        xfersFullWidthButton.text = getString(R.string.i_have_transferred_button_copy)
        xfersFullWidthButton.setOnClickListener {
            XfersStatusCardService(this).presentTopupProcessingStatusCard()
        }
    }
}
