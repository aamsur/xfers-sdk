package com.xfers.xfers_sdk.view.shared

import android.os.Bundle
import android.widget.TextView
import com.xfers.xfers_sdk.R

/**
 * Usage example:
 *   val i = Intent(context, StatusCardHourGlassActivity::class.java)
 *   i.putExtra("statusCardConfig",
 *     hashMapOf("normalText" to "", "boldText" to "", "buttonText" to "")
 *   )
 */
class StatusCardHourGlassActivity: StatusCardBase() {
    override var statusIconImage: Int = R.drawable.status_wip_60
    override var statusIconImageColorFilter: Int = R.color.lightGray

    // Customisable variables
    override var boldText: String = "Hour glass bold text"
    override var normalText: String = "Normal Text"
    override var buttonText: String = "Button Text Goes"

    override fun onCreate(savedInstanceState: Bundle?) {
        initWithViewConfig()
        super.onCreate(savedInstanceState)
        title = getString(R.string.status_card_base_title)

        val extendedTopbarTextView = findViewById<TextView>(R.id.extendedTopbarTextView)

    }

    private fun initWithViewConfig() {
        val viewConfig = intent.getSerializableExtra("statusCardConfig") as HashMap<*, *>

        this.boldText = viewConfig["boldText"] as String
        this.normalText = viewConfig["normalText"] as String
        this.buttonText = viewConfig["buttonText"] as String
    }
}
