package com.xfers.xfers_sdk.utils

import io.reactivex.schedulers.Schedulers
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

interface XfersApiService {

//    @GET("search/users")
//    fun search(@Query("q") query: String,
//               @Query("page") page: Int,
//               @Query("per_page") perPage: Int): Observable<Result>

    companion object Factory {
        fun create(): XfersApiService {
            val retrofit = Retrofit.Builder()
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.createWithScheduler(Schedulers.io()))
                    .addConverterFactory(GsonConverterFactory.create())
                    .baseUrl(XfersConfiguration.getApiBase())
                    .build()

            return retrofit.create(XfersApiService::class.java)
        }
    }
}
