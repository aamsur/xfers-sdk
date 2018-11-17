package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.request.OTPRequest
import com.xfers.xfers_sdk.model.response.OkResponse
import com.xfers.xfers_sdk.model.request.SignupLoginRequest
import com.xfers.xfers_sdk.model.UserApiKey
import com.xfers.xfers_sdk.utils.network.NetworkClient
import io.reactivex.Observable

class MerchantRepository {
    private val merchantApiService = NetworkClient.provideMerchantApiService()

    fun signupLogin(phoneNumber: String): Observable<OkResponse> {
        return merchantApiService.signupLogin(SignupLoginRequest(phoneNumber))
    }

    fun getToken(OTP: String): Observable<UserApiKey> {
        return merchantApiService.getToken(OTPRequest(OTP))
    }
}
