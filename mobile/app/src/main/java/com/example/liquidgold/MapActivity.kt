package com.example.liquidgold

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.yandex.mapkit.Animation
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.RequestPoint
import com.yandex.mapkit.RequestPointType
import com.yandex.mapkit.directions.DirectionsFactory
import com.yandex.mapkit.directions.driving.*
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.map.CameraPosition
import com.yandex.mapkit.map.MapObjectCollection
import com.yandex.mapkit.mapview.MapView

class MapActivity : AppCompatActivity(), DrivingSession.DrivingRouteListener{
    lateinit var mapView: MapView
    lateinit var mapObjects: MapObjectCollection

    lateinit var drivingRouter: DrivingRouter
    lateinit var drivingSession: DrivingSession

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        MapKitFactory.setApiKey("99bc48a5-8548-410e-b367-c467f79ee63b")
        MapKitFactory.initialize(this)

        setContentView(R.layout.activity_map_acitivity)

        mapView = findViewById(R.id.mapview)
        mapView.map.move(
             CameraPosition(getMyCoordinates(), 14.2f, 0.0f, 0.0f),
             Animation(Animation.Type.SMOOTH, 2F),
             null
        )

        mapObjects = mapView.map.mapObjects.addCollection()
        drivingRouter = DirectionsFactory.getInstance().createDrivingRouter()

        mapView.map.mapObjects.addPlacemark(getMyCoordinates())
        submitRequest(intent.getDoubleExtra("lat", 0.0), intent.getDoubleExtra("lon", 0.0))
//
//        MaterialAlertDialogBuilder(this)
//            .setMessage("В машине под номер е777кх777 необходимо перевезти 4 тонны золота к 14 часам этого дня")
//            .setPositiveButton(resources.getString(R.string.new_ticket_accept)) { dialog, which ->
//
//            }
//            .show()
    }

    private fun submitRequest(lat: Double, lon: Double) {
        val drivingOptions = DrivingOptions()
        val vehicleOptions = VehicleOptions()

        drivingOptions.routesCount = 1
        val requestPoints: ArrayList<RequestPoint> = ArrayList()
        requestPoints.add(
            RequestPoint(
                getMyCoordinates(),
                RequestPointType.WAYPOINT,
                null
            )
        )
        requestPoints.add(
            RequestPoint(
                Point(lat, lon),
                RequestPointType.WAYPOINT,
                null
            )
        )
        drivingSession =
            drivingRouter.requestRoutes(requestPoints, drivingOptions, vehicleOptions, this)
    }

    override fun onDrivingRoutes(routes: List<DrivingRoute>) {
        for (route in routes) {
            mapObjects.addPolyline(route.geometry)
        }
    }

    override fun onDrivingRoutesError(p0: com.yandex.runtime.Error) {
        Toast.makeText(this, "Что-то пошло не так", Toast.LENGTH_SHORT).show()
    }

    private fun getMyCoordinates(): Point {
        return Point(51.538779, 45.960191)
//        return Point(45.958803, 51.534831)
    }

    override fun onStart() {
        super.onStart()
        MapKitFactory.getInstance().onStart()
        mapView.onStart()
    }

    override fun onStop() {
        super.onStop()
        MapKitFactory.getInstance().onStop()
        mapView.onStop()
    }
}