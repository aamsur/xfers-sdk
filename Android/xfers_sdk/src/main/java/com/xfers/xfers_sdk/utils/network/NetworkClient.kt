package com.xfers.xfers_sdk.utils.network

import com.google.gson.FieldNamingPolicy
import com.google.gson.Gson
import com.xfers.xfers_sdk.utils.config.XfersConfiguration
import com.xfers.xfers_sdk.utils.services.apis.MerchantApiService
import com.xfers.xfers_sdk.utils.services.apis.XfersApiService
import io.reactivex.schedulers.Schedulers
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

object NetworkClient {

    fun provideMerchantApiService(): MerchantApiService {
        // camelCase by default
        val gson = Gson()
                .newBuilder()
                .create()

        return provideRetrofitInterface(XfersConfiguration.getMerchantApiBase(), gson)
                .create(MerchantApiService::class.java)
    }

    fun provideXfersApiService(): XfersApiService {
        // snake_case because Xfers API returns snake_case
        val gson = Gson()
                .newBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .create()

        return provideRetrofitInterface(XfersConfiguration.getApiBase(), gson)
                .create(XfersApiService::class.java)
    }

    private fun provideRetrofitInterface(apiBase: String, gson: Gson): Retrofit {
        return Retrofit.Builder()
                .addCallAdapterFactory(RxJava2CallAdapterFactory.createWithScheduler(Schedulers.io()))
                .addConverterFactory(GsonConverterFactory.create(gson))
                .baseUrl(apiBase)
                .build()
    }
}
