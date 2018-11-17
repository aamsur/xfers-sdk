package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.AddBankRequest
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.model.User
import io.reactivex.Observable
import com.xfers.xfers_sdk.model.UserBankAccount
import retrofit2.http.*

const val xfersUserApiKeyHeader = "X-XFERS-USER-API-KEY"

interface XfersApiService {

    @GET("user")
    fun getUserDetails(
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<User>

    @GET("banks")
    fun getAvailableBanks(
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<List<Bank>>

    @GET("user/bank_account")
    fun getUserBanks(
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<List<UserBankAccount>>

    @POST("user/bank_account")
    fun addUserBank(
            @Body addBankRequest: AddBankRequest,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<UserBankAccount>

    @DELETE("user/bank_account/{bankId}")
    fun deleteUserBank(
            @Path(value = "bankId", encoded = true) bankId: String,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<List<UserBankAccount>>
}
