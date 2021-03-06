package com.xfers.xfers_sdk.utils.services.apis

import com.xfers.xfers_sdk.model.*
import com.xfers.xfers_sdk.model.request.*
import com.xfers.xfers_sdk.model.response.TransferInfoResponse
import com.xfers.xfers_sdk.model.response.UserActivityResponse
import com.xfers.xfers_sdk.model.response.WithdrawalRequestResponse
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import io.reactivex.Observable
import retrofit2.http.*

const val xfersUserApiKeyHeader = "X-XFERS-USER-API-KEY"

interface XfersApiService {

    // User related APIs

    @GET("user")
    fun getUserDetails(
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<User>

    @POST("user")
    fun updateUserDetails(
            @Body updateUserDetailsRequest: UpdateUserDetailsRequest,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<User>

    // Withdrawal related APIs

    @POST("user/bank_account/{bankId}/withdraw")
    fun createWithdrawalRequest(
            @Path(value = "bankId", encoded = true) bankId: String,
            @Body createWithdrawalRequest: CreateWithdrawalRequest,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<WithdrawalRequestResponse>

    // Charge related APIs

    @POST("charges")
    fun createCharge(
            @Body createChargeRequest: CreateChargeRequest,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<Charge>

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

    // Topup related APIs

    @GET("user/transfer_info")
    fun getTopupInstructions(
            @Query("bank") bank_abbrev: String,
            @Query("disable_va") disable_va: Boolean,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<TransferInfoResponse>

    // Transaction History related APIs

    @GET("user/activities")
    fun getActivities(
            @Query("limit") limit: Int,
            @Header(xfersUserApiKeyHeader) userApiKey: String = XfersConfiguration.getUserApiKey()
    ): Observable<UserActivityResponse>
}
