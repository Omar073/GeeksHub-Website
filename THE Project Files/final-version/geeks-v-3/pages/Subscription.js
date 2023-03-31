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
                
            </div>
        )
    }
}
