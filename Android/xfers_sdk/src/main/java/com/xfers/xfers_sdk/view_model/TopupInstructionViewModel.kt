package com.xfers.xfers_sdk.view_model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.TransferInfo
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class TopupInstructionViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val transferInfoSuccess = MutableLiveData<TransferInfo>()
    private val transferInfoFailure = MutableLiveData<Boolean>()
    private var subscription: Disposable? = null

    fun getTransferInfo(bank: String, disableVa: Boolean): LiveData<TransferInfo> {
        subscription = xfersRepository.getTopupInstructions(bank, disableVa)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetTransferInfoStart() }
                .doOnTerminate { onGetTransferInfoFinish() }
                .subscribe(
                        { onGetTransferInfoSuccess(it) },
                        { onGetTransferInfoError(it) }
                )

        return transferInfoSuccess
    }

    override fun onCleared() {
        super.onCleared()
        subscription?.dispose()
    }

    private fun onGetTransferInfoStart() {
        // TODO: Provide observable to show loading on view
    }

    private fun onGetTransferInfoFinish() {
        // TODO: Provide observable to show failure message on view
    }

    private fun onGetTransferInfoSuccess(transferInfo: TransferInfo) {
        transferInfoSuccess.postValue(transferInfo)
    }

    private fun onGetTransferInfoError(error: Throwable) {
        println(error)
        transferInfoFailure.postValue(false )
    }
}