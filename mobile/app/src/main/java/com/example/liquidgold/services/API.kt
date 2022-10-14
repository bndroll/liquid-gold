package com.example.liquidgold.services

import android.util.Log
import com.example.liquidgold.dto.LoginResponseDTO
import com.example.liquidgold.models.GeoPoint
import com.example.liquidgold.models.Task
import com.example.liquidgold.models.User
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.jacksonTypeRef
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.schedulers.Schedulers
import okhttp3.*

const val DEFAULT_PICTURE_LINK = "https://i.ytimg.com/vi/IMAUjV8vJuM/sddefault.jpg"
const val BASE_URL = "http://192.168.43.255:8080/"
const val TAG = "API_CLIENT";

val client = OkHttpClient()
var objectMapper: ObjectMapper =
    ObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .registerModule(KotlinModule())

fun getTask(): Observable<Task> {
    return Observable.just(Task(
        "Задача 1",
        "Выкопать песчаный карьер",
        5,
        GeoPoint(59.9382409, 30.3257298)
        )
    )
}

fun getInfo(): Observable<User> {
    return Observable.fromCallable {
        return@fromCallable User("Иванов Иван Иваныч", DEFAULT_PICTURE_LINK)
    }
    .onErrorComplete()
    .subscribeOn(Schedulers.io())
    .observeOn(AndroidSchedulers.mainThread())
}

fun finishTask(): Observable<Boolean> {
    return Observable.just(true);
}

fun login(login: String, password: String): Observable<String> {
    return Observable.fromCallable {
        val requestBody = FormBody.Builder().add("username", login).add("password", password).build()

        val request = Request.Builder()
            .url(BASE_URL.plus("/login/"))
            .post(requestBody)
            .build()

        try {
            client.newCall(request).execute().use { response ->
                val result = response.body!!.string()
                val resultDto: LoginResponseDTO = objectMapper.readValue(result, jacksonTypeRef())

                return@fromCallable resultDto.access_token
            }
        } catch (e: Exception) {
            Log.e(TAG, e.message + " error")
            return@fromCallable "13"
        }
    }
        .onErrorComplete()
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
}