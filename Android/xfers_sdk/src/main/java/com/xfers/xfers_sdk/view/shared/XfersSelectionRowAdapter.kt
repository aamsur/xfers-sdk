package com.xfers.xfers_sdk.view.shared

import android.content.Context
import android.support.v4.content.ContextCompat
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.xfers.xfers_sdk.R

class XfersSelectionRowAdapter(
        private val context: Context,
        private val icons: ArrayList<Int>,
        private val iconTints: ArrayList<Int>,
        private val copies: ArrayList<String>
) : RecyclerView.Adapter<XfersSelectionRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersSelectionRowImageView: ImageView? = view.findViewById(R.id.xfersSelectionRowImageView)
        var xfersSelectionRowTextView: TextView? = view.findViewById(R.id.xfersSelectionRowTextView)
    }

    override fun getItemCount(): Int {
        return icons.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.xfersSelectionRowImageView?.setImageResource(icons[position])
        viewHolder.xfersSelectionRowImageView?.setColorFilter(ContextCompat.getColor(context, iconTints[position]))
        viewHolder.xfersSelectionRowTextView?.text = copies[position]
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_selection_row, parent, false))
    }
}