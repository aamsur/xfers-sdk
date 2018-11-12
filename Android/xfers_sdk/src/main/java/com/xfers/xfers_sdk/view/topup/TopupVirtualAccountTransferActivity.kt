package com.xfers.xfers_sdk.view.topup

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.utils.XfersStatusCardService
import kotlinx.android.synthetic.main.activity_topup_virtual_account_transfer.*
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*

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

        // TODO: Make the scroll view for virtual account transfer instructions

        xfersFullWidthButton.text = getString(R.string.i_have_transferred_button_copy)
        xfersFullWidthButton.setOnClickListener {
            XfersStatusCardService(this).presentTopupProcessingStatusCard()
        }
    }
}
