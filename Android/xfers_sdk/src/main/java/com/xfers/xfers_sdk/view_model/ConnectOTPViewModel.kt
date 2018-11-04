package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.UserApiKey
import com.xfers.xfers_sdk.utils.MerchantRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class ConnectOTPViewModel : ViewModel() {
    private val merchantRepository = MerchantRepository()
    private val connectSuccess: MutableLiveData<Boolean> = MutableLiveData()
    private var subscription: Disposable? = null

    fun connectOTP(OTP: String): LiveData<Boolean> {
        subscription = merchantRepository.getToken(OTP)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onConnectOTPStart() }
                .doOnTerminate { onConnectOTPFinish() }
                .subscribe(
                        { onConnectOTPSuccess(it) },
                        { onConnectOTPError() }
                )

        return connectSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onConnectOTPStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onConnectOTPFinish() {
        // TODO: Provide observable to show
    }

    private fun onConnectOTPSuccess(userApiKey: UserApiKey) {
        // Example response expected:
        // {
        //   "apiKey": "<real_user_api_key>"
        // }
        if (userApiKey.apiKey.isNotBlank()) {
            connectSuccess.value = true
        }
    }

    private fun onConnectOTPError() {
        // TODO: Provide observable to show error on view
    }
}

