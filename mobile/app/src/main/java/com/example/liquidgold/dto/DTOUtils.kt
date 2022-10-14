package com.example.liquidgold.dto


fun getReadableRating(rating: Int): String {
    when(rating) {
        1 -> return "Уровень: Подмастерье"
        2 -> return "Уровень: Бывалый рудокоп"
        3 -> return "Уровень: Золотая стрела"
        4 -> return "Уровень: Самородок"
        5 -> return "Уровень: Генерал песчаного карьера"
    }

    return ""
}