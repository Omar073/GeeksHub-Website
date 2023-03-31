import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import ReservationForm from '../components/reserve'

export default class Reservations extends Component {
    render() {
        return (
            <div>
                <Sidebar />
                <ReservationForm />
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-cover bg-no-repeat blur-sm"
                    style={{
                        backgroundImage: `url(images/placeholder-5.webp)`,
                        backgroundSize: 'cover',
                        zIndex: -1
                        
                    }}
                />

            </div>
        )
    }
}