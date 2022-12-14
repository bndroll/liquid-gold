package com.example.liquidgold.services

import android.app.Activity
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
import java.util.concurrent.TimeUnit

const val DEFAULT_PICTURE_LINK = "https://i.ytimg.com/vi/IMAUjV8vJuM/sddefault.jpg"
const val BASE_URL = "http://10.0.2.2:8080/"
const val TAG = "API_CLIENT";

val client = OkHttpClient()
var objectMapper: ObjectMapper =
    ObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        .registerModule(KotlinModule())

fun getTask(activity: Activity): Observable<Task> {
    return Observable.fromCallable {
        return@fromCallable Task(
            "Перевезти золото на карьер 2",
            "В машине под номер е777кх777 необходимо перевезти 4 тонны золота к 14 часам этого дня",
        3,
        GeoPoint(51.553842, 45.928540)
        )
//        val request = Request.Builder()
//            .url(BASE_URL.plus("ticket/find/my"))
//            .get()
//            .addHeader("Authorization", "Bearer " + getAuthToken(activity))
//            .build()
//
//        try {
//            client.newCall(request).execute().use { response ->
//                val result = response.body!!.string()
//                Log.e(TAG, result)
//
//                return@fromCallable objectMapper.readValue<List<Task>?>(result, jacksonTypeRef())[0]
//            }
//        } catch (e: Exception) {
//            Log.e(TAG, e.message + " error")
//            throw e
//        }
    }
        .onErrorComplete()
        .subscribeOn(Schedulers.io())
        .delay(2, TimeUnit.SECONDS)
        .observeOn(AndroidSchedulers.mainThread())
}

fun getInfo(activity: Activity): Observable<User> {
    return Observable.fromCallable {
        val request = Request.Builder()
            .url(BASE_URL.plus("user/find/me/"))
            .get()
            .addHeader("Authorization", "Bearer " + getAuthToken(activity))
            .build()

        try {
            client.newCall(request).execute().use { response ->
                val result = response.body!!.string()
                Log.e(TAG, result)

                return@fromCallable objectMapper.readValue<User?>(result, jacksonTypeRef())
            }
        } catch (e: Exception) {
            Log.e(TAG, e.message + " error")
            throw e
        }
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
            .url(BASE_URL.plus("auth/login/"))
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
            throw e
        }
    }
        .onErrorComplete()
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
}