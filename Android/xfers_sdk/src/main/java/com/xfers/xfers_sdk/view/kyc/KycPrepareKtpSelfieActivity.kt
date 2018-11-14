package com.xfers.xfers_sdk.view.kyc

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

class KycPrepareKtpSelfieActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_prepare_ktp_selfie)

        title = getString(R.string.kyc_input_form_title)

        extendedTopbarTextView.text = getString(R.string.kyc_prepare_ktp_selfie_extended_topbar_title)

        val context = this

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.personal_50, R.color.lightGray,
                        buildSpannedString {
                            bold {
                                scale(0.6f) {
                                    color(ContextCompat.getColor(context, R.color.lightGray)) {
                                        append(getString(R.string.kyc_document_preparation_step_1_title))
                                    }
                                }
                            }
                            append("\n")
                            color(ContextCompat.getColor(context, R.color.lightGray)) {
                                append(getString(R.string.kyc_document_preparation_step_1_prompt))
                            }
                        }
                ),
                ItemRowItem(
                        R.drawable.id_card_50, R.color.lightGray,
                        buildSpannedString {
                            bold {
                                scale(0.6f) {
                                    color(ContextCompat.getColor(context, R.color.lightGray)) {
                                        append(getString(R.string.kyc_document_preparation_step_2_title))
                                    }
                                }
                            }
                            append("\n")
                            color(ContextCompat.getColor(context, R.color.lightGray)) {
                                append(getString(R.string.kyc_document_preparation_step_2_prompt))
                            }
                        }
                ),
                ItemRowItem(
                        R.drawable.selfie_50, R.color.clearBlue,
                        buildSpannedString {
                            bold {
                                scale(0.6f) {
                                    color(ContextCompat.getColor(context, R.color.clearBlue)) {
                                        append(getString(R.string.kyc_document_preparation_step_3_title))
                                    }
                                }
                            }
                            append("\n")
                            append(getString(R.string.kyc_document_preparation_step_3_prompt))
                        }
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter

        xfersFullWidthButton.text = getString(R.string.proceed_button_copy)
        xfersFullWidthButton.setOnClickListener {
            // TODO: Present camera and gallery intent action and slot it in between this and the following presented activity

            // TODO: Present confirm selfie image activity and pass in image from camera / gallery intent
        }
    }
}
