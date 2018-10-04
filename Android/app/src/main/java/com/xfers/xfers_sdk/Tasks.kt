package com.xfers.xfers_sdk

import android.os.AsyncTask
import android.widget.TextView
import java.io.BufferedInputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.lang.ref.WeakReference

// Sample AsyncTask for our own usage
class UpdateTextWithAdviceTask(textView: TextView) : AsyncTask<Unit, Unit, String>() {
    private val innerTextView: WeakReference<TextView> = WeakReference(textView)

    override fun doInBackground(vararg params: Unit?): String? {
        val networkClient = NetworkClient()
        val stream = BufferedInputStream(networkClient.get("http://api.adviceslip.com/advice"))
        return readStream(stream)
    }

    override fun onPostExecute(result: String?) {
        super.onPostExecute(result)
        innerTextView.get()?.text = result
    }

    private fun readStream(inputStream: BufferedInputStream): String {
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        val stringBuilder = StringBuilder()
        bufferedReader.forEachLine { stringBuilder.append(it) }
        return stringBuilder.toString()
    }
}
