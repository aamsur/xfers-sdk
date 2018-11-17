package com.xfers.xfers_sdk.utils.services.apis

import com.xfers.xfers_sdk.model.request.OTPRequest
import com.xfers.xfers_sdk.model.response.OkResponse
import com.xfers.xfers_sdk.model.request.SignupLoginRequest
import com.xfers.xfers_sdk.model.UserApiKey
import io.reactivex.Observable
import retrofit2.http.Body
import retrofit2.http.POST

interface MerchantApiService {

    @POST("signup_login")
    fun signupLogin(@Body signupLoginRequest: SignupLoginRequest): Observable<OkResponse>

    @POST("get_token")
    fun getToken(@Body OTPRequest: OTPRequest): Observable<UserApiKey>
}
