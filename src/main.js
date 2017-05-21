import Apdex from './models/apdex'
import hostAppData from './host_app_data'

import {
    TitleBar,
    HostTileContainer,
 } from './components/index'

import { appendToRoot } from './renderer'

import './main.css'

const apdex = new Apdex(hostAppData)

// mount the app
appendToRoot(
    TitleBar(),
    HostTileContainer(apdex.getHostTiles())
)
