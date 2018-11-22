package com.xfers.xfers_sdk.utils.services.security

import android.util.Base64
import java.security.Key
import javax.crypto.Cipher

object CipherService {

    private val cipher: Cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding")

    fun encrypt(data: String, key: Key?): String {
        cipher.init(Cipher.ENCRYPT_MODE, key)

        val bytes = cipher.doFinal(data.toByteArray())

        return Base64.encodeToString(bytes, Base64.DEFAULT)
    }

    fun decrypt(data: String, key: Key?): String {
        cipher.init(Cipher.DECRYPT_MODE, key)

        val encryptedData = Base64.decode(data, Base64.DEFAULT)
        val decodedData = cipher.doFinal(encryptedData)

        return String(decodedData)
    }
}
