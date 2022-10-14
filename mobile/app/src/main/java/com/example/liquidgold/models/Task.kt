package com.example.liquidgold.models

data class Task(
    val name: String,
    val description: String,
    val priority: Int,
    val destination: GeoPoint
)
