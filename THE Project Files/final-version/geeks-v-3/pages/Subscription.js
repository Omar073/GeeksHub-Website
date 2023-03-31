import React, { Component } from 'react'
import Sidebar from '../components/Sidebar'
import Pricing from '../components/Pricing-Sub'

export default class Subscription extends Component {
    render() {
        return (
            <div  className="flex flex-col items-center justify-center h-screen">
                <div>
                    <Sidebar />
                </div>
                <div className="border border-gray-500 rounded-lg p-4 text-center inline-block items-center justify-center mt-20 bg-sky-950">
                    <p>Your current subscription is: <br /> None</p>
                </div>
                <div>
                    <Pricing />
                </div>
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-cover bg-no-repeat blur-sm"
                    style={{
                        backgroundImage: `url(images/placeholder-2.webp)`,
                        backgroundSize: 'cover',
                        zIndex: -1
                    }}
                />
            </div>
        )
    }
}
