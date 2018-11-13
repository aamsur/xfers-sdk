package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.core.text.color
import androidx.core.text.scale
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import kotlinx.android.synthetic.main.xfers_button.*
import kotlinx.android.synthetic.main.xfers_extended_topbar.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class KycDocumentPreparationActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_document_preparation)

        title = getString(R.string.kyc_document_preparation_title)

        val pageTitle = buildSpannedString {
            bold {
                append(getString(R.string.kyc_document_preparation_page_title_line_1))
                append("\n")
                append(getString(R.string.kyc_document_preparation_page_title_line_2))
            }
        }

        extendedTopbarTextView.text = pageTitle

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.personal_50, R.color.clearBlue,
                        spannedStringForRow(
                                getString(R.string.kyc_document_preparation_step_1_title),
                                getString(R.string.kyc_document_preparation_step_1_prompt)
                        )
                ),
                ItemRowItem(
                        R.drawable.id_card_50, R.color.clearBlue,
                        spannedStringForRow(
                                getString(R.string.kyc_document_preparation_step_2_title),
                                getString(R.string.kyc_document_preparation_step_2_prompt)
                        )
                ),
                ItemRowItem(
                        R.drawable.selfie_50, R.color.clearBlue,
                        spannedStringForRow(
                                getString(R.string.kyc_document_preparation_step_3_title),
                                getString(R.string.kyc_document_preparation_step_3_prompt)
                        )

                )

        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter

        xfersFullWidthButton.setOnClickListener {
            startActivity(Intent(this, KycKtpActivity::class.java))
        }
    }

    private fun spannedStringForRow(title: String, prompt: String): CharSequence {
        val context = this

        return buildSpannedString {
            bold {
                scale(0.6f) {
                    color(ContextCompat.getColor(context, R.color.clearBlue)) {
                        append(title)
                    }
                }
            }
            append("\n")
            append(prompt)
        }
    }
}
