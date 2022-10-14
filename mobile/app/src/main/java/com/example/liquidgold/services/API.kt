package com.example.liquidgold.services

import com.example.liquidgold.models.Task
import com.example.liquidgold.models.GeoPoint
import com.example.liquidgold.models.User
import io.reactivex.rxjava3.android.schedulers.AndroidSchedulers
import io.reactivex.rxjava3.core.Observable
import io.reactivex.rxjava3.schedulers.Schedulers


const val DEFAULT_PICTURE_LINK = "https://i.ytimg.com/vi/IMAUjV8vJuM/sddefault.jpg"

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
    return Observable.just("Token")
}