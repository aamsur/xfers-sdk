package com.xfers.xfers_sdk.view.shared

import android.graphics.PorterDuff
import android.support.v7.widget.RecyclerView
import android.view.ViewGroup
import android.widget.TextView
import android.view.View
import android.widget.ImageView
import com.xfers.xfers_sdk.R
import android.view.LayoutInflater

class XfersItemRowAdapter(
        private val icons: ArrayList<Int>,
        private val iconTints: ArrayList<Int>,
        private val copies: ArrayList<String>
) : RecyclerView.Adapter<XfersItemRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersItemRowImageView: ImageView? = view.findViewById(R.id.xfersItemRowImageView)
        var xfersItemRowTextView: TextView? = view.findViewById(R.id.xfersItemRowTextView)
    }

    override fun getItemCount(): Int {
        return icons.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.xfersItemRowImageView?.setImageResource(icons[position])
        viewHolder.xfersItemRowImageView?.setColorFilter(iconTints[position])
        viewHolder.xfersItemRowTextView?.text = copies[position]
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_item_row, parent, false))
    }
}
