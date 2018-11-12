package com.xfers.xfers_sdk.view.shared

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.xfers.xfers_sdk.R

class XfersBankInstructionRowAdapter(
        private val context: Context,
        private val bankInstructionRowItems: List<BankInstructionRowItem>
) : RecyclerView.Adapter<XfersBankInstructionRowAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var xfersBankInstructionRowIndexTextView: TextView? = view.findViewById(R.id.xfersBankInstructionRowIndexTextView)
        var xfersBankInstructionRowCopyTextView: TextView? = view.findViewById(R.id.xfersBankInstructionRowCopyTextView)
        var xfersBankInstructionRowAccountNumberTextView: TextView? = view.findViewById(R.id.xfersBankInstructionRowAccountNumberTextView)
        var xfersBankInstructionRowCopyButton: Button? = view.findViewById(R.id.xfersBankInstructionRowCopyButton)
    }

    override fun getItemCount(): Int {
        return bankInstructionRowItems.size
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        val bankInstructionRowItem = bankInstructionRowItems[position]

        viewHolder.xfersBankInstructionRowIndexTextView?.text = (position + 1).toString()

        viewHolder.xfersBankInstructionRowCopyTextView?.text = bankInstructionRowItem.copy

        if (bankInstructionRowItem.accountNumber != null) {
            viewHolder.xfersBankInstructionRowAccountNumberTextView?.text = bankInstructionRowItem.accountNumber
        } else {
            viewHolder.xfersBankInstructionRowAccountNumberTextView?.visibility = View.GONE
        }

        viewHolder.xfersBankInstructionRowCopyButton?.text = context.getString(R.string.copy_button_copy)

        if (bankInstructionRowItem.copyOnClick != null) {
            viewHolder.xfersBankInstructionRowCopyButton?.setOnClickListener(bankInstructionRowItem.copyOnClick)
        } else {
            viewHolder.xfersBankInstructionRowCopyButton?.visibility = View.GONE
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.xfers_bank_instruction_row, parent, false))
    }
}

data class BankInstructionRowItem(
        val copy: CharSequence,
        val accountNumber: CharSequence? = null,
        val copyOnClick: ((View) -> Unit)? = null
)
