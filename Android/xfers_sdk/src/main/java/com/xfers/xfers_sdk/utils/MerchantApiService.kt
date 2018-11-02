package com.xfers.xfers_sdk.utils

import com.xfers.xfers_sdk.model.OTPRequest
import com.xfers.xfers_sdk.model.OkMessage
import com.xfers.xfers_sdk.model.SignupLoginRequest
import com.xfers.xfers_sdk.model.UserApiKey
import io.reactivex.Observable
import retrofit2.http.Body
import retrofit2.http.POST

interface MerchantApiService {

    @POST("signup_login")
    fun signupLogin(@Body signupLoginRequest: SignupLoginRequest): Observable<OkMessage>

    @POST("get_token")
    fun getToken(@Body OTPRequest: OTPRequest): Observable<UserApiKey>
}
