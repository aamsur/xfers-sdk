package com.xfers.xfers_sdk.view.shared

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.xfers.xfers_sdk.R

class XfersTextRowAdapter(
        private val textRowItems: List<TextRowItem>
) : RecyclerView.Adapter<XfersTextRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersTextRowTitleTextView: TextView? = view.findViewById(R.id.xfersTextRowTitleTextView)
        var xfersTextRowCopyTextView: TextView? = view.findViewById(R.id.xfersTextRowCopyTextView)
    }

    override fun getItemCount(): Int {
        return textRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val textRowItem = textRowItems[position]
        viewHolder.xfersTextRowTitleTextView?.text = textRowItem.title
        viewHolder.xfersTextRowCopyTextView?.text = textRowItem.copy
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_text_row, parent, false))
    }
}

data class TextRowItem(val title: CharSequence, val copy: CharSequence)
