package com.xfers.xfers_sdk.task

import android.content.Context
import android.os.AsyncTask
import android.widget.TextView
import com.xfers.xfers_sdk.Xfers
import com.xfers.xfers_sdk.model.User
import java.lang.ref.WeakReference

class UpdateTextWithUserDetails(textView: TextView, context: Context) : AsyncTask<Unit, Unit, User>() {
    private val innerTextView: WeakReference<TextView> = WeakReference(textView)
    private val innerContext: WeakReference<Context> = WeakReference(context)

    override fun doInBackground(vararg params: Unit?): User? {
        innerContext.get()?.let {
           return Xfers(it).getUserDetails()
        }

        return null
    }

    override fun onPostExecute(result: User?) {
        super.onPostExecute(result)

        innerTextView.get()?.text = "${result?.email} ${result?.firstName} ${result?.lastName}"
    }
}
