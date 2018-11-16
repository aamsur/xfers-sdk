package com.xfers.xfers_sdk.view.kyc

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import kotlinx.android.synthetic.main.activity_kyc_verification_status.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class KycVerificationStatusActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_verification_status)

        title = getString(R.string.kyc_verification_status_title)

        // TODO: Check whether user is verified or not via a proper viewModel
        val isVerified = false

        if (isVerified) {
            kycVerificationStatusTextView.text = getString(R.string.kyc_verification_status_verified_copy)
            kycVerificationStatusTextView.setTextColor(ContextCompat.getColor(this, R.color.aquaMarine))
            kycVerificationPendingFootnoteTextView.visibility = View.GONE
        } else {
            kycVerificationStatusTextView.text = getString(R.string.kyc_verification_status_pending_copy)
            kycVerificationStatusTextView.setTextColor(ContextCompat.getColor(this, R.color.pastelOrange))
            kycVerificationPendingFootnoteTextView.text = getString(R.string.kyc_verification_status_footnote_copy)
        }

        val itemRowItems = listOf(
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_verification_status_document_1_copy))
                            }
                        }
                ),
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_verification_status_document_2_copy))
                            }
                        }
                ),
                ItemRowItem(
                        R.drawable.status_success_50, R.color.aquaMarine,
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_verification_status_document_3_copy))
                            }
                        }

                )

        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersItemRowAdapter(this, itemRowItems)
        listViewRecyclerView.adapter = adapter
    }
}
