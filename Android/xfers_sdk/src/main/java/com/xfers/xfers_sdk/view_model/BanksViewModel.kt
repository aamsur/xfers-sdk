package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.Bank
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class BanksViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val banks = MutableLiveData<List<Bank>>()
    private var subscription: Disposable? = null

    fun getAvailableBanks(): LiveData<List<Bank>> {
        subscription = xfersRepository.getAvailableBanks()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetAvailableBanksStart() }
                .doOnTerminate { onGetAvailableBanksFinish() }
                .subscribe(
                        { onGetAvailableBanksSuccess(it) },
                        { onGetAvailableBanksError() }
                )

        return banks
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onGetAvailableBanksStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onGetAvailableBanksFinish() {
        // TODO: Provide observable to show
    }

    private fun onGetAvailableBanksSuccess(banksList: List<Bank>) {
        banks.postValue(banksList)
    }

    private fun onGetAvailableBanksError() {
        // TODO: Provide observable to show error on view
    }
}
