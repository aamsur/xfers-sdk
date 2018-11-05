package com.xfers.xfers_sdk.view.kyc

import android.os.Bundle
import android.text.SpannedString
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.buildSpannedString
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class IndoKycDocumentPreviewActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_indo_kyc_document_preview)

        title = getString(R.string.kyc_indo_kyc_document_preview_title)

        val pageTitle: SpannedString = buildSpannedString {
            append(getString(R.string.kyc_indo_kyc_document_page_title_line_1))
            append("\n")
            append(getString(R.string.kyc_indo_kyc_document_page_title_line_2))
        }

        extendedTopbarTextView.text = pageTitle

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.id_card_50, R.color.clearBlue,
                        getString(R.string.kyc_indo_kyc_document_step_1_prompt),
                        getString(R.string.kyc_indo_kyc_document_step_1_title)

                ),
                ItemRowItem(
                        R.drawable.selfie_50, R.color.clearBlue,
                        getString(R.string.kyc_indo_kyc_document_step_2_prompt),
                        getString(R.string.kyc_indo_kyc_document_step_2_title)
                ),
                ItemRowItem(
                        R.drawable.maiden_50, R.color.clearBlue,
                        getString(R.string.kyc_indo_kyc_document_step_3_prompt),
                        getString(R.string.kyc_indo_kyc_document_step_3_title)
                )

        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter
    }
}