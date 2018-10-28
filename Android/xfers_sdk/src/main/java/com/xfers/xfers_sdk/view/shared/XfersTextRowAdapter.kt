package com.xfers.xfers_sdk.view.shared

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.xfers.xfers_sdk.R

class XfersTextRowAdapter(
        private val titles: ArrayList<String>,
        private val copies: ArrayList<String>
) : RecyclerView.Adapter<XfersTextRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersTextRowTitleTextView: TextView? = view.findViewById(R.id.xfersTextRowTitleTextView)
        var xfersTextRowCopyTextView: TextView? = view.findViewById(R.id.xfersTextRowCopyTextView)
    }

    override fun getItemCount(): Int {
        return titles.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.xfersTextRowTitleTextView?.text = titles[position]
        viewHolder.xfersTextRowCopyTextView?.text = copies[position]
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_text_row, parent, false))
    }
}
