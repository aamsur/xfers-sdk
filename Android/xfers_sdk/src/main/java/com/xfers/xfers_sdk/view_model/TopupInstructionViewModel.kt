package com.xfers.xfers_sdk.view_model

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.xfers.xfers_sdk.model.response.TransferInfoResponse
import com.xfers.xfers_sdk.utils.XfersRepository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers

class TopupInstructionViewModel : ViewModel() {
    private val xfersRepository = XfersRepository()
    private val transferInfoSuccess = MutableLiveData<TransferInfoResponse>()
    private var subscription: Disposable? = null

    fun getTransferInfo(context: Context, bank: String, disableVa: Boolean): LiveData<TransferInfoResponse> {
        subscription = xfersRepository.getTopupInstructions(context, bank, disableVa)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doOnSubscribe { onGetTransferInfoStart() }
                .doOnTerminate { onGetTransferInfoFinish() }
                .subscribe(
                        { onGetTransferInfoSuccess(it) },
                        { onGetTransferInfoError() }
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

    private fun onGetTransferInfoSuccess(transferInfoResponse: TransferInfoResponse) {
        transferInfoSuccess.postValue(transferInfoResponse)
    }

    private fun onGetTransferInfoError() {
        // TODO: Provide observable to show error on view
    }
}