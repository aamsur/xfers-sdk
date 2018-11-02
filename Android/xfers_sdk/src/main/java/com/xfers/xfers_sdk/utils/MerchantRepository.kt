package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.OTPRequest
import com.xfers.xfers_sdk.model.OkMessage
import com.xfers.xfers_sdk.model.SignupLoginRequest
import com.xfers.xfers_sdk.model.UserApiKey
import io.reactivex.Observable

class MerchantRepository {
    private val merchantApiService = NetworkClient.provideMerchantApiService()

    fun signupLogin(phoneNumber: String): Observable<OkMessage> {
        return merchantApiService.signupLogin(SignupLoginRequest(phoneNumber))
    }

    fun getToken(OTP: String): Observable<UserApiKey> {
        return merchantApiService.getToken(OTPRequest(OTP))
    }
}
