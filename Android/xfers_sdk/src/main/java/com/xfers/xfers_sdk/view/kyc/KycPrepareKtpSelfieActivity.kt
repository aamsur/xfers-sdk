package com.xfers.xfers_sdk.view.kyc

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
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

    private val SELFIE_REQUEST_CODE = 1

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
            launchSelfieImageIntent()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == SELFIE_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
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
                        Intent(this, KycConfirmKtpSelfieActivity::class.java).apply {
                            this.putExtra("selfieBitmap", bitmap)
                        }
                )
            }

            bitmapUri?.let {
                startActivity(
                        Intent(this, KycConfirmKtpSelfieActivity::class.java).apply {
                            this.putExtra("selfieBitmapUri", bitmapUri)
                        }
                )
            }
        }
    }

    private fun launchSelfieImageIntent() {
        // TODO: For now only native camera and file system, in a future version polish to allow other camera intents
        val intent = Intent.createChooser(Intent(MediaStore.ACTION_IMAGE_CAPTURE), null)
        intent.putExtra(Intent.EXTRA_INITIAL_INTENTS, listOf(
                Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI).apply {
                    this.type = "image/*"
                }
        ).toTypedArray())

        startActivityForResult(intent, SELFIE_REQUEST_CODE)
    }
}
