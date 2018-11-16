package com.xfers.xfers_sdk.utils

import io.reactivex.Observable
import com.xfers.xfers_sdk.model.UserBankAccount
import retrofit2.http.GET
import retrofit2.http.Header

const val xfersUserApiKeyHeader = "X-XFERS-USER-API-KEY"

interface XfersApiService {

    @GET("user/bank_account")
    fun getUserBanks(@Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()): Observable<List<UserBankAccount>>
}
