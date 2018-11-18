package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.User
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class UserViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val userDetails = MutableLiveData<User>()
    private var subscription: Disposable? = null

    fun getUserDetails(): LiveData<User> {
        subscription = xfersRepository.getUserDetails()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetUserDetailsStart() }
                .doOnTerminate { onGetUserDetailsFinish() }
                .subscribe(
                        { onGetUserDetailsSuccess(it) },
                        { onGetUserDetailsError(it) }
                )

        return userDetails
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onGetUserDetailsStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onGetUserDetailsFinish() {
        // TODO: Provide observable to show
    }

    private fun onGetUserDetailsSuccess(userInfo: User) {
        userDetails.postValue(userInfo)
    }

    private fun onGetUserDetailsError(error: Throwable) {
        println(error)
        // TODO: Provide observable to show error on view

    }

}