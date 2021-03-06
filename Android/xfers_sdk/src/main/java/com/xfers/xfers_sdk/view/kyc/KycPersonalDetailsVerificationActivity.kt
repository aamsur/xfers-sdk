package com.xfers.xfers_sdk.view.kyc

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.provider.MediaStore
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
import android.graphics.Bitmap
import android.net.Uri

class KycPersonalDetailsVerificationActivity: AppCompatActivity() {

    private val KTP_REQUEST_CODE = 1

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
            launchKtpImageIntent()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == KTP_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            val isCamera = data?.action != null

            var bitmap: Bitmap? = null
            var bitmapUri: Uri? = null

            if (isCamera) {
                bitmap = data?.extras?.get("data") as Bitmap
            } else {
                bitmapUri = data?.data
            }

            bitmap?.let {
                startActivity(
                        Intent(this, KycConfirmKtpImageActivity::class.java).apply {
                            this.putExtra("ktpBitmap", bitmap)
                        }
                )
            }

            bitmapUri?.let {
                startActivity(
                        Intent(this, KycConfirmKtpImageActivity::class.java).apply {
                            this.putExtra("ktpBitmapUri", bitmapUri)
                        }
                )
            }
        }
    }

    private fun launchKtpImageIntent() {
        // TODO: For now only native camera and file system, in a future version polish to allow other camera intents
        val intent = Intent.createChooser(Intent(MediaStore.ACTION_IMAGE_CAPTURE), null)
        intent.putExtra(Intent.EXTRA_INITIAL_INTENTS, listOf(
                Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI).apply {
                    this.type = "image/*"
                }
        ).toTypedArray())

        startActivityForResult(intent, KTP_REQUEST_CODE)
    }
}
