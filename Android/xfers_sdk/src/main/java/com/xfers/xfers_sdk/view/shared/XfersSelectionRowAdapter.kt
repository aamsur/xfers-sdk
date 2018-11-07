package com.xfers.xfers_sdk.view.shared

import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.xfers.xfers_sdk.R
import com.xfers.xfers_sdk.view.topup.TopupBankSelectionActivity

class XfersSelectionRowAdapter(
        private val context: Context,
        private val selectionRowItems: List<SelectionRowItem>
) : RecyclerView.Adapter<XfersSelectionRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersSelectionRowImageView: ImageView? = view.findViewById(R.id.xfersSelectionRowImageView)
        var xfersSelectionRowTextView: TextView? = view.findViewById(R.id.xfersSelectionRowTextView)
    }

    override fun getItemCount(): Int {
        return selectionRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val selectionRowItem = selectionRowItems[position]
        viewHolder.xfersSelectionRowImageView?.setImageResource(selectionRowItem.icon)
        viewHolder.xfersSelectionRowImageView?.setColorFilter(ContextCompat.getColor(context, selectionRowItem.iconTint))
        viewHolder.xfersSelectionRowTextView?.text = selectionRowItem.copy

        selectionRowItem.onClick?.let {
            viewHolder.xfersSelectionRowTextView?.setOnClickListener(it)
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_selection_row, parent, false))
    }
}

data class SelectionRowItem(val icon: Int, val iconTint: Int, val copy: String, val onClick: ((View) -> Unit)? = null)
