package com.xfers.xfers_sdk.utils

import android.content.Context
import com.xfers.xfers_sdk.model.*
import com.xfers.xfers_sdk.model.request.*
import com.xfers.xfers_sdk.model.response.TransferInfoResponse
import com.xfers.xfers_sdk.model.response.UserActivityResponse
import com.xfers.xfers_sdk.model.response.WithdrawalRequestResponse
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.network.NetworkClient
import io.reactivex.Observable
import java.math.BigDecimal

class XfersRepository {
    private val xfersApiService = NetworkClient.provideXfersApiService()

    // User related APIs

    fun getUserDetails(context: Context): Observable<User> {
        return xfersApiService.getUserDetails(XfersConfiguration.getUserApiKey(context))
    }

    fun updateUserDetails(context: Context): Observable<User> {
        return xfersApiService.updateUserDetails(
                UpdateUserDetailsRequest(
                        // TODO: Empty for now, to be added
                ),
                XfersConfiguration.getUserApiKey(context)
        )
    }

    // Withdrawal related APIs

    fun createWithdrawalRequest(context: Context, bankId: Int, amount: BigDecimal): Observable<WithdrawalRequestResponse> {
        return xfersApiService.createWithdrawalRequest(
                bankId.toString(),
                CreateWithdrawalRequest(amount.toString()),
                XfersConfiguration.getUserApiKey(context)
        )
    }

    // Charge related APIs

    // FIXME: Hard-coded debit_only == true now cos we currently only create charge if user has sufficient balance
    // FIXME: This is currently hardcoded to be using Contractual Model, not Transactional Model since we only support Indonesia
    fun createCharge(context: Context, amount: BigDecimal, orderId: String, description: String = "", debitOnly: String = "true", currency: String = XfersConfiguration.getCurrencyCodeString()): Observable<Charge> {
        return xfersApiService.createCharge(
                CreateChargeRequest(
                        amount.toString(),
                        orderId,
                        debitOnly,
                        description,
                        currency
                ),
                XfersConfiguration.getUserApiKey(context)
        )
    }

    // Bank related APIs

    fun getAvailableBanks(context: Context): Observable<List<Bank>> {
        return xfersApiService.getAvailableBanks(XfersConfiguration.getUserApiKey(context))
    }

    fun getUserBanks(context: Context): Observable<List<UserBankAccount>> {
        return xfersApiService.getUserBanks(XfersConfiguration.getUserApiKey(context))
    }

    fun addUserBank(context: Context, bank: String, accountHolderName: String, accountNumber: String): Observable<UserBankAccount> {
        return xfersApiService.addUserBank(AddBankRequest(bank, accountHolderName, accountNumber), XfersConfiguration.getUserApiKey(context))
    }

    fun deleteUserBank(context: Context, bankId: Int): Observable<List<UserBankAccount>> {
        return xfersApiService.deleteUserBank(bankId.toString(), XfersConfiguration.getUserApiKey(context))
    }

    // Topup related APIs

    fun getTopupInstructions(context: Context, bank: String, disableVa: Boolean): Observable<TransferInfoResponse> {
        return xfersApiService.getTopupInstructions(bank, disableVa, XfersConfiguration.getUserApiKey(context))
    }

    // Transaction History related APIs

    fun getActivities(context: Context, limit: Int): Observable<UserActivityResponse> {
        return xfersApiService.getActivities(limit, XfersConfiguration.getUserApiKey(context))
    }
}
