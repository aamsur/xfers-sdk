package com.xfers.xfers_sdk.view.shared

import android.content.Context
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import android.view.ViewGroup
import android.widget.TextView
import android.view.View
import android.widget.ImageView
import com.xfers.xfers_sdk.R
import android.view.LayoutInflater

class XfersItemRowAdapter(
        private val context: Context,
        private val itemRowItems: List<ItemRowItem>
) : RecyclerView.Adapter<XfersItemRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersItemRowImageView: ImageView? = view.findViewById(R.id.xfersItemRowImageView)
        var xfersItemRowTextView: TextView? = view.findViewById(R.id.xfersItemRowTextView)
    }

    override fun getItemCount(): Int {
        return itemRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val itemRowItem = itemRowItems[position]
        viewHolder.xfersItemRowImageView?.setImageResource(itemRowItem.icon)
        viewHolder.xfersItemRowImageView?.setColorFilter(ContextCompat.getColor(context, itemRowItem.iconTint))
        viewHolder.xfersItemRowTextView?.text = itemRowItem.copy
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_item_row, parent, false))
    }
}

data class ItemRowItem(val icon: Int, val iconTint: Int, val copy: String)
