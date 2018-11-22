package com.xfers.xfers_sdk.view.kyc

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.view.shared.ItemRowItem
import com.xfers.xfers_sdk.view.shared.XfersItemRowAdapter
import com.xfers.xfers_sdk.view_model.UserDetailsViewModel
import kotlinx.android.synthetic.main.activity_kyc_verification_status.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class KycVerificationStatusActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_verification_status)

        title = getString(R.string.kyc_verification_status_title)

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

        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        observeViewModel()
    }

    private fun observeViewModel() {
        kycVerificationStatusXfersProgressBar.visibility = View.VISIBLE
        kycVerificationStatusTextView.visibility = View.GONE
        kycVerificationListView.visibility = View.GONE
        kycVerificationPendingFootnoteTextView.visibility = View.GONE

        val userDetailsViewModel = ViewModelProviders.of(this).get(UserDetailsViewModel::class.java)
        userDetailsViewModel.getUserDetails(this).observe(this, Observer<User> {
            kycVerificationStatusXfersProgressBar.visibility = View.GONE
            kycVerificationStatusTextView.visibility = View.VISIBLE
            kycVerificationListView.visibility = View.VISIBLE
            kycVerificationPendingFootnoteTextView.visibility = View.VISIBLE

            it.kycVerified?.let {
                if (it) {
                    kycVerificationStatusTextView.text = getString(R.string.kyc_verification_status_verified_copy)
                    kycVerificationStatusTextView.setTextColor(ContextCompat.getColor(this, R.color.aquaMarine))
                    kycVerificationPendingFootnoteTextView.visibility = View.GONE
                } else {
                    kycVerificationStatusTextView.text = getString(R.string.kyc_verification_status_pending_copy)
                    kycVerificationStatusTextView.setTextColor(ContextCompat.getColor(this, R.color.pastelOrange))
                    kycVerificationPendingFootnoteTextView.text = getString(R.string.kyc_verification_status_footnote_copy)
                }
            }
        })
    }
}
