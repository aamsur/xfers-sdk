package com.xfers.xfers_sdk.view.shared

import android.content.Context
import androidx.core.content.ContextCompat
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.xfers.xfers_sdk.R

class XfersSelectionRowAdapter(
        private val context: Context,
        private val selectionRowItems: List<SelectionRowItem>
) : RecyclerView.Adapter<XfersSelectionRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersSelectionRowContainerCardView: CardView? = view.findViewById(R.id.xfersSelectionRowContainerCardView)
        var xfersSelectionRowImageView: ImageView? = view.findViewById(R.id.xfersSelectionRowImageView)
        var xfersSelectionRowTextView: TextView? = view.findViewById(R.id.xfersSelectionRowTextView)
        var xfersSelectionRowRightImageView: ImageView? = view.findViewById(R.id.xfersSelectionRowRightImageView)
    }

    override fun getItemCount(): Int {
        return selectionRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val selectionRowItem = selectionRowItems[position]

        if (selectionRowItem.icon != null) {
            viewHolder.xfersSelectionRowImageView?.setImageResource(selectionRowItem.icon)
        } else {
            viewHolder.xfersSelectionRowImageView?.visibility = View.GONE
        }

        if (selectionRowItem.iconTint != null) {
            viewHolder.xfersSelectionRowImageView?.setColorFilter(
                    ContextCompat.getColor(context, selectionRowItem.iconTint)
            )
        } else {
            viewHolder.xfersSelectionRowImageView?.clearColorFilter()
        }

        viewHolder.xfersSelectionRowTextView?.text = selectionRowItem.copy

        selectionRowItem.onClick?.let {
            viewHolder.xfersSelectionRowContainerCardView?.setOnClickListener(it)
        }

        if (selectionRowItem.rightIcon != null) {
            viewHolder.xfersSelectionRowRightImageView?.setImageResource(selectionRowItem.rightIcon)
        } else {
            viewHolder.xfersSelectionRowRightImageView?.visibility = View.GONE
        }

        if (selectionRowItem.rightIconTint != null) {
            viewHolder.xfersSelectionRowRightImageView?.setColorFilter(
                    ContextCompat.getColor(context, selectionRowItem.rightIconTint)
            )
        } else {
            viewHolder.xfersSelectionRowRightImageView?.clearColorFilter()
        }

        selectionRowItem.rightIconOnClick?.let {
            viewHolder.xfersSelectionRowRightImageView?.setOnClickListener(it)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_selection_row, parent, false))
    }
}

data class SelectionRowItem(
        val icon: Int? = null, val iconTint: Int? = null, val copy: String,
        val onClick: ((View) -> Unit)? = null,
        val rightIcon: Int? = null, val rightIconTint: Int? = null,
        val rightIconOnClick: ((View) -> Unit)? = null
)
