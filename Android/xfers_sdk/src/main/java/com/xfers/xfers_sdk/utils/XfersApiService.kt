package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.*
import io.reactivex.Observable
import retrofit2.http.*

const val xfersUserApiKeyHeader = "X-XFERS-USER-API-KEY"

interface XfersApiService {

    // User related APIs

    @GET("user")
    fun getUserDetails(
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<User>

    // Withdrawal related APIs

    @POST("user/bank_account/{bankId}/withdraw")
    fun createWithdrawalRequest(
            @Path(value = "bankId", encoded = true) bankId: String,
            @Body createWithdrawalRequest: CreateWithdrawalRequest,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<WithdrawalRequestResponse>

    // Bank related APIs

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
