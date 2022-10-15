package com.example.liquidgold

import android.content.Intent
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.liquidgold.dto.getReadableRating
import com.example.liquidgold.services.getInfo
import com.example.liquidgold.services.getTask
import com.google.android.material.dialog.MaterialAlertDialogBuilder


class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val fioView = findViewById<TextView>(R.id.profile_name)
        val ratingView = findViewById<TextView>(R.id.rating)

        getInfo(this).subscribe {
            fioView.text = it.fio
            ratingView.text = getReadableRating(it.rating)
        }

        val ctx = this
        getTask(this).subscribe {
            MaterialAlertDialogBuilder(ctx)
                .setMessage(resources.getString(R.string.new_ticket))
                .setNegativeButton(resources.getString(R.string.new_ticket_decline)) { dialog, which ->
                    // Respond to negative button press
                }
                .setPositiveButton(resources.getString(R.string.new_ticket_accept)) { dialog, which ->
                    val intent = Intent(this, MapActivity::class.java)
                    intent.putExtra("lat", it.destination.lat)
                    intent.putExtra("lon", it.destination.lon)
                    startActivity(intent)
                }
                .show()
        }
    }
}