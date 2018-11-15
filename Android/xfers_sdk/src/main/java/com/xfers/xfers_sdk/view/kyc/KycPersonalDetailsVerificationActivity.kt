package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.text.bold
import androidx.core.text.buildSpannedString
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.TextRowItem
import com.xfers.xfers_sdk.view.shared.XfersTextRowAdapter
import kotlinx.android.synthetic.main.activity_kyc_personal_details_verification.*
import kotlinx.android.synthetic.main.xfers_double_buttons.*
import kotlinx.android.synthetic.main.xfers_list_view.*

class KycPersonalDetailsVerificationActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_personal_details_verification)

        title = getString(R.string.kyc_personal_details_verification_title)

        kycPersonalDetailsTextView.text = getString(R.string.kyc_personal_details_verification_page_title)

        val textRowItems = listOf(
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_1_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_1_ipsum))
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_2_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_2_ipsum))
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_3_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_3_ipsum))
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_4_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_4_ipsum))
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_5_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_5_ipsum))
                            }
                        }
                ),
                TextRowItem(
                        getString(R.string.kyc_personal_details_verification_step_6_title),
                        buildSpannedString {
                            bold {
                                append(getString(R.string.kyc_personal_details_verification_step_6_ipsum))
                            }
                        }
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersTextRowAdapter(textRowItems)
        listViewRecyclerView.adapter = adapter

        xfersDoubleButtonsNegativeButton.text = getString(R.string.go_back_button_copy)
        xfersDoubleButtonsNegativeButton.setOnClickListener {
            finish()
        }

        xfersDoubleButtonsPositiveButton.text = getString(R.string.proceed_button_copy)
        xfersDoubleButtonsPositiveButton.setOnClickListener {
            // TODO: Slot in the ktp camera in between this and confirmation

            startActivity(Intent(this, KycConfirmKtpImageActivity::class.java))
        }
    }
}
