package com.xfers.xfers_sdk.view.shared

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.xfers.xfers_sdk.R

class XfersTransactionRowAdapter(
        private val context: Context,
        private val transactionRowItems: List<TransactionRowItem>
) : RecyclerView.Adapter<XfersTransactionRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val xfersTransactionRowClickView: View? = view.findViewById(R.id.xfersTransactionRowClickView)
        val xfersTransactionRowImageView: ImageView? = view.findViewById(R.id.xfersTransactionRowImageView)
        var xfersTransactionRowLeftCopyTextView: TextView? = view.findViewById(R.id.xfersTransactionRowLeftCopyTextView)
        var xfersTransactionRowRightCopyTextView: TextView? = view.findViewById(R.id.xfersTransactionRowRightCopyTextView)
    }

    override fun getItemCount(): Int {
        return transactionRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val transactionRowItem = transactionRowItems[position]

        viewHolder.xfersTransactionRowImageView?.setImageResource(transactionRowItem.icon)
        viewHolder.xfersTransactionRowImageView?.setColorFilter(ContextCompat.getColor(context, transactionRowItem.iconTint))

        viewHolder.xfersTransactionRowLeftCopyTextView?.text = transactionRowItem.leftCopy
        viewHolder.xfersTransactionRowRightCopyTextView?.text = transactionRowItem.rightCopy

        transactionRowItem.onClick?.let {
            viewHolder.xfersTransactionRowClickView?.setOnClickListener(it)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_transaction_row, parent, false))
    }
}

data class TransactionRowItem(
        val icon: Int,
        val iconTint: Int,
        val leftCopy: CharSequence,
        val rightCopy: CharSequence,
        val onClick: ((View) -> Unit)?
)
