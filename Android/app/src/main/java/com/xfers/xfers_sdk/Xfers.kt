package com.xfers.xfers_sdk

import android.content.Context

// This is where we add things like Xfers.startKycFlow and Xfers.connectUser etc.
class Xfers(val context: Context, val apiKey: String = XfersConfiguration.apiKey)
