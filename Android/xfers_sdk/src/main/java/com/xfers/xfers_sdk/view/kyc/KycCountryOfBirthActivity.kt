package com.xfers.xfers_sdk.view.kyc

import android.content.Intent
import android.os.Bundle
import android.text.InputType
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.shared.SelectionRowItem
import com.xfers.xfers_sdk.view.shared.XfersSelectionRowAdapter
import kotlinx.android.synthetic.main.activity_kyc_country_of_birth.*
import kotlinx.android.synthetic.main.xfers_list_view.*
import kotlinx.android.synthetic.main.xfers_search_bar.*

class KycCountryOfBirthActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kyc_country_of_birth)

        title = getString(R.string.kyc_input_form_title)

        xfersKycCountryOfBirthStepTitle.text = getString(R.string.kyc_input_form_step_title)
        xfersKycCountryOfBirthStepNumber.text = getString(R.string.kyc_country_of_birth_step_number)
        xfersKycCountryOfBirthFieldTitle.text = getString(R.string.kyc_country_of_birth_page_title)

        // TODO: Make xfersKycCountryOfBirthSearchBar actually filter the countries
        xfersSearchBarEditText.inputType = InputType.TYPE_CLASS_TEXT
        xfersSearchBarEditText.hint = getString(R.string.kyc_country_of_birth_placeholder)

        val extras = this.intent.extras
        val ktpNumber = extras[KycConstants.ktpNumber] as String
        val fullName = extras[KycConstants.fullName] as String

        // TODO: Integrate viewModel and populate with actual countries
        val selectionRowItems = listOf(
                SelectionRowItem(
                        copy = "Honduras",
                        onClick = {
                            startActivity(
                                    Intent(this, KycDateOfBirthActivity::class.java).apply {
                                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                                        this.putExtra(KycConstants.fullName, fullName)
                                        this.putExtra(KycConstants.countryOfBirth, "Honduras")
                                    }
                            )
                        }
                ),
                SelectionRowItem(
                        copy = "Hungary",
                        onClick = {
                            startActivity(
                                    Intent(this, KycDateOfBirthActivity::class.java).apply {
                                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                                        this.putExtra(KycConstants.fullName, fullName)
                                        this.putExtra(KycConstants.countryOfBirth, "Hungary")
                                    }
                            )
                        }
                ),
                SelectionRowItem(
                        copy = "Iceland",
                        onClick = {
                            startActivity(
                                    Intent(this, KycDateOfBirthActivity::class.java).apply {
                                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                                        this.putExtra(KycConstants.fullName, fullName)
                                        this.putExtra(KycConstants.countryOfBirth, "Iceland")
                                    }
                            )
                        }
                ),
                SelectionRowItem(
                        copy = "Indonesia",
                        onClick = {
                            startActivity(
                                    Intent(this, KycDateOfBirthActivity::class.java).apply {
                                        this.putExtra(KycConstants.ktpNumber, ktpNumber)
                                        this.putExtra(KycConstants.fullName, fullName)
                                        this.putExtra(KycConstants.countryOfBirth, "Indonesia")
                                    }
                            )
                        }
                )
        )

        listViewRecyclerView.layoutManager = LinearLayoutManager(this)
        val adapter = XfersSelectionRowAdapter(this, selectionRowItems)
        listViewRecyclerView.adapter = adapter
    }
}
