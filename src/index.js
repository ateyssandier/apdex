import Apdex from './models/apdex'
import hostAppData from './host_app_data'

import TitleBar from './components/title_bar'
import HostTileContainer from './components/host_tile_container'

import { appendToRoot } from './renderer'

import './index.css'

const apdex = new Apdex(hostAppData)

// mount the app
appendToRoot(
    TitleBar(),
    HostTileContainer(apdex.hostMap, apdex.appMap)
)